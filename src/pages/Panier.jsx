import React, { useContext } from 'react';
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Panier = () => {
    // Extraction des données du panier et de l'utilisateur
    const { cartItems, totalAmount, removeProductFromCart, addProductToCart } = useContext(CardContext);
    const { user } = useContext(AuthContext); // On récupère l'état de connexion
    const navigate = useNavigate();

    // Fonction pour valider et passer à la suite
    const handleCheckout = () => {
        if (user) {
            // Si connecté, direction la livraison/paiement
            navigate('/checkout');
        } else {
            // Si non connecté, direction connexion avec redirection après succès
            navigate('/login?redirect=checkout');
        }
    };

    return (
        <div className="bg-[#FDFCF7] min-h-screen py-16 px-4 sm:px-10 font-forum">

            {/* HEADER : Centrage forcé et espacement */}
            <header className="w-full mb-24 text-center flex flex-col items-center">
                <h1 className="text-[#C5A059] text-3xl md:text-5xl uppercase tracking-[0.2em] mb-6 w-full">
                    Votre Sélection
                </h1>
                <div className="h-[1px] w-32 bg-[#C5A059] mx-auto block"></div>
            </header>

            {/* GRILLE PRINCIPALE */}
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* PARTIE GAUCHE : LISTE DES PRODUITS */}
                <div className="lg:col-span-2 space-y-6">
                    {!cartItems || cartItems.length === 0 ? (
                        <div className="bg-white rounded-[30px] p-20 text-center shadow-sm border border-gray-100">
                            <p className="text-gray-400 font-sans tracking-wide mb-10 text-lg">
                                Votre panier est actuellement vide.
                            </p>
                            <div className="flex justify-center">
                                <Link
                                    to="/boutique"
                                    style={{
                                        backgroundColor: '#634832',
                                        color: 'white',
                                        padding: '20px 50px',
                                        fontSize: '15px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        borderRadius: '9999px',
                                        fontWeight: 'bold'
                                    }}
                                    className="uppercase tracking-[0.2em] hover:bg-[#A6844A] transition-all shadow-md"
                                >
                                    Explorer la boutique
                                </Link>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-[25px] p-6 shadow-sm border border-gray-50 flex flex-col md:flex-row items-center gap-6 transition-hover hover:shadow-md">
                                {/* Image produit */}
                                <div className="w-32 h-32 bg-[#F9F9F9] rounded-2xl p-4 flex-shrink-0">
                                    <img src={item.image} alt={item.nom} className="w-full h-full object-contain" />
                                </div>

                                {/* Détail produit */}
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-[#333] text-xl uppercase mb-1 tracking-tight">{item.nom}</h3>
                                    <p className="text-[#8B6B3F] text-xs font-sans opacity-70 mb-4 uppercase tracking-widest">
                                        {item.type} — {item.poids}
                                    </p>

                                    {/* Contrôles de quantité */}
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => {/* Logique de décrémentation à ajouter ici */}}
                                                className="text-gray-400 hover:text-[#634832] px-2 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="font-sans text-sm w-8 text-center">{item.quantite}</span>
                                            <button
                                                onClick={() => addProductToCart(item)}
                                                className="text-gray-400 hover:text-[#634832] px-2 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeProductFromCart(item.id, item.poids)}
                                            className="text-gray-300 hover:text-red-400 text-[10px] uppercase tracking-widest transition-colors ml-4"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>

                                {/* Prix de la ligne */}
                                <div className="text-[#C5A059] text-2xl font-bold pr-4">
                                    {(parseFloat(item.prixFinal) * item.quantite).toFixed(2)}€
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* PARTIE DROITE : RÉSUMÉ FIXE */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100 sticky top-10">
                        <h2 className="text-[#8B6B3F] text-xl uppercase tracking-widest mb-8 border-b pb-4">Résumé</h2>

                        <div className="space-y-4 font-sans text-sm">
                            <div className="flex justify-between text-gray-500 uppercase tracking-tighter">
                                <span>Sous-total</span>
                                <span>{totalAmount}€</span>
                            </div>
                            <div className="flex justify-between text-gray-500 uppercase tracking-tighter">
                                <span>Livraison</span>
                                <span className="text-green-600 font-bold tracking-widest">Offerte</span>
                            </div>
                            <div className="h-px bg-gray-100 my-6"></div>
                            <div className="flex justify-between text-[#333] text-xl font-bold">
                                <span className="uppercase tracking-tighter">Total</span>
                                <span>{totalAmount}€</span>
                            </div>
                        </div>

                        {/* Bouton de validation : appelle handleCheckout pour vérifier l'Auth */}
                        <div className="mt-10 flex justify-center w-full">
                            <button
                                onClick={handleCheckout}
                                style={{
                                    backgroundColor: '#634832',
                                    color: 'white',
                                    padding: '20px 20px',
                                    fontSize: '18px',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    width: '100%',
                                    maxWidth: '350px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}
                                className="uppercase tracking-[0.2em] hover:bg-[#A6844A] transition-all duration-300 shadow-xl"
                            >
                                Passer à la commande
                            </button>
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

export default Panier;0