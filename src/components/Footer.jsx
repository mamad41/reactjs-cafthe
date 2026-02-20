import React from 'react';
import { ShieldCheck, Truck, Phone, CreditCard, Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import ButtonGold from "./ButtonGold.jsx";

const Footer = () => {
    const iconColor = "#C5A059";
    const textColor = "#8B6B3F";

    return (
        <footer className="bg-[#FDFCF7] font-forum border-t-2 border-[#C5A05933] px-6 py-12 lg:px-20 lg:py-16">

            {/* --- 1. SERVICES --- */}
            <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0 mb-12 pb-8 border-b-3 border-[#C5A05933]">
                <div className="flex flex-col items-center text-center flex-1">
                    <ShieldCheck color={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Paiement Sécurisé</span>
                    <span className="text-[#C5A059] text-base lg:text-lg italic mt-1">Mastercard, Visa, Paypal</span>
                </div>
                <div className="hidden lg:block h-12 w-[3px] bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <Truck color={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Livraison Offerte</span>
                    <span className="text-[#C5A059] text-base lg:text-lg italic mt-1">À partir de 50€ d'achat</span>
                </div>
                <div className="hidden lg:block h-12 w-[3px] bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <Phone color={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Service Client</span>
                    <span className="text-[#C5A059] text-base lg:text-lg italic mt-1">01 02 03 04 05</span>
                </div>
                <div className="hidden lg:block h-12 w-[3px] bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <CreditCard color={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Paiement en 4 fois</span>
                    <span className="text-[#C5A059] text-base lg:text-lg italic mt-1">Avec Paypal</span>
                </div>
            </div>

            {/* --- 2. LIENS (Correction grid-cols-1 pour mobile) --- */}
            {/* On utilise grid-cols-1 par défaut pour éviter la superposition des textes longs.
                On passe à grid-cols-2 sur 'sm' (tablette portrait) et flex sur 'lg'.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 mb-12">
                <div className="flex flex-col gap-3">
                    <h4 className="text-[#C5A059] text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Catalogue <ChevronDown size={14} /></h4>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Café du monde</a>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Thé du monde</a>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Accessoires</a>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-[#C5A059] text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Environnement <ChevronDown size={14} /></h4>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Nos actions</a>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Nos partenaires</a>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-[#C5A059] text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Plus d'infos <ChevronDown size={14} /></h4>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">Nous contacter</a>
                    <a href="#" className="text-[#8B6B3F] no-underline opacity-80 hover:opacity-100 transition-opacity">CGV</a>
                </div>

                {/* RÉSEAUX SOCIAUX & FAQ */}
                <div className="sm:col-span-2 lg:col-span-1 text-center lg:text-right mt-6 lg:mt-0">
                    <div className="flex gap-6 justify-center lg:justify-end mb-6">
                        <Facebook size={24} color={iconColor} className="cursor-pointer hover:scale-110 transition-transform" />
                        <Twitter size={24} color={iconColor} className="cursor-pointer hover:scale-110 transition-transform" />
                        <Instagram size={24} color={iconColor} className="cursor-pointer hover:scale-110 transition-transform" />
                        <Linkedin size={24} color={iconColor} className="cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                    <ButtonGold className="bg-[#634832] text-white px-8 py-3 rounded uppercase tracking-widest text-sm">
                        Notre FAQ
                    </ButtonGold>
                </div>
            </div>

            {/* --- 3. BLOC MARQUE FINAL --- */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 border-t-3 border-[#C5A05933] pt-12">
                <img
                    src="/images/logo-simple.svg"
                    alt="Logo Cafthe"
                    className="h-24 lg:h-48 opacity-80"
                />
                <div className="text-center lg:text-left">
                    <h3 className="text-[#C5A059] text-3xl mb-4 uppercase tracking-widest">CafThé</h3>
                    <p className="text-[#8B6B3F] text-lg lg:text-xl max-w-2xl leading-relaxed opacity-90 italic">
                        L'Artisan des Terroirs. Passionnés par l'excellence, nous sélectionnons les meilleurs cafés de spécialité et thés rares à travers le monde.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;