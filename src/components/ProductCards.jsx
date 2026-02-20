import React, { useState, useContext } from 'react';
import ButtonGold from './ButtonGold';
import { CardContext } from '../context/CardContext';
import toast from 'react-hot-toast';

const ProductCards = ({ nomProduit, variantes, category }) => {
    const { addProductToCart } = useContext(CardContext);
    const [selectedVariante, setSelectedVariante] = useState(variantes[0]);

    // On définit uniquement la couleur de fond pour le coin
    const categoryColors = {
        café: "bg-[#634832]",
        thé: "bg-[#4A5D23]",
        coffret: "bg-[#7f1d1d]",
        accessoire: "bg-[#F5F5DC]"
    };

    const currentColor = categoryColors[category] || "bg-gold-premium";

    // --- LOGIQUE PRIX SQL ---
    const prixInitial = parseFloat(selectedVariante.prix_ttc || 0);
    const prixFinal = parseFloat(selectedVariante.prix_final || prixInitial);
    const pourcentage = parseFloat(selectedVariante.promo_pourcentage || 0);
    const hasPromo = prixFinal < prixInitial;

    const handleAddToCart = () => {
        addProductToCart({ ...selectedVariante, prix_final: prixFinal });
        toast.success(`${nomProduit} ajouté au panier`);
    };

    return (
        <div className="bg-white rounded-[35px] p-8 shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border border-gray-100">

            {/* LE COIN COLORÉ (Style Ruban) */}
            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-10">
                <div className={`${currentColor} absolute transform -rotate-45 text-center w-[140%] py-1.5 -left-[35%] top-[18%] shadow-sm`}>
                    {/* On peut laisser vide ou mettre un petit texte discret comme "Bio" ou "New" */}
                </div>
            </div>

            {/* BADGE PROMO : Positionné à droite pour ne pas chevaucher le coin */}
            {hasPromo && (
                <div className="absolute top-6 right-6 bg-red-900 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase z-20 shadow-lg ">
                    -{pourcentage}%
                </div>
            )}

            {/* IMAGE PRODUIT */}
            <div className="relative w-full aspect-square overflow-hidden rounded-[25px] mb-6 border border-gray-50 bg-gray-50/30">
                <img
                    src={selectedVariante.image ? `${import.meta.env.VITE_API_URL}/image/${selectedVariante.image}` : "https://placehold.co/300x300"}
                    alt={nomProduit}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* INFOS PRODUIT */}
            <div className="flex-grow flex flex-col">
                <span className="text-gold-premium uppercase tracking-[2px] text-[10px] font-bold mb-2">{category}</span>
                <h3 className="text-xl font-medium mb-1 leading-tight uppercase font-forum text-brand-brown">{nomProduit}</h3>

                {/* SELECTEUR DE VARIANTES (POIDS) */}
                {variantes.length > 1 && (
                    <div className="flex gap-2 my-4 flex-wrap">
                        {variantes.map((v) => (
                            <button
                                key={v.reference_sku}
                                onClick={() => setSelectedVariante(v)}
                                className={`px-3 py-1 text-[10px] rounded-full border transition-all ${
                                    selectedVariante.reference_sku === v.reference_sku
                                        ? "bg-gold-premium border-gold-premium text-white"
                                        : "border-gray-300 text-gray-500 hover:border-gold-premium hover:text-gold-premium"
                                }`}
                            >
                                {v.poids_affichage || v.poids}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* FOOTER : PRIX ET BOUTON */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="font-forum">
                    {hasPromo && (
                        <span className="text-[11px] text-gray-400 line-through block mb-[-4px]">
                            {prixInitial.toFixed(2)}€
                        </span>
                    )}
                    <span className={`text-2xl font-bold ${hasPromo ? 'text-red-600' : 'text-gold-premium'}`}>
                        {prixFinal.toFixed(2)}€
                    </span>
                </div>
                <ButtonGold onClick={handleAddToCart} className="px-5 py-2 text-xs">
                    Ajouter
                </ButtonGold>
            </div>
        </div>
    );
};

export default ProductCards;