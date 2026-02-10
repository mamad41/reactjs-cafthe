import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // États pour le formulaire
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState(""); // Pour l'inscription
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Récupération de la cible de redirection (ex: checkout)
    const redirectTarget = searchParams.get("redirect");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // Détermination de l'endpoint et du corps de la requête
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

            // Mise à jour de l'état global utilisateur
            login(data.client);

            // Redirection intelligente : vers le panier si demandé, sinon vers l'accueil
            if (redirectTarget) {
                navigate(`/${redirectTarget}`);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Erreur d'authentification: ", error);
            setErrorMsg("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF7] flex flex-col items-center justify-center p-6 font-forum">
            <div className="w-full max-w-md bg-white rounded-[40px] p-10 md:p-14 shadow-2xl border border-gray-100">

                {/* Titre dynamique */}
                <h2 className="text-[#634832] text-3xl uppercase tracking-[0.2em] text-center mb-10">
                    {isRegistering ? "Créer un compte" : "Connexion"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Champ Nom (uniquement Inscription) */}
                    {isRegistering && (
                        <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Nom Complet</label>
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
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Email</label>
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
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={motDePasse}
                            required
                            className="w-full border-b border-gray-200 py-2 focus:border-[#C5A059] outline-none transition-all bg-transparent"
                            placeholder="Votre mot de passe"
                            onChange={(e) => setMotDePasse(e.target.value)}
                        />
                    </div>

                    {/* Message d'erreur stylisé */}
                    {errorMsg && (
                        <div className="text-red-500 text-[11px] uppercase tracking-wider text-center bg-red-50 py-2 rounded-lg">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#634832] text-white py-5 rounded-full uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#A6844A] transition-all duration-300 shadow-lg mt-4"
                    >
                        {isRegistering ? "S'inscrire" : "Se Connecter"}
                    </button>
                </form>

                {/* Switch Login / Register */}
                <div className="mt-10 text-center border-t border-gray-50 pt-8">
                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setErrorMsg("");
                        }}
                        className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold hover:text-[#634832] transition-colors"
                    >
                        {isRegistering
                            ? "Déjà un compte ? Se connecter"
                            : "Pas encore de compte ? Créer un profil"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;