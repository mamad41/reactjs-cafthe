import React from 'react';

// CORRECTION: On ajoute "disabled" dans les props pour pouvoir le passer au bouton.
const ButtonGold = ({ children, onClick, className = "", style = {}, type = "button", disabled = false }) => {
    return (
        <button
            aria-label={children}
            type={type}
            onClick={onClick}
            style={style}
            // CORRECTION: On passe la prop "disabled" au bouton HTML.
            // On ajoute aussi des classes CSS pour un style visuel désactivé.
            disabled={disabled}
            className={`bg-gold-premium px-4 py-2 dark:bg-silver-shine text-white rounded-[5px] uppercase tracking-[2px] text-[13px] font-forum 
            hover:bg-[var(--color-hover-btn)] transition-all duration-300 cursor-pointer border-none 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
            ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonGold;
