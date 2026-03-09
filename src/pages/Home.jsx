// Importation des hooks React.
import React, { useState, useEffect } from 'react';
// Hook pour la navigation.
import { useNavigate } from 'react-router-dom';
// Composants personnalisés.
import ButtonGold from "../components/ButtonGold.jsx";
import SEO from "../components/SEO.jsx";

/**
 * Composant de la page d'accueil.
 * Affiche le HERO, une sélection de coffrets et une section d'engagement.
 */
const Home = () => {
    const navigate = useNavigate();
    // État pour stocker les coffrets récupérés depuis l'API.
    const [coffrets, setCoffrets] = useState([]);
    // État pour gérer l'affichage du chargement.
    const [loading, setLoading] = useState(true);

    // Effet pour charger les coffrets au montage du composant.
    useEffect(() => {
        const fetchCoffrets = async () => {
            try {
                // Appel à l'API pour récupérer tous les articles.
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);
                const data = await response.json();

                // Filtrage pour ne garder que les produits de catégorie 'coffret' et en prendre 4.
                if (data && Array.isArray(data.articles)) {
                    const selection = data.articles
                        .filter(p => p.categorie === 'coffret')
                        .slice(0, 4);
                    setCoffrets(selection);
                } else {
                    setCoffrets([]);
                }
            } catch (error) {
                console.error("Erreur API coffrets:", error.message);
                setCoffrets([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCoffrets();
    }, []);

    return (
        <>
            {/* Gestion du SEO pour la page d'accueil */}
            <SEO
                title="Torréfacteur Artisanal & Thés d'Exception"
                description="CafThé : Découvrez nos cafés de spécialité fraîchement torréfiés et notre sélection de thés rares bio. Qualité premium et livraison éco-responsable."
            />
            <main className="bg-white dark:bg-black min-h-screen font-forum transition-colors duration-300">

                {/* 1. SECTION HERO (Approche Mobile First) */}
                {/* Bannière principale avec image de fond et titre  */}
                <div className="relative w-full h-125 mt-14 md:h-175 overflow-hidden flex items-center justify-center px-4 md:px-0">
                    <img
                        src="/images/backgroud-hero.webp"
                        alt="Bannière Café Thé"
                        className="absolute inset-0 w-full md:w-[95%] h-full mx-auto object-cover brightness-75 md:rounded-[40px]"
                    />
                    <div className="relative z-10 text-center w-full max-w-4xl">
                        {/* Titre Responsive : Taille adaptée selon l'écran */}
                        <h1 className="text-white text-4xl sm:text-6xl md:text-8xl uppercase tracking-[4px] md:tracking-[8px] drop-shadow-2xl leading-tight">
                            Saveurs<br />D’ailleurs
                        </h1>
                        <div className="mt-8 md:mt-10">
                            <ButtonGold
                                onClick={() => navigate('/boutique')}
                                className="w-full sm:w-auto px-10 py-4"
                            >
                                Explorer la collection
                            </ButtonGold>
                        </div>
                    </div>
                </div>

                {/* 2. SECTION SÉLECTION DU MOIS (Mise en avant des coffrets) */}
                <section className="max-w-325 mx-auto my-12 md:my-20 p-6 md:p-20 border-x-0 md:border border-gold-premium dark:border-silver-shine text-center relative overflow-hidden">
                    <div className="mb-10 md:mb-16">
                        <span className="text-gold-premium uppercase tracking-[2px] md:tracking-[4px] text-xs md:text-sm font-bold">Février 2026</span>
                        <h2 className="text-gold-premium text-3xl md:text-6xl my-4">Nos Coffrets Cadeaux</h2>
                        <p className="text-gold-premium/80 max-w-2xl mx-auto text-lg md:text-xl italic leading-relaxed px-4">
                            Offrez l'excellence avec nos assortiments thématiques.
                        </p>
                    </div>

                    {/* Affichage conditionnel : Chargement ou Liste des produits */}
                    {loading ? (
                        <div className="text-gold-premium animate-pulse py-10">Préparation de vos coffrets...</div>
                    ) : (
                        /* Grille responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur grand écran */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto mb-12 md:mb-16 px-4">
                            {coffrets.length > 0 ? (
                                coffrets.map((product) => {
                                    // Construction de l'URL de l'image avec fallback
                                    const productImageUrl = product && product.image
                                        ? `${import.meta.env.VITE_API_URL}/image/${product.image}`
                                        : "https://placehold.co/300x300";

                                    return (
                                        <div key={product.reference_sku} className="group flex flex-col items-center">
                                            <div className="relative w-full aspect-square sm:aspect-4/3 overflow-hidden rounded-2xl mb-4 md:mb-6 shadow-sm border border-gray-100">
                                                <div className="absolute top-3 left-3 z-20 bg-gold-premium text-white text-[11px] px-2 py-1 uppercase tracking-widest rounded-full">
                                                    Édition Limitée
                                                </div>
                                                <img
                                                    src={productImageUrl}
                                                    alt={product.nom_produit}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <h3 className="text-brand-brown dark:text-white text-lg md:text-xl font-medium">{product.nom_produit}</h3>
                                            <p className="text-brand-brown/70 dark:text-white/60 text-xs md:text-sm uppercase tracking-widest">{product.origine_produit}</p>
                                            <span className="text-gold-premium font-bold text-base md:text-lg mt-2 md:mt-3">{product.prix_ttc}€</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="col-span-full text-gold-premium italic">Aucun coffret disponible pour le moment.</p>
                            )}
                        </div>
                    )}

                    <ButtonGold onClick={() => navigate('/boutique')} className="w-full sm:w-auto px-12 py-4">
                        Voir toute la boutique
                    </ButtonGold>
                </section>

                {/* 3. SECTION ENGAGEMENT (Valeurs de la marque) */}
                <div className="py-16 md:py-24 px-6 text-center bg-brown-bg text-white">
                    <h2 className="text-gold-premium text-3xl md:text-5xl mb-6 md:mb-10 tracking-wide">L'Excellence à Chaque Tasse</h2>
                    <p className="max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed font-light opacity-90">
                        Découvrez des saveurs authentiques et des terroirs d'exception.
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
