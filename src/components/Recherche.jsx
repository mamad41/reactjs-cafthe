import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCards from '../components/ProductCards';

// 1. On déplace la fonction de normalisation HORS du composant
const normalizeString = (str) => {
    if (!str) return ""; // Sécurité si la chaîne est vide
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

const Recherche = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || ""; // On ne met pas en minuscule ici pour l'affichage h1

    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                const data = await response.json();
                // On s'assure de récupérer data.articles

                console.log("Données brutes reçues de l'API :", data.articles);

                setProduits(data.articles || []);
            } catch (err) {
                console.error("Erreur recherche:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    // 2. FILTRAGE SÉCURISÉ
    const searchClean = normalizeString(query);

    const resultats = produits.filter(p => {
        // Sécurité : on vérifie que nom_produit existe avant de normaliser
        const nameClean = normalizeString(p.nom_produit || "");
        const catClean = normalizeString(p.categorie || "");

        return nameClean.includes(searchClean) || catClean.includes(searchClean);
    });

    // 3. REGROUPEMENT (Crucial pour l'image)
    const produitsRegroupés = resultats.reduce((acc, produit) => {
        if (!produit.nom_produit) return acc;

        const nom = produit.nom_produit.trim();
        if (!acc[nom]) acc[nom] = [];

        // On vérifie que l'objet produit contient bien la propriété image
        // Si ton API renvoie l'image sous un autre nom (ex: p.image_path),
        // il faut le renommer ici pour ProductCards
        acc[nom].push(produit);
        return acc;
    }, {});

    const nomsUniques = Object.keys(produitsRegroupés);

    return (
        <div className="w-full bg-[#FDFCF7] min-h-screen py-20">
            <div className="max-w-[1200px] mx-auto px-10">
                <h1 className="font-forum text-3xl text-[#634832] uppercase tracking-widest mb-10">
                    Résultats pour : "{query}"
                </h1>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <p className="font-forum text-[#C5A059] animate-pulse">Recherche en cours...</p>
                    </div>
                ) : nomsUniques.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {nomsUniques.map(nom => (
                            <ProductCards
                                key={nom}
                                nomProduit={nom}
                                // On passe le tableau complet des variantes
                                variantes={produitsRegroupés[nom]}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
                        <p className="text-gray-500 italic font-forum text-lg">
                            Aucun article ne correspond à votre recherche.
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="mt-8 text-[#C5A059] uppercase tracking-widest text-xs border-b border-[#C5A059] pb-1 hover:text-[#634832] hover:border-[#634832] transition-all"
                        >
                            Retourner à la boutique
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recherche;