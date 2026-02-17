import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionDuMois = () => {
    const navigate = useNavigate();

    const products = [
        { id: 1, type: "Café", name: "Café Moka", origin: "Éthiopie", price: "12.90€", image: "/images/moka.jpg" },
        { id: 2, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/blue-mountain.jpg" },
        { id: 3, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/green-coffee.jpg" },
        { id: 4, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/green-coffee-2.jpg" },
    ];

    return (
        <section className="py-16 px-4 bg-[#FDFCF7] font-forum text-center">
            <div className="mb-12">
                <span className="text-[#C5A059] uppercase tracking-[0.3em] text-sm">Février 2026</span>
                <h2 className="text-4xl text-[#C5A059] my-4 tracking-wider">Sélection du mois</h2>
                <p className="max-w-2xl mx-auto text-[#C5A059] opacity-80 leading-relaxed">
                    Découvrez notre sélection de cafés et thés d'exception...
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center group cursor-pointer">
                        <div className="overflow-hidden rounded-t-2xl w-full aspect-[4/3] mb-4">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <span className="text-[#C5A059] italic text-sm">{product.type}</span>
                        <h3 className="text-xl text-[#8B6B3F] font-medium">{product.name}</h3>
                        <p className="text-[#8B6B3F] mb-1">{product.origin}</p>
                        <span className="text-[#C5A059] font-bold">{product.price}</span>
                    </div>
                ))}
            </div>

            <ButtonGold onClick={() => navigate('/boutique?filter=promotion')} className="bg-[#A6844A] text-white px-10 py-3 rounded-md hover:bg-[#8B6B3F] transition-colors uppercase tracking-widest text-sm">
                Découvrir
            </ButtonGold>
        </section>
    );
};

export default SelectionDuMois;