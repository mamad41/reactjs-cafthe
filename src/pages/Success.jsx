// Importation des hooks et composants React.
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// Importation des icônes et composants personnalisés.
import { CheckCircle } from 'lucide-react';
import { CardContext } from '../context/CardContext';
import ButtonGold from '../components/ButtonGold';
import SEO from '../components/SEO';
// Importation de la librairie pour l'animation de confettis.
import confetti from 'canvas-confetti';

/**
 * Composant de la page de succès.
 * Affiché après un paiement réussi, il remercie l'utilisateur,
 * vide le panier et propose des liens de navigation.
 */
const Success = () => {
    // Récupération de la fonction `clearCart` depuis le contexte du panier.
    const { clearCart } = useContext(CardContext);

    // Effet qui s'exécute une seule fois au montage du composant.
    useEffect(() => {
        // 1. Vider le panier pour que l'utilisateur puisse commencer une nouvelle commande.
        clearCart();

        // 2. Lancer une animation de confettis pour célébrer la commande.
        const duration = 3 * 1000; // Durée de l'animation en millisecondes.
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        // Fonction pour générer une valeur aléatoire dans un intervalle.
        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval); // Arrête l'animation.
            }

            // Le nombre de particules diminue avec le temps.
            const particleCount = 50 * (timeLeft / duration);
            // Lance des confettis depuis deux points d'origine pour un effet plus riche.
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Nettoyage de l'intervalle lorsque le composant est démonté.
        return () => clearInterval(interval);
    }, [clearCart]); // `clearCart` est une dépendance stable grâce à `useCallback`.

    return (
        <>
            <SEO
                title="Commande Confirmée - CafThé"
                description="Merci pour votre commande ! Votre paiement a été validé avec succès."
            />
            <main className="min-h-screen bg-input-bg flex items-center justify-center p-6 font-forum">
                <div className="bg-white max-w-lg w-full rounded-[40px] shadow-2xl p-12 text-center border border-gray-100 animate-fadeIn">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                        <CheckCircle size={40} />
                    </div>
                    
                    <h1 className="text-3xl uppercase tracking-widest text-[#634832] mb-4 font-bold">
                        Merci !
                    </h1>
                    
                    <p className="text-xl text-gold-premium mb-8 font-medium">
                        Votre commande a été validée.
                    </p>
                    
                    <p className="text-gray-500 text-sm italic mb-10 leading-relaxed font-sans">
                        Vous recevrez bientôt un email de confirmation avec les détails de votre commande. 
                        Nous préparons vos produits avec le plus grand soin.
                    </p>

                    <div className="space-y-4">
                        {/* Lien pour que l'utilisateur puisse voir sa commande dans son espace client */}
                        <Link to="/espace-client#orders">
                            <ButtonGold className="w-full py-4 text-[10px] tracking-widest">
                                Suivre ma commande
                            </ButtonGold>
                        </Link>
                        
                        {/* Lien pour retourner à la page d'accueil */}
                        <Link to="/" className="block text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#634832] transition-colors font-bold mt-6">
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Success;
