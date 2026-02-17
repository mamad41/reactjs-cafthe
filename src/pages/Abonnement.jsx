import React from 'react';
import ButtonGold from '../components/ButtonGold';

const Abonnement = () => {
    const plans = [
        {
            title: "Découverte",
            price: "19",
            description: "Idéal pour s'initier aux grands crus.",
            features: ["2 sachets de 250g / mois", "Fiches dégustation", "Livraison incluse"],
            isPopular: false
        },
        {
            title: "Amateur",
            price: "35",
            description: "Notre abonnement le plus plébiscité.",
            features: ["4 sachets de 250g / mois", "1 accessoire barista offert", "Accès aux ventes privées", "Livraison incluse"],
            isPopular: true
        },
        {
            title: "Expert",
            price: "65",
            description: "Pour les véritables passionnés de café.",
            features: ["Coffret de 1kg / mois", "Ateliers visio mensuels", "Cafés d'exception (Éditions limitées)", "Livraison prioritaire"],
            isPopular: false
        }
    ];

    return (
        <section className="bg-[#FDFCF7] py-20 px-4 font-forum">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-[#C5A059] text-4xl md:text-5xl uppercase tracking-[0.2em] mb-4">
                    Nos Abonnements
                </h2>
                <p className="text-[#634832] opacity-80 max-w-lg mx-auto italic">
                    Recevez chaque mois une sélection rigoureuse de nos meilleurs grains directement chez vous.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative p-8 rounded-[30px] bg-white border transition-all duration-500 hover:shadow-2xl flex flex-col ${
                            plan.isPopular ? 'border-[#C5A059] shadow-xl scale-105 z-10' : 'border-gray-100'
                        }`}
                    >
                        {plan.isPopular && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A059] text-white px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">
                                Recommandé
                            </span>
                        )}

                        <div className="mb-8">
                            <h3 className="text-[#333] text-2xl uppercase mb-2 tracking-tight">{plan.title}</h3>
                            <p className="text-gray-400 text-sm font-sans italic">{plan.description}</p>
                        </div>

                        <div className="mb-8 flex items-baseline">
                            <span className="text-4xl font-bold text-[#634832]">{plan.price}€</span>
                            <span className="text-gray-400 text-sm ml-2">/ mois</span>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#333] font-sans">
                                    <span className="text-[#C5A059]">✦</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <ButtonGold
                            className={`w-full py-4 ${!plan.isPopular && 'opacity-80 hover:opacity-100'}`}
                        >
                            S'abonner
                        </ButtonGold>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Abonnement;