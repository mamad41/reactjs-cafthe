import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonGold from "../components/ButtonGold.jsx";
import { Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from "../components/SEO";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Récupère le token dans l'URL

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/client/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    nouveau_mots_de_passe: newPassword
                }),
            });

            if (response.ok) {
                toast.success("Mot de passe mis à jour avec succès !");
                navigate("/login");
            } else {
                const data = await response.json();
                toast.error(data.message || "Le lien a expiré.");
            }
        } catch (error) {
            toast.error("Erreur de connexion au serveur.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <><SEO
            title="Réinitialisation du mot de passe"
            description="Sécurisez votre compte CafThé en définissant un nouveau mot de passe."
        />
        <main className="min-h-screen bg-input-bg dark:bg-black flex flex-col items-center justify-center p-6 font-forum transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[40px] p-10 md:p-14 shadow-2xl border border-gray-100 dark:border-white/5">

                <h2 className="text-[#634832] dark:text-white text-2xl uppercase tracking-[0.2em] text-center mb-10">
                    Nouveau Mot de Passe
                </h2>

                <form onSubmit={handleReset} className="space-y-8">
                    {/* Nouveau MDP */}
                    <div className="flex flex-col relative">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Nouveau mot de passe</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            required
                            className="w-full border-b border-gray-200 dark:border-white/10 py-2 focus:border-gold-premium outline-none transition-all bg-transparent dark:text-white"
                            placeholder="••••••••"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 bottom-2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {/* Confirmation MDP */}
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold italic">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            required
                            className="w-full border-b border-gray-200 dark:border-white/10 py-2 focus:border-gold-premium outline-none transition-all bg-transparent dark:text-white"
                            placeholder="••••••••"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <ButtonGold type="submit" disabled={isSubmitting} className="w-full py-5 rounded-full mt-4">
                        {isSubmitting ? "Mise à jour..." : "Réinitialiser"}
                    </ButtonGold>
                </form>
            </div>
        </main>
        </>
    );
};

export default ResetPassword;