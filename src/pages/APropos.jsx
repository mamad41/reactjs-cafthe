import React from 'react';

const APropos = () => {
    return (
        <div className="bg-[#FDFCF7] min-h-screen font-forum">
            {/* 1. SECTION HERO : L'image avec le titre superposé */}
            <div className="relative h-[500px] w-full overflow-hidden">
                <img
                    src="/images/backround-hero-A-Propos.svg"
                    alt="Plantation de café"
                    className="w-full h-full object-cover"
                />
                <div style={{
                    position: 'absolute',
                    top: '50%', // Centre verticalement
                    left: '50%', // Centre horizontalement
                    transform: 'translate(-50%, -50%)', // Ajustement parfait au milieu
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '64px', // Taille plus imposante
                        fontFamily: 'Forum, serif',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)', // Ombre pour détacher le texte du fond
                        margin: 0,
                        letterSpacing: '5px',
                        textTransform: 'uppercase'
                    }}>
                        A Propos
                    </h1>
                </div>
            </div>

            {/* 2. SECTION TEXTE : Le cœur de votre histoire */}
            <div className="bg-[#2C2420] text-[#FDFCF7] py-[10vw] px-[15vw]"> {/* vw me permet de forcer le texte au centre */}
                <div className="max-w-[1000px]  mx-auto text-center space-y-8">
                    <h2 className="text-[#C5A059] text-2xl uppercase tracking-widest mb-10">
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
                        <p className="italic text-[#C5A059]">
                            Retrouvez l'expérience CafThé sur notre boutique en ligne et devenez votre propre barista à la maison.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APropos;