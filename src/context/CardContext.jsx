import { createContext, useState, useEffect, useCallback } from "react";
import toast from 'react-hot-toast';

export const CardContext = createContext(null);

export function CardProvider({ children }) {
    // 1. Initialisation sécurisée (évite le crash si le LocalStorage est corrompu)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedData = localStorage.getItem("panier_cafethe");
            return savedData ? JSON.parse(savedData) : [];
        } catch (error) {
            console.error("Erreur LocalStorage:", error);
            return [];
        }
    });

    const [prevCount, setPrevCount] = useState(cartItems.length);

    // 2. Fonction utilitaire de comparaison (Source de vérité unique)
    // Elle vérifie le SKU et les deux formats de poids possibles
    const isSameItem = (item, id, weight) => {
        return item.reference_sku === id && (item.poids_affichage === weight || item.poids === weight);
    };

    // 3. Persistance et Notifications automatiques
    useEffect(() => {
        localStorage.setItem("panier_cafethe", JSON.stringify(cartItems));

        // Notif uniquement si on a supprimé (baisse du nombre de lignes)
        if (cartItems.length < prevCount) {
            toast.error("Article retiré du panier", {
                icon: '🗑️',
                id: 'notif-suppression-globale' // Évite l'accumulation de toasts
            });
        }
        setPrevCount(cartItems.length);
    }, [cartItems, prevCount]);

    // 4. AJOUTER UN PRODUIT
    const addProductToCart = (newProduct) => {
        setCartItems((prevItems) => {
            const pId = newProduct.reference_sku;
            const pWeight = newProduct.poids_affichage || newProduct.poids;

            const alreadyExists = prevItems.find(item => isSameItem(item, pId, pWeight));

            if (alreadyExists) {
                toast.success(`+1 pour ${newProduct.nom_produit || newProduct.nom}`, {
                    id: 'add-success' // Met à jour le toast existant au lieu d'en créer un nouveau
                });
                return prevItems.map(item =>
                    isSameItem(item, pId, pWeight)
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                );
            }

            toast.success(`${newProduct.nom_produit || newProduct.nom} ajouté !`, {
                id: 'add-success',
                style: { border: '1px solid #634832', padding: '16px', color: '#634832', fontWeight: 'bold' },
                iconTheme: { primary: '#634832', secondary: '#FFFAEE' },
            });
            return [...prevItems, { ...newProduct, quantite: 1 }];
        });
    };

    // 5. DIMINUER LA QUANTITÉ
    const decreaseQuantity = (id, poids) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => isSameItem(item, id, poids));

            if (itemIndex === -1) return prevItems;
            const currentItem = prevItems[itemIndex];

            if (currentItem.quantite > 1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...currentItem, quantite: currentItem.quantite - 1 };
                return updatedItems;
            }

            // Si quantité = 1, on retire carrément l'article
            return prevItems.filter((_, index) => index !== itemIndex);
        });
    };

    // 6. SUPPRIMER TOUTE LA LIGNE
    const removeProductFromCart = (id, poids) => {
        setCartItems(prev => prev.filter(item => !isSameItem(item, id, poids)));
    };

    // 7. CALCULS DES TOTAUX
    const cartCount = cartItems.reduce((total, item) => total + item.quantite, 0);

    const totalAmount = cartItems.reduce((total, item) => {
        const prix = parseFloat(item.prix_final || item.prix_ttc) || 0;
        return total + (prix * item.quantite);
    }, 0).toFixed(2);

    const value = {
        cartItems,
        addProductToCart,
        decreaseQuantity,
        removeProductFromCart,
        totalAmount,
        cartCount
    };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
}