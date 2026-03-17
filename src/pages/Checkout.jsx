// Importation des hooks et composants React.
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Pour le lien vers les Conditions Générales de Vente.
// Importation des contextes pour accéder aux données du panier et de l'utilisateur.
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';
// Importation des composants personnalisés.
import ButtonGold from "../components/ButtonGold.jsx";
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

/**
 * Composant de la page de paiement (Checkout).
 * Gère la saisie de l'adresse de livraison et la redirection vers le paiement (Stripe).
 */
const Checkout = () => {
    // Récupération des données du panier et de l'utilisateur depuis les contextes.
    const { cartItems, totalAmount } = useContext(CardContext);
    const { user } = useContext(AuthContext);

    // État pour stocker les informations de l'adresse de livraison.
    const [shippingData, setShippingData] = useState({
        adresse: '',
        ville: '',
        codePostal: '',
        telephone: ''
    });

    // État pour gérer l'affichage du chargement lors de la redirection vers Stripe.
    const [loading, setLoading] = useState(false);
    // État pour la case à cocher des Conditions Générales de Vente (CGV).
    const [cgvAccepted, setCgvAccepted] = useState(false);

    /**
     * Met à jour l'état `shippingData` à chaque modification d'un champ du formulaire.
     */
    const handleChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    /**
     * Gère la soumission du formulaire et la création de la session de paiement Stripe.
     */
    const handlePayment = async (e) => {
        e.preventDefault();

        // Validations avant de procéder au paiement.
        if (!cgvAccepted) {
            toast.error("Veuillez accepter les CGV pour finaliser la commande");
            return;
        }
        if (!user) {
            toast.error("Vous devez être connecté pour commander.");
            return;
        }

        setLoading(true);

        try {
            // Appel à l'API backend pour créer une session de paiement Stripe.
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
            // Si la session est créée avec succès, l'API renvoie une URL de redirection.
            if (response.ok && data.url) {
                // Redirection de l'utilisateur vers la page de paiement Stripe.
                window.location.href = data.url;
            } else {
                toast.error(data.message || "Erreur lors de l'initialisation du paiement.");
            }
        } catch (error) {
            console.error("Erreur redirection Stripe:", error);
            toast.error("Impossible de contacter le serveur de paiement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Paiement Sécurisé & Livraison"
                description="Étape finale de votre commande CafThé. Choisissez votre mode de livraison et réglez vos achats via notre interface de paiement 100% sécurisée."
            />
            <main className="min-h-screen bg-input-bg py-8 lg:py-16 px-4 font-forum">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* --- Colonne de gauche : Formulaire de livraison --- */}
                    <div id="Card" className="bg-white p-6 lg:p-10 rounded-[40px] shadow-xl border border-gray-100 h-fit">
                        <h2 className="text-[#634832] text-2xl lg:text-3xl uppercase tracking-widest mb-8 lg:mb-10 border-b border-gray-50 pb-4 font-forum">
                            Livraison
                        </h2>
                        <form onSubmit={handlePayment} className="space-y-6 lg:space-y-8">
                            <div>
                                <label htmlFor="adresse" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Adresse complète</label>
                                <input 
                                    id="adresse"
                                    type="text" 
                                    name="adresse" 
                                    required 
                                    onChange={handleChange} 
                                    className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-gold-premium transition-colors" 
                                    placeholder="15 rue des saveurs" 
                                    pattern="^[a-zA-Z0-9\s,\.'-]{5,}$"
                                    title="L'adresse doit contenir au moins 5 caractères (lettres, chiffres, espaces, virgules, points, apostrophes, tirets)"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 lg:gap-8">
                                <div>
                                    <label htmlFor="ville" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Ville</label>
                                    <input 
                                        id="ville"
                                        type="text" 
                                        name="ville" 
                                        required 
                                        onChange={handleChange} 
                                        className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-gold-premium transition-colors" 
                                        placeholder="Paris" 
                                        pattern="^[a-zA-Z\s'-]{2,}$"
                                        title="La ville doit contenir au moins 2 caractères (lettres, espaces, apostrophes, tirets)"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="codePostal" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Code Postal</label>
                                    <input 
                                        id="codePostal"
                                        type="text" 
                                        name="codePostal" 
                                        required 
                                        onChange={handleChange} 
                                        className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-gold-premium transition-colors" 
                                        placeholder="75000" 
                                        pattern="^[0-9]{5}$"
                                        title="Le code postal doit être composé de 5 chiffres exacts"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="telephone" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Téléphone de contact</label>
                                <input 
                                    id="telephone"
                                    type="tel" 
                                    name="telephone" 
                                    required 
                                    onChange={handleChange} 
                                    className="w-full border-b border-gray-200 py-3 outline-none bg-transparent focus:border-gold-premium transition-colors" 
                                    placeholder="06 00 00 00 00" 
                                    pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                                    title="Veuillez entrer un numéro de téléphone français valide (ex: 06 12 34 56 78 ou +33 6 12 34 56 78)"
                                />
                            </div>

                            {/* Case à cocher pour l'acceptation des CGV */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-fadeIn">
                                <input
                                    id="cgv-accept"
                                    type="checkbox"
                                    checked={cgvAccepted}
                                    onChange={(e) => setCgvAccepted(e.target.checked)}
                                    className="w-4 h-4 mt-1 accent-gold-premium cursor-pointer"
                                    required
                                />
                                <label htmlFor="cgv-accept" className="text-[10px] text-gray-500 font-sans leading-relaxed italic cursor-pointer">
                                    Je déclare avoir pris connaissance et accepter les <Link to="/cgv" className="text-gold-premium underline hover:text-coffee-dark" aria-label="Lire les conditions générales de vente (ouvre une nouvelle page)">Conditions Générales de Vente</Link> de CafThé.
                                </label>
                            </div>

                            <ButtonGold
                                type="submit"
                                aria-label={loading ? "Redirection vers la plateforme de paiement en cours" : "Valider et procéder au paiement de la commande"}
                                disabled={loading || cartItems.length === 0 || !cgvAccepted}
                                className={`w-full py-4 lg:py-5 mt-4 ${!cgvAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Redirection...' : 'Procéder au paiement'}
                            </ButtonGold>
                        </form>
                    </div>

                    {/* --- Colonne de droite : Récapitulatif de la commande --- */}
                    <div className="bg-coffee-dark p-6 lg:p-10 rounded-[40px] text-white shadow-2xl h-fit lg:sticky lg:top-10">
                        <h2 className="text-xl lg:text-2xl uppercase tracking-widest mb-6 lg:mb-8 border-b border-white/20 pb-4 font-forum">
                            Ma Commande
                        </h2>

                        <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10 max-h-75 lg:max-h-100 overflow-y-auto pr-2 custom-scrollbar" aria-label="Liste des articles dans votre commande">
                            {cartItems.map((item, index) => {
                                const pU = Number(item.prix_final || item.prix_ttc || 0);
                                const q = Number(item.quantite || 0);
                                const ligneTotal = (pU * q).toFixed(2);

                                return (
                                    <div key={index} className="flex justify-between items-start gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm lg:text-base opacity-90">
                                                {item.nom_produit || item.nom} (x{q})
                                            </span>
                                            <span className="text-[10px] text-gold-premium uppercase tracking-widest opacity-80">
                                                {item.poids_affichage || item.poids}
                                            </span>
                                        </div>
                                        <span className="text-base lg:text-lg font-medium font-sans tracking-tighter shrink-0" aria-label={`Prix total pour cet article: ${ligneTotal} euros`}>
                                            {ligneTotal}€
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center text-xl lg:text-2xl font-bold border-t border-white/20 pt-6">
                            <span className="uppercase tracking-widest text-sm font-forum">Total TTC</span>
                            <span className="text-2xl lg:text-3xl text-gold-premium font-sans tracking-tighter" aria-label={`Montant total de la commande: ${Number(totalAmount).toFixed(2)} euros`}>
                                {Number(totalAmount).toFixed(2)}€
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Checkout;