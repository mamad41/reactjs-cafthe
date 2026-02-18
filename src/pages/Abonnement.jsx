import React, { useState, useEffect } from 'react';
import ButtonGold from '../components/ButtonGold';

const Abonnement = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                // Appel au backend sur le port 3000
                const response = await fetch('http://localhost:3000/api/abonnements');

                if (!response.ok) throw new Error("Erreur réseau");

                const data = await response.json();

                // Transformation des données SQL pour le rendu React
                const formattedData = data.map(plan => ({
                    ...plan,
                    // On s'assure que les features sont un tableau même si la chaîne est vide
                    features: typeof plan.features === 'string' ? plan.features.split(',') : (plan.features || [])
                }));

                setPlans(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des tarifs :", error);
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FDFCF7]">
                <div className="text-[#C5A059] text-2xl font-forum animate-pulse">
                    Chargement de nos offres...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FDFCF7] min-h-screen py-20 px-10 font-forum">
            {/* Header de la page */}
            <div className="text-center mb-16">
                <h1 className="text-[#C5A059] text-4xl uppercase tracking-[0.2em]">
                    Nos Abonnements
                </h1>
                <div className="h-[1px] w-24 bg-[#C5A059] mx-auto mt-4"></div>
            </div>

            {/* Conteneur des badges */}
            <div className="max-w-[1400px] mx-auto flex flex-row justify-between items-stretch mt-[100px] gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={plan.id || index}
                        /* Correction : On utilise plan.est_populaire (minuscule comme en SQL)
                           On utilise w-[31%] pour forcer l'alignement côte à côte
                        */
                        className={`w-[31%] relative bg-white rounded-[40px] border border-[#C5A059] flex flex-col items-center text-center p-8
                          transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105
                          ${plan.est_populaire === 1 ? 'shadow-xl z-10 border-2' : 'shadow-sm z-0'}`}
                    >
                        {/* Badge Recommandé - Correction du positionnement */}
                        {plan.est_populaire === 1 && (
                            <span className="absolute -top-4 bg-[#C5A059] text-white px-6 py-1 rounded-full text-[10px] uppercase font-bold shadow-md">
                                Recommandé
                            </span>
                        )}

                        {/* Correction : On utilise plan.nom (propriété SQL) */}
                        <h3 className="text-[#C5A059] text-2xl uppercase mb-4 mt-2">
                            {plan.nom || "Sans titre"}
                        </h3>

                        {/* Correction : On utilise plan.prix (propriété SQL) */}
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-[#634832]">
                                {plan.prix}€
                            </span>
                            <span className="text-gray-400 text-xs ml-1 font-sans">/mois</span>
                        </div>

                        {/* Liste des caractéristiques */}
                        <ul className="list-none p-0 m-0 space-y-4 mb-10 w-full">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-600 font-sans leading-relaxed">
                                    {feature.trim()}
                                </li>
                            ))}
                        </ul>

                        {/* Bouton d'action */}
                        <div className="mt-auto w-full flex justify-center">
                            <ButtonGold className="!px-10 !py-3 !w-auto text-[11px] tracking-widest uppercase">
                                S'abonner
                            </ButtonGold>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Abonnement;