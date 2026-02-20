import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGold from "../components/ButtonGold.jsx";

const Home = () => {
    const navigate = useNavigate();
    const [coffrets, setCoffrets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoffrets = async () => {
            try {
                // On utilise la bonne route avec le préfixe /api
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);

                if (!response.ok) {
                    throw new Error(`Erreur serveur: ${response.status}`);
                }

                const data = await response.json();

                // SÉCURITÉ ADAPTÉE À TON OBJET API
                // On vérifie si data.articles existe et est un tableau
                if (data && Array.isArray(data.articles)) {
                    const selection = data.articles
                        .filter(p => p.categorie === 'coffret')
                        .slice(0, 4);
                    setCoffrets(selection);
                } else {
                    console.error("Format attendu non trouvé. Reçu :", data);
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
        <main className="bg-[#FDFCF7] min-h-screen font-forum">

            {/* 1. SECTION HERO */}
            <div className="relative w-full h-[700px] overflow-hidden flex items-center justify-center">
                <img
                    src="/images/backgroud-hero.webp"
                    alt="Bannière Café Thé"
                    className="absolute inset-0 w-[95%] h-full mx-auto object-cover brightness-75 rounded-[40px]"
                />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-white text-6xl md:text-8xl uppercase tracking-[8px] drop-shadow-2xl leading-tight">
                        Saveurs<br />D’ailleurs
                    </h1>
                    <div className="mt-10">
                        <ButtonGold onClick={() => navigate('/boutique')} className="px-10 py-4 border-white text-white hover:bg-white hover:text-brown-bg transition-all">
                            Explorer la collection
                        </ButtonGold>
                    </div>
                </div>
            </div>

            {/* 2. SECTION SÉLECTION DU MOIS (DANS L'ENCADRÉ) */}
            <section className="max-w-[1300px] mx-auto my-20 p-10 md:p-20 border border-gold-premium text-center relative overflow-hidden">
                <div className="mb-16">
                    <span className="text-gold-premium uppercase tracking-[4px] text-sm font-bold">Février 2026</span>
                    <h2 className="text-gold-premium text-5xl md:text-6xl my-4">Nos Coffrets Cadeaux</h2>
                    <p className="text-gold-premium/80 max-w-2xl mx-auto text-xl italic leading-relaxed">
                        Offrez l'excellence avec nos assortiments thématiques.
                    </p>
                </div>

                {loading ? (
                    <div className="text-gold-premium animate-pulse py-10">Préparation de vos coffrets...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
                        {/* On utilise une boucle sécurisée qui ne s'exécute que si coffrets est un tableau */}
                        {coffrets.length > 0 ? (
                            coffrets.map((product) => {
                                // Brique de sécurité imageUrl identique à celle demandée
                                const productImageUrl = product && product.image
                                    ? `${import.meta.env.VITE_API_URL}/image/${product.image}`
                                    : "https://placehold.co/300x300";

                                return (
                                    <div key={product.reference_sku} className="group flex flex-col items-center transition-transform hover:-translate-y-2">
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm border border-gray-100">
                                            <div className="absolute top-4 left-4 z-20 bg-gold-premium text-white text-[10px] px-3 py-1 uppercase tracking-widest rounded-full shadow-lg">
                                                Édition Limitée
                                            </div>
                                            <img
                                                src={productImageUrl}
                                                alt={product.nom_produit}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="text-brand-brown text-xl font-medium">{product.nom_produit}</h3>
                                        <p className="text-brand-brown/70 text-sm uppercase tracking-widest">{product.origine_produit}</p>
                                        <span className="text-gold-premium font-bold text-lg mt-3">{product.prix_ttc}€</span>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-gold-premium italic">Aucun coffret disponible pour le moment.</p>
                        )}
                    </div>
                )}

                <ButtonGold onClick={() => navigate('/boutique')} className="px-12 py-4">
                    Voir toute la boutique
                </ButtonGold>
            </section>

            {/* 3. SECTION ENGAGEMENT */}
            <div className="py-24 px-6 text-center bg-brown-bg text-white">
                <h2 className="text-gold-premium text-5xl mb-10 tracking-wide">L'Excellence à Chaque Tasse</h2>
                <p className="max-w-4xl mx-auto text-2xl leading-relaxed font-light opacity-90">
                    Découvrez des saveurs authentiques et des terroirs d'exception.
                </p>
            </div>
        </main>
    );
};

export default Home;