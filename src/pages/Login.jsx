import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonGold from "../components/ButtonGold.jsx";
import { ShieldCheck, X } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // États
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [acceptedRGPD, setAcceptedRGPD] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const redirectTarget = searchParams.get("redirect");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering && !acceptedRGPD) {
            setErrorMsg("Veuillez accepter la politique de confidentialité.");
            return;
        }

        setErrorMsg("");
        const endpoint = isRegistering ? "register" : "login";
        const bodyData = isRegistering
            ? { nom, email, mots_de_passe: motDePasse }
            : { email, mots_de_passe: motDePasse };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/client/${endpoint}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(bodyData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur d'authentification");
                return;
            }

            login(data.client);
            navigate(redirectTarget ? `/${redirectTarget}` : "/");
        } catch (error) {
            console.error("Erreur d'authentification: ", error);
            setErrorMsg("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF7] flex flex-col items-center justify-center p-6 font-forum relative">
            <div className="w-full max-w-md bg-white rounded-[40px] p-10 md:p-14 shadow-2xl border border-gray-100">

                <h2 className="text-[#634832] text-3xl uppercase tracking-[0.2em] text-center mb-10">
                    {isRegistering ? "Créer un compte" : "Connexion"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {isRegistering && (
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Nom Complet</label>
                            <input
                                type="text"
                                value={nom}
                                required
                                className="w-full border-b border-gray-200 py-2 focus:border-[#C5A059] outline-none transition-all bg-transparent"
                                placeholder="Jean Dupont"
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            className="w-full border-b border-gray-200 py-2 focus:border-[#C5A059] outline-none transition-all bg-transparent"
                            placeholder="votre@email.fr"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Mot de passe</label>
                        <input
                            type="password"
                            value={motDePasse}
                            required
                            className="w-full border-b border-gray-200 py-2 focus:border-[#C5A059] outline-none transition-all bg-transparent"
                            placeholder="Votre mot de passe"
                            onChange={(e) => setMotDePasse(e.target.value)}
                        />
                    </div>

                    {isRegistering && (
                        <div className="flex items-start gap-3 pt-2">
                            <div className="relative flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    id="rgpd"
                                    checked={acceptedRGPD}
                                    onChange={(e) => setAcceptedRGPD(e.target.checked)}
                                    className="w-4 h-4 border-2 border-gray-200 rounded appearance-none checked:bg-[#C5A059] checked:border-[#C5A059] cursor-pointer"
                                />
                                {acceptedRGPD && <ShieldCheck size={10} className="absolute text-white left-0.5 pointer-events-none" />}
                            </div>
                            <label htmlFor="rgpd" className="text-[9px] text-gray-500 italic leading-tight">
                                J'accepte l'utilisation de mes données pour mes commandes.
                                <button type="button" onClick={() => setShowPolicy(true)} className="text-[#C5A059] underline ml-1 font-bold">En savoir plus</button>
                            </label>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="text-red-500 text-[11px] uppercase text-center bg-red-50 py-2 rounded-lg font-bold">
                            {errorMsg}
                        </div>
                    )}

                    <ButtonGold
                        type="submit"
                        disabled={isRegistering && !acceptedRGPD}
                        className={`w-full py-5 rounded-full mt-4 ${isRegistering && !acceptedRGPD ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isRegistering ? "S'inscrire" : "Se Connecter"}
                    </ButtonGold>
                </form>

                <div className="mt-10 text-center border-t border-gray-50 pt-8">
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setErrorMsg("");
                        }}
                        className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold"
                    >
                        {isRegistering ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un profil"}
                    </button>
                </div>
            </div>

            {/* MODALE RGPD */}
            {showPolicy && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white max-w-lg w-full rounded-[35px] p-10 shadow-2xl relative animate-fadeIn">
                        <button onClick={() => setShowPolicy(false)} className="absolute top-6 right-6 text-gray-400"><X size={24} /></button>
                        <h3 className="text-[#C5A059] text-xl uppercase mb-6 flex items-center gap-2 font-bold"><ShieldCheck size={20} /> Protection des données</h3>
                        <div className="space-y-4 text-xs text-gray-500 italic font-sans">
                            <p>Vos informations servent à la livraison de vos colis.</p>
                            <p>Vos achats sont conservés pour créditer vos grains de fidélité.</p>
                        </div>
                        <ButtonGold onClick={() => setShowPolicy(false)} className="w-full mt-8 py-3 text-[10px]">J'ai compris</ButtonGold>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;