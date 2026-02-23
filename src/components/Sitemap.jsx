import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
    const sections = [
        {
            title: "Navigation",
            links: [
                { name: "Accueil", path: "/" },
                { name: "Boutique", path: "/boutique" },
                { name: "Abonnements", path: "/abonnement" },
                { name: "Espace Client", path: "/espace-client" }
            ]
        },
        {
            title: "Nos Produits",
            links: [
                { name: "Cafés d'exception", path: "/boutique?category=café" },
                { name: "Thés & Infusions", path: "/boutique?category=thé" },
                { name: "Coffrets Cadeaux", path: "/boutique?category=coffret" },
                { name: "Accessoires", path: "/boutique?category=accessoire" }
            ]
        },
        {
            title: "Aide & Support",
            links: [
                { name: "FAQ", path: "/faq" },
                { name: "Contact", path: "/contact" },
                { name: "À Propos", path: "/a-propos" }
            ]
        },
        {
            title: "Légal",
            links: [
                { name: "Mentions Légales", path: "/mentions-legales" },
                { name: "CGV", path: "/cgv" },
                { name: "Politique de Confidentialité", path: "/confidentialite" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-input-bg pt-32 pb-20 px-4 md:px-10 font-forum selection:bg-gold-premium/30">
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
    );
};

export default Sitemap;