import React, { useContext, useState } from 'react'; // Ajout de useState ici
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

    // --- ÉTATS POUR LE CODE PROMO (Placés correctement au début) ---
    const [promoInput, setPromoInput] = useState("");
    const [isApplied, setIsApplied] = useState(false);

    const applyPromo = () => {
        if (promoInput.toUpperCase() === "BIENVENUE10") {
            setIsApplied(true);
            toast.success("Code promo appliqué ! -10%");
        } else {
            toast.error("Code promo invalide");
        }
    };

    const categoryBorders = {
        café: "border-l-6 border-[#634832]",
        thé: "border-l-6 border-[#4A5D23]",
        coffret: "border-l-6 border-[#7f1d1d]",
        accessoire: "border-l-6 border-[#F5F5DC]"
    };

    // Calcul des économies déjà présentes sur les fiches produits
    const totalEconomise = cartItems.reduce((acc, item) => {
        const pInitial = Number(item.prix_ttc || 0);
        const pFinal = Number(item.prix_final || pInitial);
        return pFinal < pInitial ? acc + (pInitial - pFinal) * item.quantite : acc;
    }, 0);

    // --- CALCUL DU TOTAL FINAL AVEC CODE PROMO ---
    const remiseBienvenue = isApplied ? (totalAmount * 0.10) : 0;
    const totalFinal = totalAmount - remiseBienvenue;

    const handleCheckout = () => {
        if (user) navigate('/checkout');
        else navigate('/login?redirect=checkout');
    };

    return (
        <main className="bg-input-bg min-h-screen py-16 px-4 sm:px-10 font-forum selection:bg-gold-premium/30">
            <header className="mb-20 text-center flex flex-col items-center">
                <h1 className="text-gold-premium text-4xl md:text-5xl uppercase tracking-widest mb-4">
                    Votre Sélection
                </h1>
                <div className="h-px w-24 bg-gold-premium"></div>
            </header>

            <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {!cartItems || cartItems.length === 0 ? (
                        <div className="bg-white rounded-4xl p-20 text-center shadow-xs border border-gray-100">
                            <p className="text-gray-400 mb-10 text-xl italic font-light">Votre panier est vide.</p>
                            <Link to="/boutique" className="inline-block bg-brown-bg text-white px-10 py-4 rounded-full uppercase tracking-widest font-bold hover:bg-gold-premium transition-colors shadow-lg">
                                Explorer la boutique
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const pId = item.reference_sku;
                            const pWeight = item.poids_affichage || item.poids;
                            const pName = item.nom_produit;
                            const pInitial = Number(item.prix_ttc || 0);
                            const pFinal = Number(item.prix_final || pInitial);

                            const hasPromo = pFinal < pInitial;
                            const borderStyle = categoryBorders[item.categorie?.toLowerCase()] || "border-l-6 border-gray-100";

                            return (
                                <div id="Card" key={`${pId}-${pWeight}`}
                                     className={`bg-white rounded-3xl p-6 shadow-xs border border-gray-50 flex flex-col md:flex-row items-center gap-8 ${borderStyle} transition-all`}>

                                    <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL}/image/${item.image}`}
                                            alt={pName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-brand-brown text-xl font-medium uppercase tracking-tight mb-1">{pName}</h3>
                                        <p className="text-gold-premium text-xs tracking-widest uppercase opacity-80 mb-4">
                                            {item.categorie} — {pWeight}
                                        </p>

                                        <div className="flex items-center justify-center md:justify-start gap-6">
                                            <div className="flex items-center bg-gray-50 rounded-full px-2 border border-gray-100">
                                                <button
                                                    onClick={() => {
                                                        toast.error("-1 article", { id: "dec" });
                                                        decreaseQuantity(pId, pWeight);
                                                    }}
                                                    className="w-8 h-8 text-gray-400 hover:text-brand-brown text-xl font-light"
                                                >-</button>
                                                <span id="qpl" className="w-8 text-center font-sans text-sm font-bold">{item.quantite}</span>
                                                <button
                                                    onClick={() => addProductToCart(item)}
                                                    className="w-8 h-8 text-black hover:text-brand-brown text-xl "
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => removeProductFromCart(pId, pWeight)}
                                                className="text-[10px] uppercase tracking-tighter text-gray-300 hover:text-red-500 transition-colors font-bold"
                                            >Supprimer</button>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right min-w-25">
                                        {hasPromo && (
                                            <div className="text-gray-300 text-sm line-through font-sans italic">
                                                {(pInitial * item.quantite).toFixed(2)}€
                                            </div>
                                        )}
                                        <div className={`text-2xl font-bold ${hasPromo ? 'text-red-600' : 'text-gold-premium'}`}>
                                            {(pFinal * item.quantite).toFixed(2)}€
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sidebar Résumé */}
                <aside className="lg:col-span-1">
                    <div id="Card" className="bg-white rounded-4xl p-10 shadow-xl border border-gray-50 sticky top-10">
                        <h2 className="text-brand-brown text-2xl uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Résumé</h2>
                        <div className="space-y-5 font-sans">
                            <div className="flex justify-between text-gray-400 text-sm uppercase">
                                <span>Sous-total</span>
                                <span>{(Number(totalAmount) + totalEconomise).toFixed(2)}€</span>
                            </div>
                            {(totalEconomise > 0 || isApplied) && (
                                <div className="space-y-2">
                                    {totalEconomise > 0 && (
                                        <div className="flex justify-between text-red-600 font-bold text-sm uppercase italic">
                                            <span>Remises produits</span>
                                            <span>-{totalEconomise.toFixed(2)}€</span>
                                        </div>
                                    )}
                                    {isApplied && (
                                        <div className="flex justify-between text-green-600 font-bold text-sm uppercase italic">
                                            <span>Offre Bienvenue (-10%)</span>
                                            <span>-{remiseBienvenue.toFixed(2)}€</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="flex justify-between text-gray-400 text-sm uppercase">
                                <span>Livraison</span>
                                <span className="text-green-600 font-bold">Offerte</span>
                            </div>

                            <div className="h-px bg-gray-100 my-6"></div>

                            {/* --- CHAMP CODE PROMO --- */}
                            <div className="mb-8">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block ml-1">Code privilège</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Votre code"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none focus:border-gold-premium font-sans"
                                    />
                                    <button
                                        onClick={applyPromo}
                                        className="bg-brand-brown text-white px-4 py-2 rounded-xl text-[10px] uppercase font-bold hover:bg-gold-premium transition-colors"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between text-brand-brown text-2xl font-bold">
                                <span>Total TTC</span>
                                <span>{totalFinal.toFixed(2)}€</span>
                            </div>
                        </div>

                        <ButtonGold onClick={handleCheckout} className="w-full mt-10 py-5 text-lg shadow-lg">
                            Passer la commande
                        </ButtonGold>

                        <p className="mt-8 text-[9px] text-gray-300 text-center uppercase tracking-widest opacity-70">
                            🔒 Paiement sécurisé SSL
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Panier;