import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gold-premium/10 dark:border-white/10 py-6 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left group"
            >
                <span className="font-forum uppercase tracking-widest text-lg text-brand-brown dark:text-white group-hover:text-gold-premium transition-colors">
                    {question}
                </span>
                {isOpen ? <ChevronUp className="text-gold-premium" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="font-sans text-sm leading-relaxed text-neutral-600 dark:text-silver-dim italic">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "D'où proviennent vos grains ?",
            answer: "Nous sélectionnons nos grains auprès de petits producteurs en Éthiopie, en Jamaïque et au Japon, certifiés par les labels Bio et Fairtrade pour garantir une qualité exceptionnelle."
        },
        {
            question: "Comment conserver mon café ou mon thé ?",
            answer: "Pour préserver les arômes, gardez vos produits dans un endroit frais et sec, idéalement dans leur emballage d'origine hermétique. Évitez le réfrigérateur."
        },
        {
            question: "Quels sont les délais de livraison ?",
            answer: "Nos commandes sont préparées sous 24h. La livraison prend généralement 3 à 5 jours ouvrés en Europe."
        },
        {
            question: "Le paiement est-il sécurisé ?",
            answer: "Absolument. Nous utilisons des protocoles SSL de haute sécurité pour protéger toutes vos transactions bancaires."
        }
    ];

    return (
        <main id="Faq" className="bg-white dark:bg-black min-h-screen py-24 px-[10vw] transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-gold-premium dark:text-white text-4xl font-forum uppercase tracking-[8px] mb-6 flex items-center justify-center gap-4">
                        <HelpCircle size={32} /> Questions Fréquentes
                    </h1>
                    <div className="w-20 h-px bg-gold-premium mx-auto opacity-40"></div>
                </div>

                <div className="bg-[#F9F8F3] dark:bg-[#1A1A1A] p-8 md:p-12 rounded-[40px] shadow-2xl border border-gold-premium/5">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-sans">
                        Vous ne trouvez pas votre réponse ?
                    </p>
                    <Link to='/contact'>
                    <button className="mt-4 text-gold-premium underline font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                        Contactez notre service client
                    </button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default FAQ;