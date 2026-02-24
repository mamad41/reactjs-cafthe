import React from 'react';

// On ajoute "className" dans les arguments pour recevoir tes styles spécifiques
const ButtonGold = ({ children, onClick, className = "",style={} ,type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={`bg-gold-premium px-4 py-2 dark:bg-silver-shine text-white rounded-[5px] uppercase tracking-[2px] text-[13px] font-forum 
            hover:bg-[#634832] transition-all duration-300 cursor-pointer border-none ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonGold;