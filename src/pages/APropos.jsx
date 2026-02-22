import React from 'react';

const APropos = () => {
    return (
        <main className="bg-white dark:bg-black min-h-screen font-forum transition-colors duration-500">
            {/* 1. SECTION HERO : L'image avec le titre superposé */}
            <div className="relative h-125 w-full overflow-hidden">
                <img
                    src="/images/backround-hero-A-Propos.svg"
                    alt="Plantation de café"
                    className="w-full h-full object-cover"
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h1 style={{
                        color: 'white',
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

            {/* 2. SECTION TEXTE : L'histoire (Fond Brun) */}
            <div className="bg-[#2C2420] text-[#FFFFF0] py-[10vw] px-[15vw]">
                <div className="max-w-250 mx-auto text-center space-y-8">
                    <h2 className="text-gold-premium text-2xl uppercase tracking-widest mb-10">
                        CafThé : L'Artisan des Saveurs d'Ailleurs
                    </h2>

                    <div className="font-sans leading-relaxed space-y-6 text-sm md:text-base opacity-90">
                        <p>
                            Fondé avec la passion des terroirs d'exception, CafThé vous invite à un voyage
                            sensoriel unique à travers la plus belle sélection de cafés de spécialité et de thés rares en Europe.
                            Des hauteurs brumeuses des Blue Mountains jamaïcaines à la finesse cérémonielle du Matcha japonais,
                            nous proposons plus de 40 références exclusives, en grains, moulus ou en feuilles entières.
                        </p>
                        <p>
                            Nous travaillons main dans la main avec un réseau de petits producteurs engagés
                            en Afrique, en Amérique Latine et en Asie, privilégiant des méthodes de culture
                            Chaque grain de café est torréfié avec soin, révélant des arômes authentiques pour sublimer vos moments d'exception,
                            que vous soyez adepte de l'expresso corsé, du café filtre délicat ou de l'infusion apaisante.
                            Retrouvez l'expérience Cafthé sur notre boutique en ligne et découvrez notre sélection d'accessoires de haute précision moulins manuels,
                            presses nomades et théières en verre  pour devenir votre propre barista à la maison.
                            durables et une éthique sociale forte.
                        </p>
                        <p className="italic text-gold-premium">
                            Retrouvez l'expérience CafThé sur notre boutique en ligne et devenez votre propre barista à la maison.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. NOUVELLE SECTION : ENVIRONNEMENT (Contrastes Silver & Black) */}
            <section id="action" className="py-24 px-[10vw] bg-white dark:bg-black transition-colors duration-500">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-gold-premium dark:text-white text-3xl uppercase tracking-[4px]">
                            Notre Engagement Éco-Responsable
                        </h2>
                        <div className="w-24 h-px bg-gold-premium opacity-40"></div>
                        <div className="font-sans text-neutral-700 dark:text-[#D1D5DB] space-y-5 leading-relaxed text-sm md:text-base">
                            <p>
                                La préservation de l'environnement est au cœur de chaque grain que nous torréfions.
                                Nous avons supprimé tout plastique de nos expéditions au profit de packagings
                                100% compostables et recyclables.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold-premium rounded-full shadow-[0_0_8px_rgba(197,160,89,0.6)]"></span>
                                    <span>Torréfaction artisanale à faible émission</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold-premium rounded-full shadow-[0_0_8px_rgba(197,160,89,0.6)]"></span>
                                    <span>Soutien direct aux cultures biologiques d'ombrage</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold-premium rounded-full shadow-[0_0_8px_rgba(197,160,89,0.6)]"></span>
                                    <span>Zéro déchet : recyclage intégral des pellicules de café</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Image avec bordure Silver subtile en Dark Mode */}
                    <div className="flex-1 relative">
                        <div className="rounded-[40px] overflow-hidden border border-gold-premium/10 dark:border-white/10 shadow-2xl">
                            <img
                                src="/images/Cafthé-environnement.webp"
                                alt="Préservation environnement"
                                className="w-full h-112.5 object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. NOUVELLE SECTION : NOS PARTENAIRES (Gris Acier sur Noir) */}
            <section id="partenaire" className="bg-card-bg dark:bg-[#212121] py-24 px-[10vw] transition-colors duration-500">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-gold-premium dark:text-white text-2xl uppercase tracking-[5px] mb-20">
                        Associations Partenaires
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Partenaire 1 */}
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium dark:hover:border-silver-shine transition-all duration-500 shadow-sm hover:shadow-2xl">
                            <div className="h-24 flex items-center justify-center mb-8">
                                <img src="/images/logo-asso-1.svg" alt="Alliance Forêt" className="h-full opacity-60 group-hover:opacity-100 dark:invert transition-all" />
                            </div>
                            <h4 className="text-gold-premium font-forum uppercase text-lg tracking-widest mb-3">Alliance Forêt</h4>
                            <p className="text-xs text-neutral-500 dark:text-[#94A3B8] font-sans">Protection de la canopée en Éthiopie.</p>
                        </div>

                        {/* Partenaire 2 */}
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium dark:hover:border-silver-shine transition-all duration-500 shadow-sm hover:shadow-2xl">
                            <div className="h-24 flex items-center justify-center mb-8">
                                <img src="/images/logo-asso-2.svg" alt="Water.org" className="h-full opacity-60 group-hover:opacity-100 dark:invert transition-all" />
                            </div>
                            <h4 className="text-gold-premium font-forum uppercase text-lg tracking-widest mb-3">Pure Water Pro</h4>
                            <p className="text-xs text-neutral-500 dark:text-[#94A3B8] font-sans">Accès à l'eau potable pour les producteurs ruraux.</p>
                        </div>

                        {/* Partenaire 3 */}
                        <div className="group p-10 rounded-[35px] bg-white dark:bg-black border border-gold-premium/10 hover:border-gold-premium dark:hover:border-silver-shine transition-all duration-500 shadow-sm hover:shadow-2xl">
                            <div className="h-24 flex items-center justify-center mb-8">
                                <img src="/images/logo-asso-3.svg" alt="Terra Ethica" className="h-full opacity-60 group-hover:opacity-100 dark:invert transition-all" />
                            </div>
                            <h4 className="text-gold-premium font-forum uppercase text-lg tracking-widest mb-3">Terra Ethica</h4>
                            <p className="text-xs text-neutral-500 dark:text-[#94A3B8] font-sans">Certification équitable et rémunération juste.</p>
                        </div>
                        {/* SECTION LABELS : Qualité et Éthique */}
                        <section id="label" className="py-20 px-6 bg-card-bg dark:bg-surface-dark transition-colors duration-500 border-y border-silver-shine/50">
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-gold-premium dark:text-white text-3xl font-forum uppercase tracking-[5px] mb-4">
                                        Nos Certifications & Labels
                                    </h2>
                                    <div className="w-24 h-px bg-gold-premium mx-auto opacity-30 mb-6"></div>
                                    <p className="text-[11px] text-neutral-500 dark:text-gray-400 uppercase tracking-widest font-sans leading-relaxed">
                                        L'exigence au service de l'excellence
                                    </p>
                                </div>


                                <div  className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
                                    {/* Item Label */}
                                    {[
                                        { img: "label-bio.svg", txt: "Certifié Bio" },
                                        { img: "label-fairtrade.svg", txt: "Équitable" },
                                        { img: "label-rainforest.svg", txt: "Rainforest Alliance" },
                                        { img: "label-sca.svg", txt: "Specialty Coffee" }
                                    ].map((label, index) => (
                                        <div key={index} className="flex flex-col items-center group">
                                            <div className="w-28 h-28 rounded-full bg-white dark:bg-black flex items-center justify-center border border-gold-premium/10 group-hover:border-gold-premium dark:hover:border-silver-shine transition-all duration-500 mb-6 shadow-sm group-hover:shadow-md">
                                                <img
                                                    src={`/images/${label.img}`}
                                                    alt={label.txt}
                                                    className="w-14 h-14 object-contain dark:invert opacity-80 group-hover:opacity-100 transition-all"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-[2px] text-brand-brown dark:text-white text-center max-w-30 leading-tight">
                        {label.txt}
                    </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default APropos;