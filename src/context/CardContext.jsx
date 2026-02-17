import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

export const CardContext = createContext(null);

export function CardProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedData = localStorage.getItem("panier_cafethe");
        return savedData ? JSON.parse(savedData) : [];
    });

    // On crée un état pour suivre le nombre d'articles avant la modification
    const [prevCount, setPrevCount] = useState(cartItems.length);

    useEffect(() => {
        // 1. Sauvegarde dans le localStorage
        localStorage.setItem("panier_cafethe", JSON.stringify(cartItems));

        // 2. LOGIQUE DE NOTIFICATION AUTOMATIQUE
        // Si le nombre d'articles actuel est plus petit que le précédent, c'est qu'une ligne a été supprimée
        if (cartItems.length < prevCount) {
            toast.error("Article retiré du panier", {
                icon: '🗑️',
                id: 'notif-suppression-globale' // ID unique pour éviter les doublons
            });
        }

        // 3. Mise à jour du compteur pour le prochain changement
        setPrevCount(cartItems.length);
    }, [cartItems]); // S'exécute à chaque fois que le panier change

    // AJOUTER UN PRODUIT
    const addProductToCart = (newProduct) => {
        setCartItems((prevItems) => {
            const alreadyExists = prevItems.find(item =>
                item.id === newProduct.id && item.poids === newProduct.poids
            );

            if (alreadyExists) {
                toast.success(`+1 pour ${newProduct.nom}`);
                return prevItems.map(item =>
                    item.id === alreadyExists.id && item.poids === alreadyExists.poids
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                );
            }

            toast.success(`${newProduct.nom} ajouté !`, {
                style: { border: '1px solid #634832', padding: '16px', color: '#634832', fontWeight: 'bold' },
                iconTheme: { primary: '#634832', secondary: '#FFFAEE' },
            });
            return [...prevItems, { ...newProduct, quantite: 1 }];
        });
    };

    /**
     * DIMINUER LA QUANTITÉ (Bouton "-")
     * On ne met plus de toast ici, le useEffect au-dessus s'en charge !
     */
    const decreaseQuantity = (id, poids) => {
        setCartItems((prevItems) => {
            // 1. Trouver l'article
            const itemIndex = prevItems.findIndex(item => item.id === id && item.poids === poids);
            if (itemIndex === -1) return prevItems;

            const currentItem = prevItems[itemIndex];

            // 2. CAS : On diminue juste la quantité
            if (currentItem.quantite > 1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...currentItem, quantite: currentItem.quantite - 1 };
                return updatedItems;
            }

            // 3. CAS : On supprime l'article (quantité était à 1)
            // On déclenche le toast AVANT de retourner le nouveau tableau
            toast.error("Article retiré", {
                icon: '🗑️',
                duration: 3000,
                id: 'unique-remove-toast'
            });

            return prevItems.filter((_, index) => index !== itemIndex);
        });
    };

    /**
     * SUPPRIMER TOUTE LA LIGNE
     * Plus besoin de toast ici non plus, le useEffect surveille tout
     */
    const removeProductFromCart = (id, poids) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.poids === poids)));
    };
// On calcule le nombre total d'articles (somme des quantités)
    const cartCount = cartItems.reduce((total, item) => total + item.quantite, 0);

    const totalAmount = cartItems.reduce((total, item) => {
        const prix = parseFloat(item.prixFinal || item.prixUnitaire) || 0;
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