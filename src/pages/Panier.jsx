import React, { useContext } from 'react';
import ButtonGold from "../components/ButtonGold.jsx";
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Panier = () => {
    const {
        cartItems,
        totalAmount,
        removeProductFromCart,
        addProductToCart,
        decreaseQuantity
    } = useContext(CardContext);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalEconomise = cartItems.reduce((acc, item) => {
        const prixTtc = parseFloat(item.prixOriginal);
        const prixFinal = parseFloat(item.prixUnitaire);
        if (prixFinal < prixTtc) {
            return acc + (prixTtc - prixFinal) * item.quantite;
        }
        return acc;
    }, 0).toFixed(2);

    const handleCheckout = () => {
        if (user) {
            navigate('/checkout');
        } else {
            navigate('/login?redirect=checkout');
        }
    };

    return (
        <div className="bg-[#FDFCF7] min-h-screen py-16 px-4 sm:px-10 font-forum">
            <header className="w-full mb-24 text-center flex flex-col items-center">
                <h1 className="text-[#C5A059] text-3xl md:text-5xl uppercase tracking-[0.2em] mb-6 w-full">
                    Votre Sélection
                </h1>
                <div className="h-[1px] w-32 bg-[#C5A059] mx-auto block"></div>
            </header>

            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {!cartItems || cartItems.length === 0 ? (
                        <div className="bg-white rounded-[30px] p-20 text-center shadow-sm border border-gray-100">
                            <p className="text-gray-400 font-sans tracking-wide mb-10 text-lg">
                                Votre panier est actuellement vide.
                            </p>
                            <div className="flex justify-center">
                                <Link to="/boutique" className="bg-[#634832] text-white px-12 py-5 rounded-full uppercase tracking-[0.2em] font-bold hover:bg-[#A6844A] transition-all shadow-md no-underline">
                                    Explorer la boutique
                                </Link>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const hasPromo = parseFloat(item.prixUnitaire) < parseFloat(item.prixOriginal);
                            const uniqueKey = `${item.id}-${item.poids}`;

                            return (
                                <div key={uniqueKey} className="bg-white rounded-[25px] p-6 shadow-sm border border-gray-50 flex flex-col md:flex-row items-center gap-6">
                                    {/* Image Container */}
                                    <div className="w-32 h-32 bg-[#F9F9F9] rounded-2xl p-4 m-40 flex-shrink-0 flex items-center justify-center">
                                        <img src={item.image} alt={item.nom} className="max-w-full max-h-full object-contain" />
                                    </div>

                                    {/* Info Content */}
                                    <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left min-w-0 ">
                                        <h3 className="text-[#333] text-xl uppercase mb-1 tracking-tight truncate w-full">
                                            {item.nom}
                                        </h3>
                                        <p className="text-[#8B6B3F] text-xs font-sans opacity-70 mb-4 uppercase tracking-widest">
                                            {item.type} — {item.poids}
                                        </p>
                                    </div>
                                        {/* Actions: Quantité et Supprimer */}
                                        <div className="flex flex-wrap items-center justify-center md:justify-start w-full">
                                            <div className="flex items-center  rounded-full px-1 py-1 bg-white shadow-sm gap-4">
                                                <ButtonGold
                                                    onClick={() => {
                                                        toast.error("1 produit supprimé", { id: "decrement" });
                                                        decreaseQuantity(item.id, item.poids);
                                                    }}
                                                    /* Réduction du padding (px-2 py-0) et de la taille du texte (text-base) */
                                                    className="text-gray-400 hover:text-[#634832] px-2 py-0 text-lg font-medium transition-colors leading-none"
                                                >
                                                    -
                                                </ButtonGold>

                                                <span className="font-sans text-sm w-10 text-center select-none text-gray-700"> {item.quantite}   </span>

                                                <ButtonGold
                                                    onClick={() => addProductToCart(item)}
                                                    /* Réduction identique ici */
                                                    className="text-gray-400 hover:text-[#634832] px-2 py-0 text-lg font-medium transition-colors leading-none"
                                                >
                                                    +
                                                </ButtonGold>
                                            </div>

                                            <ButtonGold
                                                onClick={() => {
                                                    toast.error("Article supprimé", { icon: '🗑️' });
                                                    removeProductFromCart(item.id, item.poids);
                                                }}
                                                className="text-gray-400 hover:text-red-500 text-[10px] uppercase tracking-widest transition-colors font-semibold"
                                            >
                                                Supprimer
                                            </ButtonGold>
                                        </div>


                                    {/* Price Side */}
                                    <div className="text-center md:text-right md:pr-4 flex-shrink-0">
                                        {hasPromo && (
                                            <div className="text-gray-400 text-sm line-through font-sans">
                                                {(parseFloat(item.prixOriginal) * item.quantite).toFixed(2)}€
                                            </div>
                                        )}
                                        <div className={`text-2xl font-bold ${hasPromo ? 'text-red-600' : 'text-[#C5A059]'}`}>
                                            {(parseFloat(item.prixUnitaire) * item.quantite).toFixed(2)}€
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sidebar Résumé */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100 sticky top-10">
                        <h2 className="text-[#8B6B3F] text-xl uppercase tracking-widest mb-8 border-b pb-4">Résumé</h2>
                        <div className="space-y-4 font-sans text-sm">
                            <div className="flex justify-between text-gray-500 uppercase tracking-tighter">
                                <span>Sous-total</span>
                                <span>{(parseFloat(totalAmount) + parseFloat(totalEconomise)).toFixed(2)}€</span>
                            </div>
                            {parseFloat(totalEconomise) > 0 && (
                                <div className="flex justify-between text-red-600 font-bold uppercase tracking-tighter animate-pulse">
                                    <span>Économies réalisées</span>
                                    <span>-{totalEconomise}€</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-500 uppercase tracking-tighter">
                                <span>Livraison</span>
                                <span className="text-green-600 font-bold tracking-widest">Offerte</span>
                            </div>
                            <div className="h-px bg-gray-100 my-6"></div>
                            <div className="flex justify-between text-[#333] text-xl font-bold">
                                <span className="uppercase tracking-tighter">Total TTC</span>
                                <span>{totalAmount}€</span>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-center w-full">
                            <buttonGold
                                onClick={handleCheckout}
                                className="w-full bg-[#634832] text-white py-5 rounded-full text-lg font-bold uppercase tracking-[0.2em] hover:bg-[#A6844A] transition-all duration-300 shadow-xl"
                            >
                                Passer à la commande
                            </buttonGold>
                        </div>
                        <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest opacity-60">
                            Paiement 100% sécurisé
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panier;