import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ButtonGold from "../components/ButtonGold.jsx";

const Contact = () => {
    return (
        <div className="bg-[#FDFCF7] min-h-screen py-20 px-4 sm:px-10 font-forum">
            {/* --- HEADER --- */}
            <header className="max-w-[1200px] mx-auto mb-20 text-center">
                <h1 className="text-[#C5A059] text-3xl md:text-5xl uppercase tracking-[0.3em] mb-6">
                    Contactez-nous
                </h1>
                <div className="h-[1px] w-32 bg-[#C5A059] mx-auto block opacity-50"></div>
            </header>

            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* --- COLONNE GAUCHE : INFOS (5/12) --- */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl uppercase tracking-widest text-[#333]">Nos Coordonnées</h2>
                            <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-md">
                                Une question sur nos crus ou besoin d'un conseil pour votre abonnement ?
                                Notre équipe d'experts est à votre entière disposition.
                            </p>
                        </div>

                        <div className="space-y-10">
                            {/* Bloc Email */}
                            <div className="flex items-center gap-6 group">
                                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center
                                justify-center transition-colors group-hover:border-[#C5A059]">
                                    <Mail className="text-[#C5A059]" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Email</h4>
                                    <p className="text-[#634832] font-sans font-medium">contact@cafethé.fr</p>
                                </div>
                            </div>

                            {/* Bloc Téléphone */}
                            <div className="flex items-center gap-6 group">
                                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center
                                 justify-center transition-colors group-hover:border-[#C5A059]">
                                    <Phone className="text-[#C5A059]" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Téléphone</h4>
                                    <p className="text-[#634832] font-sans font-medium">01 23 45 67 89</p>
                                </div>
                            </div>

                            {/* Bloc Adresse */}
                            <div className="flex items-center gap-6 group">
                                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center
                                 justify-center transition-colors group-hover:border-[#C5A059]">
                                    <MapPin className="text-[#C5A059]" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Atelier & Boutique</h4>
                                    <p className="text-[#634832] font-sans font-medium">15 Rue de l'Artisanat, Paris</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- COLONNE DROITE : FORMULAIRE --- */}
                    <div className="lg:col-span-7 w-full h-full"> {/* Assure-toi qu'il n'y a pas de pb-32 ici qui fausse la vue */}

                        {/* 1. On ajoute un gros padding en bas (pb-20) pour forcer le vide sous le bouton */}
                        <div className="bg-white rounded-[20px] p-8 md:p-14 pb-20 shadow-sm border border-gray-100 box-border h-full">
                            <h3 className="text-2xl font-forum uppercase mb-10 text-[#333] text-center lg:text-left">Écrivez-nous</h3>

                            <form className="mx-auto flex flex-col h-full max-w-[800px]">

                                {/* 2. On groupe les inputs dans une div avec une marge en bas */}
                                <div className="space-y-7 mb-16">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Nom</label>
                                            <input type="text" className="w-full bg-[#FDFCF7] border border-gray-100 rounded-full px-6 py-4 outline-none
                                            focus:border-[#C5A059] font-sans text-sm" placeholder="Votre nom" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Prénom</label>
                                            <input type="text" className="w-full bg-[#FDFCF7] border border-gray-100 rounded-full px-6 py-4 outline-none
                                            focus:border-[#C5A059] font-sans text-sm" placeholder="Votre prénom" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Email</label>
                                        <input type="email" className="w-full bg-[#FDFCF7] border border-gray-100 rounded-full px-6 py-4 outline-none
                                        focus:border-[#C5A059] font-sans text-sm" placeholder="votre@email.com" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest ml-4 text-gray-400 font-bold">Message</label>
                                        <textarea rows="5" className="w-full bg-[#FDFCF7] border border-gray-100 rounded-[20px] px-6 py-5 outline-none
                                        focus:border-[#C5A059] font-sans text-sm resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                    </div>
                                </div>

                                {/* 3. LE BOUTON : On utilise mt-auto pour le pousser si besoin, mais surtout pt-10 pour l'espace */}
                                <div className="pt-10 border-t border-gray-100 flex justify-center mt-auto">
                                    <ButtonGold >
                                        <Send size={16} />
                                        Envoyer le message
                                    </ButtonGold>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;