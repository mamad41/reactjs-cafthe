import React, { useState, useContext } from 'react';
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, totalAmount } = useContext(CardContext);
    const { user } = useContext(AuthContext); // Utilise l'user du context pour vérifier la connexion

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

        // 1. On vérifie si l'utilisateur est bien là (via le context)
        if (!user) {
            alert("Vous devez être connecté pour commander.");
            return;
        }

        setLoading(true);

        try {
            // 2. Appel à ton API de paiement
            const response = await fetch("http://localhost:3000/api/payment/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // INDISPENSABLE : envoie le cookie de session au backend
                credentials: "include",
                body: JSON.stringify({
                    cartItems: cartItems,
                    totalAmount: totalAmount,
                    shippingAddress: `${shippingData.adresse}, ${shippingData.codePostal} ${shippingData.ville}`
                })
            });

            const data = await response.json();

            if (response.ok && data.url) {
                // REDIRECTION VERS STRIPE
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
        <div className="min-h-screen bg-[#FDFCF7] py-16 px-4 font-forum">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-[30px] shadow-xl border border-gray-100">
                    <h2 className="text-[#634832] text-2xl uppercase tracking-widest mb-8">Livraison</h2>
                    <form onSubmit={handlePayment} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Adresse</label>
                            <input type="text" name="adresse" required onChange={handleChange} className="w-full border-b border-gray-200 py-2 outline-none bg-transparent focus:border-[#C5A059]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Ville</label>
                                <input type="text" name="ville" required onChange={handleChange} className="w-full border-b border-gray-200 py-2 outline-none bg-transparent focus:border-[#C5A059]" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Code Postal</label>
                                <input type="text" name="codePostal" required onChange={handleChange} className="w-full border-b border-gray-200 py-2 outline-none bg-transparent focus:border-[#C5A059]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Téléphone</label>
                            <input type="tel" name="telephone" required onChange={handleChange} className="w-full border-b border-gray-200 py-2 outline-none bg-transparent focus:border-[#C5A059]" />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || cartItems.length === 0}
                            className={`w-full bg-[#634832] text-white py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-[#A6844A] transition-all ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Chargement...' : 'Procéder au paiement'}
                        </button>
                    </form>
                </div>

                <div className="bg-[#634832] p-8 rounded-[30px] text-white shadow-xl h-fit">
                    <h2 className="text-xl uppercase tracking-widest mb-8 border-b border-white/20 pb-4">Ma Commande</h2>
                    <div className="space-y-4 mb-8">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm opacity-90">
                                <span>{item.nom} (x{item.quantite})</span>
                                <span>{(item.prixFinal * item.quantite).toFixed(2)}€</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t border-white/20 pt-4">
                        <span>Total TTC</span>
                        <span>{totalAmount}€</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;