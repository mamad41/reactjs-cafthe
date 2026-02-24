import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SEO from "../components/SEO";

const ProductDetails = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Appel à ton API
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                // On stocke l'article (ton API renvoie { article: {...} })
                setProduit(data.article);
            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduit();
        }
    }, [id]);

    // Écran de chargement
    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 px-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Skeleton height={500} borderRadius={40} />
                    <div className="space-y-6">
                        <Skeleton height={40} width="80%" />
                        <Skeleton count={4} />
                        <Skeleton height={50} width="30%" />
                    </div>
                </div>
            </div>
        );
    }

    // Écran d'erreur
    if (error || !produit) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center font-forum">
                <h3 className="text-2xl text-[#634832] mb-4">Une erreur est survenue</h3>
                <p className="text-gray-500 mb-8">{error || "Produit introuvable"}</p>
                <Link to="/" className="text-gold-premium underline uppercase tracking-widest text-sm">
                    Retour à l'accueil
                </Link>
            </div>
        );
    }

    // --- LOGIQUE IMAGE CORRIGÉE ---
    // On utilise /image/ (sans s) comme dans tes ProductCards qui fonctionnent
    const imageUrl = produit.image
        ? `${import.meta.env.VITE_API_URL}/image/${produit.image}`
        : `https://placehold.co/600x600?text=${produit.nom_produit}`;

    return (
        <>
            <SEO
                title={produit.nom_produit}
                description={`${produit.nom_produit} - ${produit.dèscription_produit?.substring(0, 150)}...`}
                image={imageUrl}
            />

            <main className="product-details pt-32 pb-20 px-4 md:px-10 max-w-6xl mx-auto font-forum">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Colonne Image */}
                    <div className="overflow-hidden rounded-[40px] border border-gray-100 shadow-sm bg-white">
                        <img
                            src={imageUrl}
                            alt={produit.nom_produit}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x600?text=Image+non+trouvée";
                            }}
                        />
                    </div>

                    {/* Colonne Infos */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <span className="text-gold-premium uppercase tracking-[3px] text-xs font-bold">
                                {produit.categorie || "Sélection CafThé"}
                            </span>
                            <h1 className="text-4xl md:text-5xl text-[#634832] uppercase tracking-widest leading-tight mt-2">
                                {produit.nom_produit}
                            </h1>
                        </div>

                        <p className="text-gray-600 italic font-sans leading-relaxed text-lg">
                            {produit.dèscription_produit}
                        </p>

                        <div className="h-px w-full bg-gold-premium/20"></div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-[#634832] font-sans">
                                {produit.prix_ttc}€
                            </span>
                            <span className="text-gray-400 text-sm font-sans italic">TTC</span>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl inline-block border border-gray-100">
                            <p className="text-xs uppercase tracking-widest text-gray-500 font-sans">
                                <strong>Disponibilité :</strong> {produit.stock > 0 ? `${produit.stock} unités en stock` : "Victime de son succès"}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                to="/boutique"
                                className="inline-block text-xs uppercase tracking-[0.3em] border-b border-gold-premium pb-2 hover:text-gold-premium transition-all duration-300"
                            >
                                ← Retour à la boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetails;