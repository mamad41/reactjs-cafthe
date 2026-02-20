import React, { useState, useContext } from 'react';
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';
import ButtonGold from "../components/ButtonGold.jsx";

const Checkout = () => {
    const { cartItems, totalAmount } = useContext(CardContext);
    const { user } = useContext(AuthContext);

    const [shippingData, setShippingData] = useState({
        adresse: '',
        ville: '',
        codePostal: '',
        telephone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Vous devez être connecté pour commander.");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    cartItems: cartItems,
                    totalAmount: totalAmount,
                    shippingAddress: `${shippingData.adresse}, ${shippingData.codePostal} ${shippingData.ville}`
                })
            });

            const data = await response.json();
            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.message || "Erreur lors de l'initialisation du paiement.");
            }
        } catch (error) {
            console.error("Erreur redirection Stripe:", error);
            alert("Impossible de contacter le serveur de paiement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF7] py-8 lg:py-16 px-4 font-forum">
            {/* Structure de grille :
                - Par défaut (mobile) : 1 colonne (grid-cols-1)
                - À partir de lg (1024px) : 2 colonnes (lg:grid-cols-2)
            */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* --- BLOC LIVRAISON --- */}
                <div className="bg-white p-6 lg:p-10 rounded-[40px] shadow-xl border border-gray-100 h-fit">
                    <h2 className="text-[#634832] text-2xl lg:text-3xl uppercase tracking-widest mb-8 lg:mb-10 border-b border-gray-50 pb-4 font-forum">
                        Livraison
                    </h2>
                    <form onSubmit={handlePayment} className="space-y-6 lg:space-y-8">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Adresse complète</label>
                            <input type="text" name="adresse" required onChange={handleChange} className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-[#C5A059] transition-colors" placeholder="15 rue des saveurs" />
                        </div>

                        {/* Grid Ville / CP : Reste en 2 colonnes même sur mobile pour compacité */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-8">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Ville</label>
                                <input type="text" name="ville" required onChange={handleChange} className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-[#C5A059] transition-colors" placeholder="Paris" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Code Postal</label>
                                <input type="text" name="codePostal" required onChange={handleChange} className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-[#C5A059] transition-colors" placeholder="75000" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Téléphone de contact</label>
                            <input type="tel" name="telephone" required onChange={handleChange} className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-[#C5A059] transition-colors" placeholder="06 00 00 00 00" />
                        </div>

                        <ButtonGold
                            type="submit"
                            disabled={loading || cartItems.length === 0}
                            className="w-full py-4 lg:py-5 mt-4"
                        >
                            {loading ? 'Redirection...' : 'Procéder au paiement'}
                        </ButtonGold>
                    </form>
                </div>

                {/* --- BLOC RÉCAPITULATIF (Ma Commande) --- */}
                <div className="bg-[#634832] p-6 lg:p-10 rounded-[40px] text-white shadow-2xl h-fit lg:sticky lg:top-10">
                    <h2 className="text-xl lg:text-2xl uppercase tracking-widest mb-6 lg:mb-8 border-b border-white/20 pb-4 font-forum">
                        Ma Commande
                    </h2>

                    <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10 max-h-[300px] lg:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item, index) => {
                            // Sécurisation anti-NaN utilisant les clés de ton API
                            const pU = Number(item.prix_ttc || item.prixUnitaire || 0);
                            const q = Number(item.quantite || 0);
                            const ligneTotal = (pU * q).toFixed(2);

                            return (
                                <div key={index} className="flex justify-between items-start gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm lg:text-base opacity-90">
                                            {item.nom_produit || item.nom} (x{q})
                                        </span>
                                        <span className="text-[10px] text-[#C5A059] uppercase tracking-widest opacity-80">
                                            {item.poids_affichage || item.poids}
                                        </span>
                                    </div>
                                    <span className="text-base lg:text-lg font-medium font-sans tracking-tighter shrink-0">
                                        {ligneTotal}€
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center text-xl lg:text-2xl font-bold border-t border-white/20 pt-6">
                        <span className="uppercase tracking-widest text-sm font-forum">Total TTC</span>
                        <span className="text-2xl lg:text-3xl text-[#C5A059] font-sans tracking-tighter">
                            {Number(totalAmount).toFixed(2)}€
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;