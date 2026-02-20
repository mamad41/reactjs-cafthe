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

                if (data && Array.isArray(data.articles)) {
                    setProduits(data.articles);
                } else {
                    setProduits([]);
                }
            } catch (err) {
                console.error("Erreur ProductList:", err.message);
                setError("Impossible de charger les produits");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, []);

    // FILTRAGE
    const produitsFiltrés = category
        ? produits.filter(produit =>
            produit.categorie?.toLowerCase().includes(category.toLowerCase().trim())
        )
        : produits;

    // REGROUPEMENT PAR NOM (Garde toutes les propriétés, y compris prix_original)
    const produitsRegroupés = produitsFiltrés.reduce((acc, produit) => {
        const nom = produit.nom_produit.trim();
        if (!acc[nom]) acc[nom] = [];
        acc[nom].push(produit);
        return acc;
    }, {});

    const nomsProduitsUniques = Object.keys(produitsRegroupés);

    if (isLoading) {
        return (
            <div className="max-w-[1400px] mx-auto px-10 py-20">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-10">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-[35px] p-8 shadow-sm h-[500px]">
                            <Skeleton height={250} borderRadius={25} />
                            <div className="mt-8"><Skeleton height={30} width="80%" /></div>
                            <div className="mt-auto"><Skeleton height={50} borderRadius={15} /></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <div className="text-center py-20 text-gold-premium italic">{error}</div>;

    return (
        <div className="w-full bg-[#FDFCF7] py-10">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-x-8 gap-y-16">
                    {nomsProduitsUniques.map((nom) => {
                        const variantes = produitsRegroupés[nom];
                        const categoryId = variantes[0].categorie?.toLowerCase().trim();

                        return (
                            <ProductCards
                                key={nom}
                                nomProduit={nom}
                                variantes={variantes}
                                category={categoryId}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;