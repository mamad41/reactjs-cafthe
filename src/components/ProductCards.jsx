import React, { useState, useContext, useMemo, useEffect } from 'react';
import ButtonGold from './ButtonGold';
import { CardContext } from '../context/CardContext';
import toast from 'react-hot-toast';
// 1. On importe Link de react-router-dom
import { Link } from 'react-router-dom';

const ProductCards = ({ nomProduit, variantes, category }) => {
    const { addProductToCart } = useContext(CardContext);

    const typesVente = useMemo(() => {
        return [...new Set(variantes.map(v => v?.type_de_vente?.trim()))].filter(Boolean);
    }, [variantes]);

    const [selectedType, setSelectedType] = useState("");
    const [selectedVariante, setSelectedVariante] = useState(variantes[0] || {});

    useEffect(() => {
        if (typesVente.length > 0 && !selectedType) setSelectedType(typesVente[0]);
    }, [typesVente, selectedType]);

    const poidsDisponibles = useMemo(() => {
        return variantes.filter(v => v?.type_de_vente?.trim() === selectedType);
    }, [selectedType, variantes]);

    const handleTypeChange = (type) => {
        setSelectedType(type);
        const matching = variantes.find(v => v?.type_de_vente?.trim() === type);
        if (matching) setSelectedVariante(matching);
    };

    const categoryColors = {
        café: "bg-[#634832]",
        thé: "bg-[#4A5D23]",
        coffret: "bg-[#7f1d1d]",
        accessoire: "bg-[#F5F5DC]"
    };

    const currentColor = categoryColors[category?.toLowerCase()] || "bg-gold-premium";

    const prixInitial = parseFloat(selectedVariante?.prix_ttc || 0);
    const prixFinal = parseFloat(selectedVariante?.prix_final || prixInitial);
    const pourcentage = parseFloat(selectedVariante?.promo_pourcentage || 0);
    const hasPromo = prixFinal < prixInitial;

    const handleAddToCart = () => {
        if (!selectedVariante?.reference_sku) {
            toast.error("Sélection invalide");
            return;
        }
        addProductToCart({ ...selectedVariante, nomProduit, prix_final: prixFinal });
        toast.success(`${nomProduit} ajouté au panier`);
    };

    return (
        <div id="Card" className="bg-white rounded-[35px] p-8 shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border border-gray-100">

            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-10" aria-hidden="true">
                <div className={`${currentColor} absolute transform -rotate-45 text-center w-[140%] py-1.5 -left-[35%] top-[18%] shadow-sm`}>
                </div>
            </div>

            {hasPromo && (
                <div className="absolute top-6 right-6 bg-red-900 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase z-20 shadow-lg " aria-label={`Promotion de ${pourcentage}%`}>
                    -{pourcentage}%
                </div>
            )}

            {/* 2. ON ENVELOPPE L'IMAGE ET LE TITRE DANS UN LINK */}
            {/* On cible la variante sélectionnée pour que le lien corresponde à la sélection */}
            <Link
                to={`/produit/${selectedVariante?.reference_sku}`}
                className="group block"
                aria-label={`Voir les détails de ${nomProduit}`}
            >
                {/* Image Produit */}
                <div className="relative w-full aspect-square overflow-hidden rounded-[25px] mb-6 border border-gray-50 bg-gray-50/30">
                    <img
                        src={selectedVariante?.image ? `${import.meta.env.VITE_API_URL}/image/${selectedVariante.image}` : "https://placehold.co/300x300"}
                        loading="lazy"
                        alt={nomProduit || "Image du produit"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="grow flex flex-col">
                    <span className="text-gold-premium uppercase tracking-[2px] text-[10px] font-bold mb-2">{category}</span>
                    <h3 className="text-xl font-medium mb-1 leading-tight uppercase font-forum text-brand-brown group-hover:text-gold-premium transition-colors">
                        {nomProduit}
                    </h3>
                </div>
            </Link>

            {/* LE RESTE RESTE EN DEHORS DU LINK POUR ÊTRE INTERACTIF */}
            <div>
                {typesVente.length > 1 && (
                    <div className="flex gap-2 my-4" role="group" aria-label="Choisir le type de vente">
                        {typesVente.map((type) => (
                            <button
                                aria-pressed={selectedType === type}
                                key={type}
                                onClick={() => handleTypeChange(type)}
                                className={`flex-1 py-2 text-[10px] rounded-xl border transition-all font-bold uppercase ${
                                    selectedType === type
                                        ? "bg-gold-premium text-white border-gold-premium hover:text-gray-400 hover:bg-hover-btn"
                                        : "border-gray-200 text-gray-500 hover:text-white hover:bg-gold-premium"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                )}

                <div className="min-h-10 transition-all duration-300">
                    {selectedType?.toLowerCase() === "vrac" && poidsDisponibles.length > 0 ? (
                        <div className="relative">
                            <label htmlFor={`select-poids-${selectedVariante?.reference_sku}`} className="sr-only">Choisir le poids</label>
                            <select
                                id={`select-poids-${selectedVariante?.reference_sku}`}
                                value={selectedVariante?.reference_sku || ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const match = variantes.find(v => String(v.reference_sku) === String(val));
                                    if (match) setSelectedVariante(match);
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[11px] font-bold text-gray-700 outline-none appearance-none cursor-pointer"
                            >
                                {poidsDisponibles.map((v) => (
                                    <option key={v.reference_sku} value={v.reference_sku}>
                                        Poids : {v.poids_affichage || v.poids}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]" aria-hidden="true">▼</div>
                        </div>
                    ) : (
                        selectedType?.toLowerCase() === "unité" && (
                            <div className="py-2 text-center border border-dashed border-gray-100 rounded-lg">
                                <span className="text-[10px] text-gray-400 uppercase italic font-medium"></span>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="font-forum">
                    {hasPromo && (
                        <span className="text-[11px] text-gray-400 line-through block mb-[-4px]" aria-label={`Prix d'origine: ${prixInitial.toFixed(2)} euros`}>
                            {prixInitial.toFixed(2)}€
                        </span>
                    )}
                    <span className={`text-2xl font-bold ${hasPromo ? 'text-red-600' : 'text-gold-premium'}`} aria-label={`Prix: ${prixFinal.toFixed(2)} euros`}>
                        {prixFinal.toFixed(2)}€
                    </span>
                </div>
                <ButtonGold
                    aria-label={`Ajouter ${nomProduit} au panier`}
                    onClick={handleAddToCart} className="px-5 py-2 text-xs">
                    Ajouter
                </ButtonGold>
            </div>
        </div>
    );
};

export default ProductCards;