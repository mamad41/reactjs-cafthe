// Importation des hooks React et des composants de routing.
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Importation du composant Skeleton pour l'affichage pendant le chargement.
import Skeleton from "react-loading-skeleton";
import SEO from "../components/SEO";

/**
 * Composant affichant les détails d'un produit spécifique.
 * Récupère l'ID du produit depuis l'URL et charge ses données depuis l'API.
 */
const ProductDetails = () => {
    // Récupération de l'ID du produit depuis les paramètres de l'URL.
    const { id } = useParams();
    // États pour stocker les données du produit, le statut de chargement et les erreurs.
    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effet pour charger les détails du produit lorsque l'ID change.
    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Appel à l'API pour récupérer les détails de l'article.
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                // Mise à jour de l'état avec les données de l'article reçues.
                // L'API renvoie un objet sous la forme { article: {...} }.
                setProduit(data.article);
            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                // Fin du chargement, que ce soit un succès ou une erreur.
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduit();
        }
    }, [id]);

    // Affichage d'un squelette de chargement pendant la récupération des données.
    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 px-10 max-w-6xl mx-auto" aria-live="polite">
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

    // Affichage d'un message d'erreur si le produit n'a pas pu être chargé.
    if (error || !produit) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center font-forum" role="alert">
                <h3 className="text-2xl text-[#634832] mb-4">Une erreur est survenue</h3>
                <p className="text-gray-500 mb-8">{error || "Produit introuvable"}</p>
                <Link to="/" className="text-gold-premium underline uppercase tracking-widest text-sm" aria-label="Retourner à la page d'accueil">
                    Retour à l'accueil
                </Link>
            </div>
        );
    }

    // Construction de l'URL de l'image du produit.
    // Utilise une image par défaut si aucune image n'est fournie.
    const imageUrl = produit.image
        ? `${import.meta.env.VITE_API_URL}/image/${produit.image}`
        : `https://placehold.co/600x600?text=${produit.nom_produit}`;

    return (
        <>
            {/* Gestion du SEO pour la page produit */}
            <SEO
                title={produit.nom_produit}
                description={`${produit.nom_produit} - ${produit.dèscription_produit?.substring(0, 150)}...`}
                image={imageUrl}
            />

            <main className="product-details pt-32 pb-20 px-4 md:px-10 max-w-6xl mx-auto font-forum">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Colonne de gauche : Image du produit */}
                    <div className="overflow-hidden rounded-[40px] border border-gray-100 shadow-sm bg-white">
                        <img
                            src={imageUrl}
                            alt={`Photo de présentation du produit ${produit.nom_produit}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onError={(e) => {
                                // Fallback si l'image ne charge pas
                                e.target.src = "https://placehold.co/600x600?text=Image+non+trouvée";
                            }}
                        />
                    </div>

                    {/* Colonne de droite : Informations détaillées */}
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

                        <div className="h-px w-full bg-gold-premium/20" aria-hidden="true"></div>

                        <div className="flex items-baseline gap-4" aria-label={`Prix: ${produit.prix_ttc} euros TTC`}>
                            <span className="text-4xl font-bold text-[#634832] font-sans">
                                {produit.prix_ttc}€
                            </span>
                            <span className="text-gray-400 text-sm font-sans italic">TTC</span>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl inline-block border border-gray-100">
                            <p className="text-xs uppercase tracking-widest text-gray-500 font-sans" aria-live="polite">
                                <strong>Disponibilité :</strong> {produit.stock > 0 ? `${produit.stock} unités en stock` : "Victime de son succès"}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                to="/boutique"
                                className="inline-block text-xs uppercase tracking-[0.3em] border-b border-gold-premium pb-2 hover:text-gold-premium transition-all duration-300"
                                aria-label="Retourner à la page boutique"
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