import { createContext, useState, useEffect, useCallback } from "react";
import toast from 'react-hot-toast';

// Création du contexte pour le panier d'achat.
export const CardContext = createContext(null);

/**
 * Fournisseur du contexte du panier.
 * Gère l'état du panier, l'ajout/suppression d'articles et la persistance locale.
 */
export function CardProvider({ children }) {
    // 1. Initialisation de l'état du panier à partir du LocalStorage.
    // Cela permet de conserver le panier même si l'utilisateur rafraîchit la page.
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedData = localStorage.getItem("panier_cafethe");
            return savedData ? JSON.parse(savedData) : [];
        } catch (error) {
            console.error("Erreur lors de la lecture du LocalStorage:", error);
            return [];
        }
    });

    // État pour suivre le nombre d'articles précédents afin de détecter les suppressions.
    const [prevCount, setPrevCount] = useState(cartItems.length);

    // 2. Fonction utilitaire pour identifier un article unique.
    // Un article est unique par sa référence SKU ET son poids (car un même produit peut avoir plusieurs poids).
    const isSameItem = (item, id, weight) => {
        return item.reference_sku === id && (item.poids_affichage === weight || item.poids === weight);
    };

    // 3. Effet pour sauvegarder le panier dans le LocalStorage à chaque modification.
    // Gère aussi les notifications lors de la suppression d'articles.
    useEffect(() => {
        localStorage.setItem("panier_cafethe", JSON.stringify(cartItems));

        // Si le nombre d'articles a diminué, on affiche une notification de suppression.
        if (cartItems.length < prevCount) {
            toast.error("Article retiré du panier", {
                icon: '🗑️',
                id: 'notif-suppression-globale' // ID unique pour éviter l'empilement des toasts.
            });
        }
        setPrevCount(cartItems.length);
    }, [cartItems, prevCount]);

    // 4. Fonction pour AJOUTER un ou plusieurs produits au panier.
    // Gère l'incrémentation de la quantité si l'article existe déjà.
    const addProductToCart = (newProduct) => {
        setCartItems((prevItems) => {
            // On normalise l'entrée pour traiter un tableau ou un objet unique de la même façon.
            const productsToAdd = Array.isArray(newProduct) ? newProduct : [newProduct];
            let updatedItems = [...prevItems];

            productsToAdd.forEach(product => {
                const pId = product.reference_sku;
                const pWeight = product.poids_affichage || product.poids;
                
                // On cherche si l'article existe déjà dans le panier.
                const existingItemIndex = updatedItems.findIndex(item => isSameItem(item, pId, pWeight));

                if (existingItemIndex !== -1) {
                    // Si oui, on augmente la quantité.
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantite: updatedItems[existingItemIndex].quantite + (product.quantite || 1)
                    };
                } else {
                    // Sinon, on ajoute le nouvel article.
                    updatedItems.push({ ...product, quantite: product.quantite || 1 });
                }
            });

            // Affichage des notifications de succès.
            if (productsToAdd.length === 1) {
                toast.success(`${productsToAdd[0].nom_produit || productsToAdd[0].nom} ajouté !`, {
                    id: 'add-success',
                    style: { border: '1px solid #634832', padding: '16px', color: '#634832', fontWeight: 'bold' },
                    iconTheme: { primary: '#634832', secondary: '#FFFAEE' },
                });
            } else {
                 toast.success(`${productsToAdd.length} articles ajoutés !`);
            }

            return updatedItems;
        });
    };

    // 5. Fonction pour DIMINUER la quantité d'un article.
    // Si la quantité atteint 0, l'article est retiré du panier.
    const decreaseQuantity = (id, poids) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => isSameItem(item, id, poids));

            if (itemIndex === -1) return prevItems;
            const currentItem = prevItems[itemIndex];

            if (currentItem.quantite > 1) {
                // Si quantité > 1, on décrémente.
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...currentItem, quantite: currentItem.quantite - 1 };
                return updatedItems;
            }

            // Si quantité = 1, on retire l'article du tableau.
            return prevItems.filter((_, index) => index !== itemIndex);
        });
    };

    // 6. Fonction pour SUPPRIMER complètement un article du panier.
    const removeProductFromCart = (id, poids) => {
        setCartItems(prev => prev.filter(item => !isSameItem(item, id, poids)));
    };

    // 7. Fonction pour VIDER entièrement le panier.
    // Utilisée notamment après un paiement réussi.
    const clearCart = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem("panier_cafethe");
    }, []);

    // 8. Calculs dérivés pour l'affichage (Total des articles et Montant total).
    const cartCount = cartItems.reduce((total, item) => total + item.quantite, 0);

    const totalAmount = cartItems.reduce((total, item) => {
        // On utilise le prix final (promo) s'il existe, sinon le prix TTC standard.
        const prix = parseFloat(item.prix_final || item.prix_ttc) || 0;
        return total + (prix * item.quantite);
    }, 0).toFixed(2); // Formatage à 2 décimales.

    // L'objet value expose toutes les données et fonctions nécessaires aux composants consommateurs.
    const value = {
        cartItems,
        addProductToCart,
        decreaseQuantity,
        removeProductFromCart,
        clearCart,
        totalAmount,
        cartCount
    };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
}
