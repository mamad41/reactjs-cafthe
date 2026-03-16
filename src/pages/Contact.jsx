import React, { useState } from 'react'; // Ajout de useState ici
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ButtonGold from "../components/ButtonGold.jsx";
import SEO from '../components/SEO';

const Contact = () => {
    // Le State doit impérativement être à l'intérieur du composant
    const [rgpdAccepted, setRgpdAccepted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rgpdAccepted) return;
        // Logique d'envoi ici
        console.log("Formulaire envoyé");
    };

    return (
        <><SEO
            title="Contactez nos Experts"
            description="Une question sur nos produits ou votre commande ? L'équipe CafThé est à votre écoute pour vous conseiller dans votre dégustation."
        />
        <main className="bg-input-bg min-h-screen py-20 px-4 sm:px-10 font-forum selection:bg-gold-premium/30">
            {/* --- HEADER --- */}
            <header className="max-w-6xl mx-auto mb-20 text-center">
                <h1 className="text-gold-premium text-3xl md:text-5xl uppercase tracking-[0.3em] mb-6">
                    Contactez-nous
                </h1>
                <div className="h-px w-32 bg-gold-premium mx-auto block opacity-50"></div>
            </header>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* --- COLONNE GAUCHE : INFOS --- */}
                    <div className="lg:col-span-5 space-y-12 animate-fadeIn">
                        <div className="space-y-6">
                            <h2 className="text-2xl uppercase tracking-widest text-[#333]">Nos Coordonnées</h2>
                            <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-md">
                                Une question sur nos crus ou besoin d'un conseil pour votre abonnement ?
                                Notre équipe d'experts est à votre entière disposition.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-center gap-6 group">
                                <div className="shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-colors group-hover:border-gold-premium">
                                    <Mail className="text-gold-premium" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Email</h4>
                                    <p className="text-[#634832] font-sans font-medium">contact@cafethe.fr</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-colors group-hover:border-gold-premium">
                                    <Phone className="text-gold-premium" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Téléphone</h4>
                                    <p className="text-[#634832] font-sans font-medium">01 23 45 67 89</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-colors group-hover:border-gold-premium">
                                    <MapPin className="text-gold-premium" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Atelier & Boutique</h4>
                                    <p className="text-[#634832] font-sans font-medium">15 Rue de l'Artisanat, Paris</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- COLONNE DROITE : FORMULAIRE --- */}
                    <div id="form" className="lg:col-span-7 w-full h-full">
                        <div id="Card" className="bg-white rounded-[20px] p-8 md:p-14 pb-20 shadow-sm border border-gray-100 box-border h-full">
                            <h3 className="text-2xl font-forum uppercase mb-10 text-[#333] text-center lg:text-left">Écrivez-nous</h3>

                            <form onSubmit={handleSubmit} className="mx-auto flex flex-col h-full max-w-200">
                                <div className="space-y-7 mb-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Nom</label>
                                            <input id="inp" type="text" required className="w-full bg-input-bg border border-gray-100 rounded-full px-6 py-4 outline-none focus:border-gold-premium font-sans text-sm" placeholder="Votre nom" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Prénom</label>
                                            <input id="inp1" type="text" required className="w-full bg-input-bg border border-gray-100 rounded-full px-6 py-4 outline-none focus:border-gold-premium font-sans text-sm" placeholder="Votre prénom" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Email</label>
                                        <input id="inp2" type="email" required className="w-full bg-input-bg border border-gray-100 rounded-full px-6 py-4 outline-none focus:border-gold-premium font-sans text-sm" placeholder="votre@email.com" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Message</label>
                                        <textarea id="inp3" rows="5" required className="w-full bg-input-bg border border-gray-100 rounded-[20px] px-6 py-5 outline-none focus:border-gold-premium font-sans text-sm resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                    </div>
                                </div>

                                {/* CASE RGPD */}
                                <div className="flex items-start gap-4 mb-10 animate-fadeIn">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="rgpd"
                                            type="checkbox"
                                            checked={rgpdAccepted}
                                            onChange={(e) => setRgpdAccepted(e.target.checked)}
                                            required
                                            className="w-4 h-4 accent-gold-premium cursor-pointer"
                                        />
                                    </div>
                                    <label htmlFor="rgpd" className="text-[14px] text-gray-400 font-sans leading-relaxed italic cursor-pointer">
                                        J'accepte que mes données soient utilisées par **CafThé** pour traiter ma demande. Conformément au RGPD, vous disposez d'un droit d'accès et de suppression.
                                    </label>
                                </div>

                                <div className="pt-10 border-t border-gray-200 flex justify-center ">
                                    <ButtonGold
                                       aria-label="Envoyer le message"
                                        type="submit"
                                        disabled={!rgpdAccepted}
                                        className={!rgpdAccepted ? "opacity-50 cursor-not-allowed" : ""}
                                    >
                                        <Send size={16} />
                                        Envoyer le message
                                    </ButtonGold>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
    );
};

export default Contact;