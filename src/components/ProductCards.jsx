import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
// Importation depuis ton fichier nommé "CardContext"
import { CardContext } from "../context/CardContext";

const ProductCards = ({ nomProduit, variantes }) => {
    // On extrait la fonction d'action depuis le contexte Card
    const { addProductToCart } = useContext(CardContext);

    const initialIdx = variantes.findIndex(v => v.type_de_vente === 'Unité');
    const [selectedIdx, setSelectedIdx] = useState(initialIdx !== -1 ? initialIdx : 0);
    const [poidsVrac, setPoidsVrac] = useState(250);
    const [isAdded, setIsAdded] = useState(false);

    const actuelle = variantes[selectedIdx];

    const imageUrl = actuelle.image
        ? `${import.meta.env.VITE_API_URL}/image/${actuelle.image}`
        : "https://placehold.co/300x300";

    const prixAffiché = actuelle.type_de_vente === 'Vrac'
        ? ((parseFloat(actuelle.prix_ttc) * poidsVrac) / 1000).toFixed(2)
        : actuelle.prix_ttc;

    // Fonction déclenchée au clic sur le bouton
    const handleAddToCart = () => {
        const productData = {
            id: actuelle.réfèrence_sku,
            nom: nomProduit,
            image: imageUrl,
            type: actuelle.type_de_vente,
            prixUnitaire: actuelle.prix_ttc,
            prixFinal: prixAffiché,
            poids: actuelle.type_de_vente === 'Vrac' ? `${poidsVrac}g` : actuelle.poids,
            quantite: 1
        };

        // Appel de la fonction définie dans ton CardContext
        addProductToCart(productData);

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-[20px] p-6 flex flex-col h-full shadow-sm border border-gray-100 transition-all hover:shadow-md">

            <div className="w-full h-44 flex items-center justify-center mb-4">
                <img
                    src={imageUrl}
                    alt={nomProduit}
                    className="max-h-full max-w-full object-contain transition-transform hover:scale-105 duration-300"
                />
            </div>

            <div className="flex flex-col flex-grow text-center">
                <h3 className="font-forum text-lg text-[#333] uppercase min-h-[50px] flex items-center justify-center leading-tight">
                    {nomProduit}
                </h3>

                <div className="flex gap-2 justify-center my-4">
                    {variantes.map((v, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIdx(idx)}
                            className={`px-3 py-1 text-[10px] rounded-full border transition-all uppercase tracking-widest ${
                                selectedIdx === idx
                                    ? 'bg-[#634832] text-white border-[#634832]'
                                    : 'border-[#634832] text-[#634832] hover:bg-[#63483211]'
                            }`}
                        >
                            {v.type_de_vente}
                        </button>
                    ))}
                </div>

                <div className="min-h-[40px] flex items-center justify-center">
                    {actuelle.type_de_vente === 'Vrac' ? (
                        <select
                            value={poidsVrac}
                            onChange={(e) => setPoidsVrac(Number(e.target.value))}
                            className="text-xs border border-[#C5A059] rounded px-2 py-1 outline-none text-[#8B6B3F] bg-white cursor-pointer"
                        >
                            <option value={100}>100g</option>
                            <option value={250}>250g</option>
                            <option value={500}>500g</option>
                            <option value={1000}>1kg</option>
                        </select>
                    ) : (
                        <span className="text-[#8B6B3F] text-[10px] opacity-60 uppercase">
                            Paquet de {actuelle.poids || "250g"}
                        </span>
                    )}
                </div>

                <p className="text-[#C5A059] font-bold text-2xl mt-auto pt-4">
                    {prixAffiché}€
                </p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2.5 text-[10px] uppercase tracking-[0.2em] rounded transition-all duration-300 font-medium ${
                        isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-[#634832] text-white hover:bg-[#A6844A]'
                    }`}
                >
                    {isAdded ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                </button>

                <Link
                    to={`/produit/${actuelle.réfèrence_sku}`}
                    className="text-[9px] text-gray-400 uppercase tracking-widest no-underline text-center pt-1"
                >
                    Fiche détaillée
                </Link>
            </div>
        </div>
    );
};

export default ProductCards;