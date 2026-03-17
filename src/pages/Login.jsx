// Importation des dépendances React et des hooks.
import React, { useContext, useState } from "react";
// Importation du contexte d'authentification pour accéder à la fonction `login`.
import { AuthContext } from "../context/AuthContext.jsx";
// Hooks de React Router pour la navigation et la lecture des paramètres d'URL.
import { useNavigate, useSearchParams } from "react-router-dom";
// Importation des composants personnalisés et des icônes.
import ButtonGold from "../components/ButtonGold.jsx";
import { ShieldCheck, X, Mail } from 'lucide-react';
import toast from 'react-hot-toast'; // Pour les notifications (mot de passe oublié).
import SEO from '../components/SEO'; // Pour l'optimisation du référencement.

/**
 * Composant pour la page de Connexion et d'Inscription.
 * Gère les formulaires, l'authentification et la récupération de mot de passe.
 */
const Login = () => {
    // Récupération de la fonction `login` depuis le contexte d'authentification.
    const { login } = useContext(AuthContext);
    // Hook pour la navigation vers d'autres pages.
    const navigate = useNavigate();
    // Hook pour lire les paramètres dans l'URL (ex: ?redirect=checkout).
    const [searchParams] = useSearchParams();

    // --- États du formulaire ---
    // État pour basculer entre le mode connexion et inscription.
    const [isRegistering, setIsRegistering] = useState(false);
    // États pour les champs du formulaire.
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    // État pour la case à cocher RGPD.
    const [acceptedRGPD, setAcceptedRGPD] = useState(false);
    // État pour afficher la modale de politique de confidentialité.
    const [showPolicy, setShowPolicy] = useState(false);
    // État pour stocker et afficher les messages d'erreur.
    const [errorMsg, setErrorMsg] = useState("");

    // --- États pour la fonctionnalité "Mot de passe oublié" ---
    const [showForgotPwd, setShowForgotPwd] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [isSending, setIsSending] = useState(false); // Pour désactiver le bouton pendant l'envoi.

    // Récupère la cible de redirection depuis l'URL, s'il y en a une.
    const redirectTarget = searchParams.get("redirect");

    /**
     * Gère la soumission du formulaire de connexion ou d'inscription.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page.

        // Validation pour l'inscription.
        if (isRegistering && !acceptedRGPD) {
            setErrorMsg("Veuillez accepter la politique de confidentialité.");
            return;
        }
        setErrorMsg(""); // Réinitialise les erreurs.

        // Détermine le point de terminaison de l'API et les données à envoyer.
        const endpoint = isRegistering ? "register" : "login";
        const bodyData = isRegistering
            ? { nom, email, mots_de_passe: motDePasse }
            : { email, mots_de_passe: motDePasse };

        try {
            // Appel à l'API d'authentification.
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/client/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Important pour la gestion des cookies de session.
                body: JSON.stringify(bodyData),
            });
            const data = await response.json();

            if (!response.ok) {
                // Si l'API renvoie une erreur, on l'affiche.
                setErrorMsg(data.message || "Erreur d'authentification");
                return;
            }

            // Si la connexion réussit, on met à jour le contexte d'authentification.
            login(data.client);
            // On redirige l'utilisateur vers sa page de destination ou l'accueil.
            navigate(redirectTarget ? `/${redirectTarget}` : "/");
        } catch (error) {
            console.error(error); // Affiche l'erreur dans la console pour le débogage.
            setErrorMsg("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    /**
     * Gère la soumission du formulaire de mot de passe oublié.
     */
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/client/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });

            if (response.ok) {
                toast.success("Email de récupération envoyé !");
                setShowForgotPwd(false); // Ferme la modale en cas de succès.
            } else {
                setErrorMsg("Email introuvable.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSending(false); // Réactive le bouton.
        }
    };

    return (
        <>
            <SEO
                title="Connexion / Création de Compte"
                description="Connectez-vous pour profiter de vos avantages fidélité ou créez un compte pour recevoir 10% de remise sur votre première commande d'abonnement."
            />
            <main className="min-h-screen bg-input-bg dark:bg-black flex flex-col items-center justify-center p-6 font-forum relative transition-colors">
                <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[40px] p-10 md:p-14 shadow-2xl border border-gray-100 dark:border-white/5">

                    <h2 className="text-[#634832] dark:text-white text-3xl uppercase tracking-[0.2em] text-center mb-10">
                        {isRegistering ? "Créer un compte" : "Connexion"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Champ "Nom Complet", affiché uniquement en mode inscription */}
                        {isRegistering && (
                            <div className="flex flex-col">
                                <label htmlFor="nom" className="text-[10px] uppercase tracking-widest text-gray-400  mb-2 font-bold italic">Nom Complet</label>
                                <input
                                    id="nom"
                                    type="text" 
                                    value={nom} 
                                    required
                                    className="w-full border-b border-gray-200 dark:border-white/10 py-2 focus:border-gold-premium outline-none transition-all bg-transparent dark:text-white"
                                    placeholder="Jean Dupont" 
                                    onChange={(e) => setNom(e.target.value)}
                                    pattern="^[a-zA-ZÀ-ÿ\s'-]{2,50}$"
                                    title="Le nom complet doit contenir entre 2 et 50 caractères alphabétiques"
                                />
                            </div>
                        )}

                        {/* Champ "Email" */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Email</label>
                            <input
                                id="email"
                                type="email" 
                                value={email} 
                                required
                                className="w-full border-b border-gray-200 dark:border-white/10 py-2 focus:border-gold-premium outline-none transition-all bg-transparent dark:text-white"
                                placeholder="votre@email.fr" 
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                title="Veuillez saisir une adresse email valide"
                            />
                        </div>

                        {/* Champ "Mot de passe" */}
                        <div className="flex flex-col relative">
                            <label htmlFor="motDePasse" className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Mot de passe</label>
                            <input
                                id="motDePasse"
                                type="password" 
                                value={motDePasse} 
                                required
                                className="w-full border-b border-gray-200 dark:border-white/10 py-2 focus:border-gold-premium outline-none transition-all bg-transparent dark:text-white"
                                placeholder="Votre mot de passe" 
                                onChange={(e) => setMotDePasse(e.target.value)}
                                minLength="8"
                                title="Le mot de passe doit contenir au moins 8 caractères"
                            />
                            {/* Lien "Mot de passe oublié", affiché uniquement en mode connexion */}
                            {!isRegistering && (
                                <button
                                    aria-label="Ouvrir la modale de récupération de mot de passe"
                                    type="button"
                                    onClick={() => setShowForgotPwd(true)}
                                    className="text-[11px] uppercase text-gold-premium mt-2 text-right hover:underline font-bold"
                                >
                                    Mot de passe oublié ?
                                </button>
                            )}
                        </div>

                        {/* Case à cocher RGPD, affichée uniquement en mode inscription */}
                        {isRegistering && (
                            <div className="flex items-start gap-3 pt-2">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox" 
                                        id="rgpd" 
                                        checked={acceptedRGPD}
                                        onChange={(e) => setAcceptedRGPD(e.target.checked)}
                                        className="w-4 h-4 border-2 border-gray-200 rounded appearance-none checked:bg-gold-premium checked:border-gold-premium cursor-pointer"
                                        aria-label="Accepter l'utilisation des données personnelles"
                                    />
                                    {acceptedRGPD && <ShieldCheck size={10} className="absolute text-white left-0.5 pointer-events-none" aria-hidden="true" />}
                                </div>
                                <label htmlFor="rgpd" className="text-[9px] text-gray-500 italic leading-tight dark:text-gray-400">
                                    J'accepte l'utilisation de mes données.
                                    <button type="button" aria-label="En savoir plus sur la politique de confidentialité" onClick={() => setShowPolicy(true)} className="text-gold-premium underline ml-1 font-bold">En savoir plus</button>
                                </label>
                            </div>
                        )}

                        {/* Affichage conditionnel du message d'erreur */}
                        {errorMsg && (
                            <div className="text-red-500 text-[11px] uppercase text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg font-bold" role="alert" aria-live="assertive">
                                {errorMsg}
                            </div>
                        )}

                        <ButtonGold 
                            aria-label={isRegistering ? "Créer mon compte" : "Me connecter à mon compte"}
                            type="submit"
                            disabled={isRegistering && !acceptedRGPD}
                            className={`w-full py-5 rounded-full mt-4 ${isRegistering && !acceptedRGPD ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isRegistering ? "S'inscrire" : "Se Connecter"}
                        </ButtonGold>
                    </form>

                    {/* Bouton pour basculer entre les modes connexion et inscription */}
                    <div className="mt-10 text-center border-t border-gray-50 dark:border-white/5 pt-8">
                        <button
                            type="button"
                            aria-label={isRegistering ? "Basculer vers la connexion" : "Basculer vers la création de compte"}
                            onClick={() => { setIsRegistering(!isRegistering); setErrorMsg(""); }}
                            className="text-[10px] uppercase tracking-widest text-gold-premium font-bold"
                        >
                            {isRegistering ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un profil"}
                        </button>
                    </div>
                </div>

                {/* Modale pour le mot de passe oublié */}
                {showForgotPwd && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-recup-title">
                        <div className="bg-white dark:bg-[#1A1A1A] max-w-sm w-full rounded-[35px] p-10 shadow-2xl relative">
                            <button aria-label="Fermer la modale de récupération de mot de passe" onClick={() => setShowForgotPwd(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gold-premium"><X size={24} aria-hidden="true" /></button>
                            <h3 id="modal-recup-title" className="text-gold-premium text-xl uppercase mb-6 flex items-center gap-2 font-bold"><Mail size={20} aria-hidden="true" /> Récupération</h3>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic mb-6">Saisissez votre email pour recevoir un lien de réinitialisation.</p>

                            <form onSubmit={handleForgotPassword} className="space-y-6">
                                <div className="flex flex-col">
                                    <label htmlFor="forgotEmail" className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Email de récupération</label>
                                    <input
                                        id="forgotEmail"
                                        type="email" 
                                        required 
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        className="w-full border-b border-gray-200 dark:border-white/10 py-2 outline-none focus:border-gold-premium bg-transparent dark:text-white"
                                        placeholder="votre@email.fr"
                                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                        title="Veuillez saisir une adresse email valide"
                                    />
                                </div>
                                <ButtonGold 
                                    type="submit" 
                                    aria-label="Envoyer le lien de réinitialisation"
                                    disabled={isSending} 
                                    className="w-full py-3 text-[10px]"
                                >
                                    {isSending ? "Envoi..." : "Envoyer le lien"}
                                </ButtonGold>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modale pour la politique de confidentialité */}
                {showPolicy && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-policy-title">
                        <div className="bg-white dark:bg-[#1A1A1A] max-w-lg w-full rounded-[35px] p-10 shadow-2xl relative animate-fadeIn">
                            <button aria-label="Fermer la modale de politique de confidentialité" onClick={() => setShowPolicy(false)} className="absolute top-6 right-6 text-gray-400"><X size={24} aria-hidden="true" /></button>
                            <h3 id="modal-policy-title" className="text-gold-premium text-xl uppercase mb-6 flex items-center gap-2 font-bold dark:text-white"><ShieldCheck size={20} aria-hidden="true" /> Protection des données</h3>
                            <div className="space-y-4 text-xs text-gray-500 italic font-sans dark:text-gray-400">
                                <p>Vos informations servent à la livraison de vos colis.</p>
                                <p>Vos achats sont conservés pour créditer vos grains de fidélité.</p>
                            </div>
                            <ButtonGold aria-label="Fermer et accepter la politique" onClick={() => setShowPolicy(false)} className="w-full mt-8 py-3 text-[10px]">J'ai compris</ButtonGold>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Login;