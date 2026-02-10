import { createContext, useState, useEffect } from "react";

export const CardContext = createContext(null);

export function CardProvider({ children }) {
    // SOLUTION : On lit le localStorage DIRECTEMENT à l'initialisation
    // Cela évite le "flash" d'un tableau vide qui écrase tes données
    const [cartItems, setCartItems] = useState(() => {
        const savedData = localStorage.getItem("panier_cafethe");
        return savedData ? JSON.parse(savedData) : [];
    });

    // Sauvegarder les données à chaque modification
    useEffect(() => {
        localStorage.setItem("panier_cafethe", JSON.stringify(cartItems));
    }, [cartItems]);

    const addProductToCart = (newProduct) => {
        setCartItems((prevItems) => {
            const alreadyExists = prevItems.find(item =>
                item.id === newProduct.id && item.poids === newProduct.poids
            );

            if (alreadyExists) {
                return prevItems.map(item =>
                    item.id === alreadyExists.id && item.poids === alreadyExists.poids
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                );
            }
            return [...prevItems, { ...newProduct, quantite: 1 }];
        });
    };

    const removeProductFromCart = (id, poids) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.poids === poids)));
    };

    const value = {
        cartItems,
        addProductToCart,
        removeProductFromCart,
        // On s'assure que le total est recalculé proprement
        totalAmount: cartItems.reduce((total, item) =>
            total + (parseFloat(item.prixFinal) * item.quantite), 0
        ).toFixed(2)
    };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
}