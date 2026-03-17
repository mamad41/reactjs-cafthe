import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FAQItem = ({ question, answer, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gold-premium/10 dark:border-white/10 py-6 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <span className="font-forum uppercase tracking-widest text-lg text-brand-brown dark:text-white group-hover:text-gold-premium transition-colors">
                    {question}
                </span>
                {isOpen ? <ChevronUp className="text-gold-premium" size={20} aria-hidden="true" /> : <ChevronDown className="text-gray-400" size={20} aria-hidden="true" />}
            </button>
            <div id={`faq-answer-${id}`} className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <div className="font-sans text-sm leading-relaxed text-neutral-600 dark:text-gray-400 italic">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "D'où proviennent vos grains ?",
            answer: "Nous sélectionnons nos grains auprès de petits producteurs en Éthiopie, en Jamaïque et au Japon, certifiés par les labels Bio et Fairtrade pour garantir une qualité exceptionnelle."
        },
        {
            id: 2,
            question: "Comment fonctionne le programme de fidélité ?",
            answer: (
                <p>
                    Chaque commande vous rapporte des points : **1€ dépensé = 1 Graine de Café**.
                    Dès 100 Graines cumulées, vous bénéficiez d'une remise de **5€** sur votre prochain achat.
                    Vous pouvez consulter votre solde en temps réel dans votre Espace Client.
                </p>
            )
        },
        {
            id: 3,
            question: "Comment utiliser mon code promo de bienvenue ?",
            answer: "Lors de votre première commande, entrez le code **BIENVENUE10** dans le champ 'Code privilège' de votre panier. Une remise immédiate de 10% sera appliquée sur l'ensemble de votre sélection."
        },
        {
            id: 4,
            question: "Comment conserver mon café ou mon thé ?",
            answer: "Pour préserver les arômes, gardez vos produits dans un endroit frais et sec, idéalement dans leur emballage d'origine hermétique. Évitez absolument le réfrigérateur."
        },
        {
            id: 5,
            question: "Quels sont les délais de livraison ?",
            answer: "Nos commandes sont préparées avec soin sous 24h. La livraison prend généralement 3 à 5 jours ouvrés via nos partenaires éco-responsables."
        },
        {
            id: 6,
            question: "Le paiement est-il sécurisé ?",
            answer: "Absolument. Notre plateforme utilise le cryptage SSL 256 bits via Stripe, garantissant que vos données bancaires ne sont jamais stockées ni accessibles."
        }
    ];

    return (
        <>
        <SEO
            title="Aide & Questions Fréquentes"
            description="Tout savoir sur la conservation du café, nos délais de livraison, le programme de fidélité et nos garanties de paiement sécurisé."
        />
        <main id="Faq" className="bg-white dark:bg-black min-h-screen py-24 px-[10vw] transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-gold-premium dark:text-white text-4xl font-forum uppercase tracking-[8px] mb-6 flex items-center justify-center gap-4">
                        <HelpCircle size={32} aria-hidden="true" /> Questions Fréquentes
                    </h1>
                    <div className="w-20 h-px bg-gold-premium mx-auto opacity-40 mb-4" aria-hidden="true"></div>
                    <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest italic">
                        Tout ce que vous devez savoir sur l'expérience CafThé
                    </p>
                </div>

                <div className="bg-card-bg dark:bg-surface-dark p-8 md:p-12 rounded-[40px] shadow-2xl border border-gold-premium/5" aria-label="Liste des questions fréquentes">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.id} {...faq} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[3px] font-sans">
                        Vous ne trouvez pas votre réponse ?
                    </p>
                    <Link to='/Contact#form'>
                        <button aria-label="Contacter le service client" className="mt-6 text-gold-premium border border-gold-premium/30 px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-[4px] hover:bg-gold-premium hover:text-white transition-all duration-300">
                            Contacter un expert
                        </button>
                    </Link>
                </div>
            </div>
        </main>
        </>
    );
};

export default FAQ;
