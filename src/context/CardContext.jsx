import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

export const CardContext = createContext(null);

export function CardProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedData = localStorage.getItem("panier_cafethe");
        return savedData ? JSON.parse(savedData) : [];
    });

    const [prevCount, setPrevCount] = useState(cartItems.length);

    useEffect(() => {
        localStorage.setItem("panier_cafethe", JSON.stringify(cartItems));

        if (cartItems.length < prevCount) {
            toast.error("Article retiré du panier", {
                icon: '🗑️',
                id: 'notif-suppression-globale'
            });
        }
        setPrevCount(cartItems.length);
    }, [cartItems]);

    // AJOUTER UN PRODUIT (Synchronisé sur reference_sku)
    const addProductToCart = (newProduct) => {
        setCartItems((prevItems) => {
            // On utilise reference_sku pour identifier de manière unique la variante
            const pId = newProduct.reference_sku;
            const pWeight = newProduct.poids_affichage || newProduct.poids;

            const alreadyExists = prevItems.find(item =>
                item.reference_sku === pId &&
                (item.poids_affichage === pWeight || item.poids === pWeight)
            );

            if (alreadyExists) {
                toast.success(`+1 pour ${newProduct.nom_produit || newProduct.nom}`);
                return prevItems.map(item =>
                    item.reference_sku === pId && (item.poids_affichage === pWeight || item.poids === pWeight)
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                );
            }

            toast.success(`${newProduct.nom_produit || newProduct.nom} ajouté !`, {
                style: { border: '1px solid #634832', padding: '16px', color: '#634832', fontWeight: 'bold' },
                iconTheme: { primary: '#634832', secondary: '#FFFAEE' },
            });
            return [...prevItems, { ...newProduct, quantite: 1 }];
        });
    };

    // DIMINUER LA QUANTITÉ
    const decreaseQuantity = (id, poids) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item =>
                item.reference_sku === id && (item.poids_affichage === poids || item.poids === poids)
            );

            if (itemIndex === -1) return prevItems;
            const currentItem = prevItems[itemIndex];

            if (currentItem.quantite > 1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...currentItem, quantite: currentItem.quantite - 1 };
                return updatedItems;
            }

            return prevItems.filter((_, index) => index !== itemIndex);
        });
    };

    // SUPPRIMER TOUTE LA LIGNE
    const removeProductFromCart = (id, poids) => {
        setCartItems(prev => prev.filter(item =>
            !(item.reference_sku === id && (item.poids_affichage === poids || item.poids === poids))
        ));
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantite, 0);

    // CALCUL DU TOTAL (Utilise le prix_final calculé par ton SQL)
    const totalAmount = cartItems.reduce((total, item) => {
        // IMPORTANT : Ton SQL renvoie 'prix_final'
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