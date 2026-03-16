import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollControls = () => {
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
            const totalScrollable = fullHeight - windowHeight;

            // Calcul du pourcentage de scroll
            const progress = (scrollY / totalScrollable) * 100;
            setScrollProgress(progress);

            // Visibilité des boutons
            setShowTop(scrollY > 300);
            setShowBottom(scrollY + windowHeight < fullHeight - 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    // Calcul du périmètre du cercle pour l'animation SVG (2 * PI * rayon)
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollProgress / 100) * circumference;

    return (
        <div className="fixed bottom-8 right-8 z-100 flex flex-col gap-4">

            {/* Bouton HAUT avec progression circulaire */}
            <div className={`relative transition-all duration-500 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Cercle de progression SVG */}
                <svg
                    aria-label="returner en haut de page"
                    className="absolute top-0 left-0 -rotate-90 w-12 h-12 pointer-events-none" viewBox="0 0 50 50">
                    {/* Rail de fond : Gris très clair en light, Gris très sombre en dark */}
                    <circle
                        cx="25" cy="25" r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-100 dark:text-surface-dark"
                    />
                    {/* Progression : Toujours Gold Premium pour garder l'identité de marque */}
                    <circle
                        cx="25" cy="25" r={radius}
                        fill="transparent"
                        stroke="var(--color-gold-premium)"
                        strokeWidth="2.5"
                        strokeDasharray={circumference}
                        style={{
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 0.1s linear'
                        }}
                        strokeLinecap="round"
                    />
                </svg>

                <button
                    aria-label={`Retour en haut - ${Math.round(scrollProgress)}% parcouru`}

                    onClick={scrollToTop}
                    /* Correction : bg-white en light, bg-surface-dark en dark. Texte Gold en light, Silver en dark */
                    className="p-3 rounded-full bg-white dark:bg-surface-dark text-gold-premium dark:text-silver-shine shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    aria-label={`Retour en haut - ${Math.round(scrollProgress)}% parcouru`}
                >
                    <ChevronUp size={24} strokeWidth={3} />
                </button>
            </div>

            {/* Bouton BAS classique */}
            <button
                aria-label="Aller tout en bas"
                onClick={scrollToBottom}
                /* Correction : bg-gold-premium en light, bg-coffee-dark en dark */
                className={`p-3 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border border-white/10
        bg-gold-premium text-white dark:bg-coffee-dark dark:text-silver-shine
        ${showBottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Aller tout en bas"
            >
                <ChevronDown size={24} strokeWidth={3} />
            </button>
        </div>
    );
};

export default ScrollControls;