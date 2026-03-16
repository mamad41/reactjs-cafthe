import React from 'react';
import SEO from '../components/SEO';

const APropos = () => {
    return (
        <main className="bg-white text-gold-premium dark:bg-black min-h-screen font-forum transition-colors duration-500">
            {/* 1. SECTION HERO */}
            <div className="relative h-125 w-full overflow-hidden">
                <img
                    loading="lazy"
                    src="/images/Cafhe-bg-hero-Apropos.webp"
                    alt="Plantation de café"
                    className="w-full h-full object-cover"
                />
                <div style={{
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h1 style={{
                        fontSize: '64px',
                        fontFamily: 'Forum, serif',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                        margin: 0,
                        letterSpacing: '5px',
                        textTransform: 'uppercase'
                    }}>
                        A Propos
                    </h1>
                </div>
            </div>

            {/* 2. SECTION TEXTE : L'histoire */}
            <div className="bg-coffee-dark py-[10vw] px-[15vw]">
                <div className="max-w-250 mx-auto text-center space-y-8">
                    <h2 className="text-gold-premium text-2xl uppercase tracking-widest mb-10">
                        CafThé : L'Artisan des Saveurs d'Ailleurs
                    </h2>
                    <div className="font-sans leading-relaxed space-y-6 text-sm md:text-base opacity-90 text-white">
                        <p>
                            Fondé avec la passion des terroirs d'exception, CafThé vous invite à un voyage
                            sensoriel unique à travers la plus belle sélection de cafés de spécialité et de thés rares en Europe.
                        </p>
                        <p>
                            Nous travaillons main dans la main avec un réseau de petits producteurs engagés
                            privilégiant des méthodes de culture durables et une éthique sociale forte.
                        </p>
                        <p className="italic text-gold-premium">
                            Retrouvez l'expérience CafThé sur notre boutique en ligne et devenez votre propre barista à la maison.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. SECTION : ENVIRONNEMENT */}
            <section id="action" className="py-24 px-[10vw] bg-white dark:bg-black transition-colors duration-500">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-gold-premium dark:text-white text-3xl uppercase tracking-[4px]">
                            Notre Engagement Éco-Responsable
                        </h2>
                        <div className="w-24 h-px bg-gold-premium opacity-40"></div>
                        <div className="font-sans text-gold-premium dark:text-[#D1D5DB] space-y-5 leading-relaxed text-sm md:text-base">
                            <p>La préservation de l'environnement est au cœur de chaque grain que nous torréfions.</p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold-premium rounded-full"></span>
                                    <span>Torréfaction artisanale à faible émission</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold-premium rounded-full"></span>
                                    <span>Soutien direct aux cultures biologiques d'ombrage</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="rounded-[40px] overflow-hidden border border-gold-premium/10 dark:border-white/10 shadow-2xl">
                            <img src="/images/Cafthé-environnement.webp" alt="Environnement" className="w-full h-112.5 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECTION : NOS PARTENAIRES */}
            <section id="partenaire" className="bg-card-bg dark:bg-[#212121] py-24 px-[10vw] transition-colors duration-500">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-gold-premium dark:text-white text-2xl uppercase tracking-[5px] mb-20">
                        Associations Partenaires
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium transition-all">
                            <img
                                loading="lazy"
                                src="/images/logo_alliance.svg" alt="Alliance" className="h-16 mx-auto mb-6 dark:invert" />
                            <h4 className="text-gold-premium font-forum uppercase text-lg mb-3">Alliance Forêt</h4>
                        </div>
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium transition-all">
                            <img
                                loading="lazy"
                                src="/images/Water.org_logo_png_rgb.webp" alt="Water.org" className="h-16 mx-auto mb-6 dark:invert" />
                            <h4 className="text-gold-premium font-forum uppercase text-lg mb-3">Pure Water Pro</h4>
                        </div>
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium transition-all">
                            <img
                                loading="lazy"
                                src="/images/fondation-ensemble.webp" alt="Ensemble" className="h-16 mx-auto mb-6 dark:invert" />
                            <h4 className="text-gold-premium font-forum uppercase text-lg mb-3">Fondation Ensemble</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. SECTION LABELS : SORTIE DE L'IMBRICATION ET CENTRÉE */}
            <section
                id="label"
                className="min-h-[60vh] flex items-center justify-center py-24 px-6 bg-white dark:bg-black transition-colors duration-500 border-t border-gold-premium/10"
            >
                <div className="max-w-6xl w-full mx-auto text-center">
                    {/* Header de section centré */}
                    <div className="mb-20">
                        <h2 className="text-gold-premium dark:text-white text-3xl md:text-4xl font-forum uppercase tracking-[8px] mb-6">
                            Nos Certifications & Labels
                        </h2>
                        <div className="w-24 h-px bg-gold-premium mx-auto opacity-40 mb-6"></div>
                        <p className="text-[11px] text-neutral-500 dark:text-gray-400 uppercase tracking-[4px] font-sans leading-relaxed italic">
                            L'exigence au service de l'excellence
                        </p>
                    </div>

                    {/* Grille des labels : Centrée avec mouvement fluide au hover */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 justify-items-center">
                        {[
                            { img: "logo-bio.webp", txt: "Certifié Bio" },
                            { img: "Label-equitable.webp", txt: "Équitable" },
                            { img: "rainforest_alliance_certified_0.webp", txt: "Rainforest Alliance" },
                            { img: "SCA_France_Stone_RGB.webp", txt: "Specialty Coffee" }
                        ].map((label, index) => (
                            <div key={index} className="flex flex-col items-center group cursor-default">
                                {/* Cercle avec animation de soulèvement et d'éclat */}
                                <div className="w-32 h-32 rounded-full bg-white dark:bg-[#121212] flex items-center justify-center
                            border border-gold-premium/10 shadow-sm
                            transition-all duration-500 ease-out
                            group-hover:border-gold-premium/50
                            group-hover:-translate-y-3
                            group-hover:shadow-[0_20px_40px_rgba(197,160,89,0.15)]
                            group-hover:scale-105 mb-6">
                                    <img
                                        loading="lazy"
                                        src={`/images/${label.img}`}
                                        alt={label.txt}
                                        className="w-16 h-16 object-contain dark:invert opacity-70
                               transition-all duration-500
                               group-hover:opacity-100 group-hover:scale-110"
                                    />
                                </div>

                                {/* Texte avec apparition subtile du doré */}
                                <span className="text-[10px] font-bold uppercase tracking-[2px]
                             text-brand-brown dark:text-silver-text
                             transition-colors duration-500
                             group-hover:text-gold-premium text-center max-w-[120px] leading-tight">
                {label.txt}
            </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default APropos;