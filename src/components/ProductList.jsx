import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCards from "./ProductCards.jsx";

const ProductList = ({ category }) => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
                const data = await response.json();
                setProduits(data.articles);
            } catch (err) {
                setError("Impossible de charger les produits");
            } finally {
                setIsLoading(false);
            }
        };
        void fetchProduits();
    }, []);

    // 1. FILTRAGE
    const produitsFiltrés = category
        ? produits.filter(produit =>
            produit.categorie?.toLowerCase().includes(category.toLowerCase().trim())
        )
        : produits;

    // 2. REGROUPEMENT (Fusion Unité/Vrac)
    const produitsRegroupés = produitsFiltrés.reduce((acc, produit) => {
        const nom = produit.nom_produit;
        if (!acc[nom]) acc[nom] = [];
        acc[nom].push(produit);
        return acc;
    }, {});

    const nomsProduitsUniques = Object.keys(produitsRegroupés);

    // ÉTAT CHARGEMENT
    if (isLoading) {
        return (
            <div className="max-w-[1400px] mx-auto px-5 py-10">
                <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-[20px] p-5 shadow-sm">
                            <Skeleton height={180} borderRadius={15} />
                            <div className="mt-4"><Skeleton height={20} width="80%" /></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // AFFICHAGE NORMAL
    return (
        <div className="w-full max-w-[1400px] mx-auto px-5 py-10">
            {/* LA GRILLE : grid-cols-4 force les 4 colonnes sur écran large */}
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {nomsProduitsUniques.map((nom) => (
                    <ProductCards
                        key={nom}
                        nomProduit={nom}
                        variantes={produitsRegroupés[nom]}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;