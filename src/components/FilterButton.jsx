import React from 'react';

const FilterButton = ({ href, children, onClick, active = false }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`
        border border-gold-premium dark:border-silver-shine
        ${active ? 'bg-gold-premium  text-white ' : 'bg-transparent text-[#8B6B3F] dark:text-silver-shine'}
        
        /* Espacement et Typographie (selon ton image) */
        px-6.25 py-2.5
        text-[13px] uppercase tracking-[1px]
        
        /* Animation et Curseur */
        transition-all duration-300 ease-in-out
        hover:bg-gold-premium dark:hover:bg-silver-shine hover:text-white dark:hover:text-black
        cursor-pointer
        font-forum /* Utilise ta police Forum si elle est configurée */
      `}
        >
            {children}
        </a>
    );
};

export default FilterButton;