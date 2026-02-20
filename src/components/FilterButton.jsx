import React from 'react';

const FilterButton = ({ href, children, onClick, active = false }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`
        /* Couleurs et Bordure */
        border border-[#C5A059] 
        ${active ? 'bg-[#C5A059] text-white' : 'bg-transparent text-[#8B6B3F]'}
        
        /* Espacement et Typographie (selon ton image) */
        px-[25px] py-[10px]
        text-[13px] uppercase tracking-[1px]
        
        /* Animation et Curseur */
        transition-all duration-300 ease-in-out
        hover:bg-[#C5A059] hover:text-white
        cursor-pointer
        font-forum /* Utilise ta police Forum si elle est configurée */
      `}
        >
            {children}
        </a>
    );
};

export default FilterButton;