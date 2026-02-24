import React from 'react';
import { ShieldCheck, Truck, Phone, CreditCard, Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import ButtonGold from "./ButtonGold.jsx";
import {HashLink} from "react-router-hash-link";


const Footer = () => {
    const iconColor = "text-gold-premium dark:text-silver-text";
    // Récupération automatique de l'année en cours
    const currentYear = new Date().getFullYear();


    return (
        <footer className="bg-input-bg font-forum border-t-2 border-[#C5A05933] px-6 py-12 lg:px-20 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 border-t-3 border-[#C5A05933] pt-12">
                <img
                    src="/images/logo-simple.svg"
                    alt="Logo Cafthe"
                    className="h-24 lg:h-48 opacity-80 "
                />
                <div className="text-center lg:text-left">
                    <h3 className="text-gold-premium text-3xl mb-4 uppercase tracking-widest">CafThé</h3>
                    <p className="text-[#8B6B3F] text-lg lg:text-xl max-w-2xl leading-relaxed opacity-90 italic">
                        L'Artisan des Terroirs. Passionnés par l'excellence, nous sélectionnons les meilleurs cafés de spécialité et thés rares à travers le monde.
                    </p>
                </div>
            </div>
            {/* --- 1. SERVICES --- */}
            <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0 mb-12 pb-8 border-b-3 border-[#C5A05933]">
                <div className="flex flex-col items-center text-center flex-1">
                    <ShieldCheck className={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Paiement Sécurisé</span>
                    <span className="text-gold-premium text-base lg:text-lg italic mt-1">Mastercard, Visa, Paypal</span>
                </div>
                <div className="hidden lg:block h-12 w-0.75 bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <Truck className={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Livraison Offerte</span>
                    <span className="text-gold-premium text-base lg:text-lg italic mt-1">À partir de 50€ d'achat</span>
                </div>
                <div className="hidden lg:block h-12 w-0.75 bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <Phone className={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Service Client</span>
                    <span className="text-gold-premium text-base lg:text-lg italic mt-1">01 02 03 04 05</span>
                </div>
                <div className="hidden lg:block h-12 w-0.75 bg-[#C5A05933] self-center"></div>
                <div className="flex flex-col items-center text-center flex-1">
                    <CreditCard className={iconColor} size={32} />
                    <span className="text-[#8B6B3F] uppercase text-xl lg:text-2xl font-bold tracking-wider mt-3">Paiement en 4 fois</span>
                    <span className="text-gold-premium text-base lg:text-lg italic mt-1">Avec Paypal</span>
                </div>
            </div>

            {/* --- 2. LIENS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 mb-12">
                <div className="flex flex-col gap-3">
                    <h4 className="text-gold-premium dark:text-silver-shine text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Boutique </h4>
                    <HashLink smooth to="/boutique#cafes" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Café du monde</HashLink>
                    <HashLink smooth to="/boutique#thes" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Thé du monde</HashLink>
                    <HashLink smooth to="/boutique#Accessoires" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Accessoires</HashLink>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-gold-premium dark:text-silver-shine text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Environnement </h4>
                    <HashLink smooth to="/A-Propos#action" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Nos actions</HashLink>
                    <HashLink smooth to="/A-propos#partenaire" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Nos partenaires</HashLink>
                    <HashLink smooth to="/A-propos#label" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Nos label</HashLink>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-gold-premium dark:text-silver-shine text-lg lg:text-xl flex items-center gap-2 mb-2 uppercase">Plus d'infos </h4>
                    <HashLink smooth to="/contact#form" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Nous contacter</HashLink>
                    <HashLink smooth to="/Cgv#cgv" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Conditions Générales de Vente</HashLink>
                    <HashLink smooth to="/sitemap#smp" className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase font-bold">Plan du site</HashLink>
                </div>

                {/* RÉSEAUX SOCIAUX & FAQ */}
                <div className="sm:col-span-2 lg:col-span-1 text-center lg:text-right mt-6 lg:mt-0">
                    <div className="flex gap-6 justify-center lg:justify-end mb-6">
                        <Facebook size={24} className={`${iconColor} cursor-pointer hover:scale-110 transition-transform`} />
                        <Twitter size={24} className={`${iconColor} cursor-pointer hover:scale-110 transition-transform`} />
                        <Instagram size={24} className={`${iconColor} cursor-pointer hover:scale-110 transition-transform`} />
                        <Linkedin size={24} className={`${iconColor} cursor-pointer hover:scale-110 transition-transform`} />
                    </div>
                    <HashLink smooth to="/FAQ#Faq">
                        <ButtonGold className="bg-[#634832] dark:bg-silver-card text-white dark:text-silver-text px-8 py-3 rounded uppercase tracking-widest text-sm">
                            Notre FAQ
                        </ButtonGold>
                    </HashLink>
                </div>
            </div>

            {/* --- 3. COPYRIGHT --- */}
            <div className="border-t border-[#C5A05933] pt-8 text-center">
                <p className="text-[#8B6B3F] text-[10px] lg:text-xs tracking-[3px] uppercase opacity-70">
                    © {currentYear} CafThé Artisan des Terroirs. Tous droits réservés.
                </p>
                <p className="text-[#8B6B3F] text-[10px] lg:text-xs tracking-[3px]  opacity-70">Toutes les photos disponibles sur le site CafThé ont été créées par intelligence artificielle.</p>
            </div>

        </footer>
    );
};

export default Footer;