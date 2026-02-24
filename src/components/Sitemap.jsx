import React from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";

const Sitemap = () => {
    const sections = [
        {
            title: "Navigation",
            links: [
                { name: "Accueil", path: "/" },
                { name: "La Boutique", path: "/boutique" },
                { name: "Nos Abonnements", path: "/Abonnement" }, // Corrigé selon ton App.jsx
                { name: "Espace Client", path: "/Espace-Client" }  // Corrigé selon ton App.jsx
            ]
        },
        {
            title: "Nos Produits",
            links: [
                { name: "Cafés d'exception", path: "/boutique" },
                { name: "Thés & Infusions", path: "/boutique" },
                { name: "Coffrets Cadeaux", path: "/boutique" },
                { name: "Accessoires", path: "/boutique" }
            ]
        },
        {
            title: "Aide & Support",
            links: [
                { name: "Foire Aux Questions", path: "/FAQ" },
                { name: "Contactez-nous", path: "/Contact" },     // Corrigé selon ton App.jsx
                { name: "À Propos", path: "/A-Propos" }           // Corrigé selon ton App.jsx
            ]
        },
        {
            title: "Légal & Sécurité",
            links: [
                { name: "Conditions Générales (CGV)", path: "/Cgv" }, // Corrigé selon ton App.jsx
                { name: "Réinitialiser mot de passe", path: "/reset-password" },
                { name: "Mentions Légales", path: "/sitemap" } // À adapter si tu crées la page
            ]
        }
    ];

    return (
        <>
            <SEO
                title="Plan du Site"
                description="Explorez l'ensemble des pages de CafThé : boutique de café, abonnements, FAQ et espace client."
            />

            <main id="smp" className="min-h-screen bg-input-bg pt-32 pb-20 px-4 md:px-10 font-forum selection:bg-gold-premium/30">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-16 text-center">
                        <h1 className="text-gold-premium text-4xl md:text-5xl uppercase tracking-[0.2em] mb-4">
                            Plan du Site
                        </h1>
                        <div className="h-px w-24 bg-gold-premium mx-auto"></div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {sections.map((section, idx) => (
                            <section key={idx} className="space-y-6 animate-fadeIn">
                                <h2 className="text-[#634832] text-xl uppercase tracking-widest border-b border-gold-premium/20 pb-4">
                                    {section.title}
                                </h2>
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-500 hover:text-gold-premium transition-colors duration-300 text-sm italic font-sans flex items-center gap-2 group"
                                            >
                                                <span className="h-px w-0 bg-gold-premium transition-all duration-300 group-hover:w-4"></span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Sitemap;