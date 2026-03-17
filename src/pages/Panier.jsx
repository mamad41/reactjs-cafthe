// Importation des hooks React et des composants nécessaires.
import React, { useContext, useState } from 'react';
import ButtonGold from "../components/ButtonGold.jsx";
// Importation des contextes pour le panier et l'authentification.
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';
// Importation des outils de navigation et de notification.
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

/**
 * Composant de la page Panier.
 * Affiche les articles ajoutés, permet de modifier les quantités,
 * d'appliquer un code promo et de procéder au paiement.
 */
const Panier = () => {
    // Récupération des données et fonctions depuis le contexte du panier.
    const {
        cartItems,
        totalAmount,
        removeProductFromCart,
        addProductToCart,
        decreaseQuantity
    } = useContext(CardContext);

    // Récupération de l'utilisateur depuis le contexte d'authentification.
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- États pour la gestion du code promo ---
    const [promoInput, setPromoInput] = useState("");
    const [isApplied, setIsApplied] = useState(false);

    /**
     * Applique le code promo si celui-ci est valide.
     */
    const applyPromo = () => {
        if (promoInput.toUpperCase() === "BIENVENUE10") {
            setIsApplied(true);
            toast.success("Code promo appliqué ! -10%");
        } else {
            toast.error("Code promo invalide");
        }
    };

    // Mappage des catégories à des styles de bordure pour une différenciation visuelle.
    const categoryBorders = {
        café: "border-l-6 border-[#634832]",
        thé: "border-l-6 border-[#4A5D23]",
        coffret: "border-l-6 border-[#7f1d1d]",
        accessoire: "border-l-6 border-[#F5F5DC]"
    };

    // Calcul du total des économies réalisées sur les produits en promotion.
    const totalEconomise = cartItems.reduce((acc, item) => {
        const pInitial = Number(item.prix_ttc || 0);
        const pFinal = Number(item.prix_final || pInitial);
        return pFinal < pInitial ? acc + (pInitial - pFinal) * item.quantite : acc;
    }, 0);

    // --- Calcul du total final après application du code promo ---
    const remiseBienvenue = isApplied ? (totalAmount * 0.10) : 0;
    const totalFinal = totalAmount - remiseBienvenue;

    /**
     * Redirige l'utilisateur vers la page de paiement.
     * Si l'utilisateur n'est pas connecté, il est d'abord redirigé vers la page de connexion.
     */
    const handleCheckout = () => {
        if (user) {
            navigate('/checkout');
        } else {
            // On ajoute un paramètre `redirect` pour revenir au checkout après la connexion.
            navigate('/login?redirect=checkout');
        }
    };

    return (
        <>
            <SEO
                title="Votre Panier de Dégustation"
                description="Finalisez votre sélection de crus d'exception. Vérifiez vos articles, appliquez votre code promo BIENVENUE10 et passez commande en toute sécurité."
            />
            <main className="bg-input-bg min-h-screen py-16 px-4 sm:px-10 font-forum selection:bg-gold-premium/30">
                <header className="mb-20 text-center flex flex-col items-center">
                    <h1 className="text-gold-premium text-4xl md:text-5xl uppercase tracking-widest mb-4">
                        Votre Sélection
                    </h1>
                    <div className="h-px w-24 bg-gold-premium"></div>
                </header>

                <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Colonne principale : liste des articles du panier */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Affichage conditionnel : message si le panier est vide, sinon liste des articles */}
                        {!cartItems || cartItems.length === 0 ? (
                            <div className="bg-white rounded-4xl p-20 text-center shadow-xs border border-gray-100">
                                <p className="text-gray-400 mb-10 text-xl italic font-light">Votre panier est vide.</p>
                                <Link to="/boutique" className="inline-block bg-brown-bg text-white px-10 py-4 rounded-full uppercase tracking-widest font-bold hover:bg-gold-premium transition-colors shadow-lg" aria-label="Retourner à la boutique pour ajouter des articles">
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

                                        <div className="grow text-center md:text-left">
                                            <h3 className="text-brand-brown text-xl font-medium uppercase tracking-tight mb-1">{pName}</h3>
                                            <p className="text-black text-xs tracking-widest uppercase opacity-80 mb-4">
                                                {item.categorie} — {pWeight}
                                            </p>

                                            {/* Contrôles pour ajuster la quantité */}
                                            <div className="flex items-center justify-center md:justify-start gap-6">
                                                <div className="flex items-center bg-gray-50 rounded-full px-2 border border-gray-100">
                                                    <button
                                                        onClick={() => decreaseQuantity(pId, pWeight)}
                                                        className="w-8 h-8 text-black  hover:text-brand-brown text-xl font-light"
                                                        aria-label={`Diminuer la quantité de ${pName}`}
                                                    >-</button>
                                                    <div id="qpl" className="w-8 text-center dark:text-black font-sans text-sm font-bold" aria-label={`Quantité actuelle: ${item.quantite}`}>{item.quantite}</div>
                                                    <button
                                                        onClick={() => addProductToCart(item)}
                                                        className="w-8 h-8 text-black  hover:text-brand-brown text-xl "
                                                        aria-label={`Augmenter la quantité de ${pName}`}
                                                    >+</button>
                                                </div>
                                                <button
                                                    onClick={() => removeProductFromCart(pId, pWeight)}
                                                    className="text-[10px] uppercase tracking-tighter text-gray-300 hover:text-red-500 transition-colors font-bold"
                                                    aria-label={`Supprimer ${pName} du panier`}
                                                >Supprimer</button>
                                            </div>
                                        </div>

                                        {/* Affichage du prix */}
                                        <div className="text-center md:text-right min-w-25">
                                            {hasPromo && (
                                                <div className="text-gray-300 text-sm line-through font-sans italic" aria-label={`Prix original: ${(pInitial * item.quantite).toFixed(2)} euros`}>
                                                    {(pInitial * item.quantite).toFixed(2)}€
                                                </div>
                                            )}
                                            <div className={`text-2xl font-bold ${hasPromo ? 'text-red-600' : 'text-black dark:text-silver-shine'}`} aria-label={`Prix final: ${(pFinal * item.quantite).toFixed(2)} euros`}>
                                                {(pFinal * item.quantite).toFixed(2)}€
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Colonne latérale : résumé de la commande */}
                    <aside className="lg:col-span-1">
                        <div id="Card" className="bg-white rounded-4xl p-10 shadow-xl border border-gray-50 sticky top-10">
                            <h2 className="text-brand-brown text-2xl uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Résumé</h2>
                            <div className="space-y-5 font-sans">
                                <div className="flex justify-between text-gray-400 text-sm uppercase">
                                    <span>Sous-total</span>
                                    <span>{(Number(totalAmount) + totalEconomise).toFixed(2)}€</span>
                                </div>
                                {/* Affichage des remises si elles existent */}
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

                                {/* Champ pour le code promo */}
                                <div className="mb-8">
                                    <label htmlFor="promo-code" className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block ml-1">Code privilège</label>
                                    <div className="flex gap-2">
                                        <input
                                            id="promo-code"
                                            type="text"
                                            placeholder="Votre code"
                                            value={promoInput}
                                            onChange={(e) => setPromoInput(e.target.value)}
                                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none focus:border-gold-premium font-sans"
                                            pattern="^[a-zA-Z0-9]{5,15}$"
                                            title="Le code promo doit contenir entre 5 et 15 caractères alphanumériques"
                                        />
                                        <button
                                            onClick={applyPromo}
                                            className="bg-brand-brown text-white px-4 py-2 rounded-xl text-[10px] uppercase font-bold hover:bg-gold-premium transition-colors"
                                            aria-label="Appliquer le code promo"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between text-brand-brown text-2xl font-bold">
                                    <span>Total TTC</span>
                                    <span aria-label={`Total de la commande: ${totalFinal.toFixed(2)} euros`}>{totalFinal.toFixed(2)}€</span>
                                </div>
                            </div>

                            <ButtonGold 
                                onClick={handleCheckout} 
                                className="w-full mt-10 py-5 text-lg shadow-lg"
                                aria-label="Procéder au paiement de la commande"
                            >
                                Passer la commande
                            </ButtonGold>

                            <p className="mt-8 text-[9px] text-gray-300 text-center uppercase tracking-widest opacity-70" aria-label="Paiement sécurisé par protocole SSL">
                                🔒 Paiement sécurisé SSL
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
};

export default Panier;