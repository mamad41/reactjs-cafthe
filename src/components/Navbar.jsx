import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "../context/CardContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Search, User, ShoppingBag, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CardContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartCount > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== "") {
            navigate(`/recherche?query=${searchTerm}`);
            setIsMenuOpen(false);
        }
    };

    const navLinkContainer = "group relative flex items-center gap-1 text-gold-premium no-underline font-forum uppercase tracking-[0.2em] text-sm cursor-pointer transition-all duration-300";
    const textHoverClass = "group-hover:underline decoration-1 underline-offset-8 transition-all";
    const popupClass = "absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-white  border border-gold-premium/20 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300  p-5 flex flex-col gap-4 normal-case tracking-normal rounded-lg mt-2 ";

    return (
        <header className="z 50 w-full bg-white dark:bg-black font-forum transition-colors duration-300 border-b border-gold-premium/10">
            {/* --- MOBILE --- */}
            <div className="lg:hidden flex justify-between items-center px-6 py-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gold-premium">
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <Link to="/"><img src="/images/CAFV4 logo.svg" alt="Logo" className="h-10 w-auto dark:invert" /></Link>
                <Link to="/panier" className="text-gold-premium relative">
                    <ShoppingBag size={24} />
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </Link>
            </div>

            {/* --- DESKTOP --- */}
            <nav className="hidden lg:block w-full">
                <div className="max-w-360 mx-auto flex flex-col pt-4 px-10">

                    {/* 1. TOP BAR */}
                    <div className="flex justify-between items-center mb-6 h-8 text-gold-premium">
                        <div className="flex items-center gap-2 border-b border-gold-premium/30 pb-1 dark:border-b-silver-shine">
                            <Search size={16} />
                            <input id="inp1"
                                   type="text"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   onKeyDown={handleSearch}
                                   placeholder="RECHERCHE"
                                   className="bg-transparent border-none outline-none text-[11px] tracking-[2px] w-32 placeholder:text-gold-premium/50 dark:placeholder:text-silver-text"
                            />
                        </div>

                        <div className="flex items-center gap-8">
                            <ThemeToggle />
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] tracking-widest uppercase">Bonjour, {user?.prenom || "Client"}</span>
                                    <LogOut size={18} className="cursor-pointer hover:opacity-60" onClick={logout} />
                                </div>
                            ) : (
                                <Link to="/login" className="hover:opacity-60 text-gold-premium"><User size={22} /></Link>
                            )}
                            <Link to="/panier" className={`text-gold-premium relative transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                                <ShoppingBag size={22} />
                                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">{cartCount}</span>}
                            </Link>
                        </div>
                    </div>

                    {/* 2. LOGO & TRAITS (TRAITS REMONTÉS) */}

                    <div className="flex items-center justify-center w-full h-32 overflow-hidden">



                        {/* Trait Gauche (Position relative pour monter) */}

                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                        <div className="px-10 flex-none flex items-center justify-center">
                            <Link to="/"><img src="/images/LLogo-vf 1.svg" alt="Logo" className="h-28 w-auto block " /></Link>
                        </div>
                        {/* Trait Droite (Position relative pour monter) */}
                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                    </div>

                    {/* 3. MENUS */}
                    <div className="relative z-10 -mt-18 flex justify-between items-center w-full pb-10">
                        {/* Groupe Gauche */}
                        <div className="flex-1 flex justify-end gap-12 pr-12">
                            {/* BOUTIQUE */}
                            <div className={navLinkContainer}>
                                <Link to="/boutique" className="no-underline text-inherit"><span className={textHoverClass}>boutique</span></Link>
                                <ChevronDown size={14} className="opacity-50" />
                                <div className={popupClass}>
                                    <HashLink smooth to="/boutique#cafes" className="text-gold-premium hover:text-black no-underline text-xs tracking-widest uppercase">Nos Cafés</HashLink>
                                    <HashLink smooth to="/boutique#thes" className="text-gold-premium hover:text-black  no-underline text-xs tracking-widest uppercase">Nos Thés</HashLink>
                                    <HashLink smooth to="/boutique#accessoire" className="text-gold-premium hover:text-black  no-underline text-xs tracking-widest uppercase">Nos accessoires</HashLink>
                                </div>
                            </div>
                            {/* ESPACE CLIENT */}
                            <div className={navLinkContainer}>
                                <Link to="/espace-client" className="no-underline text-inherit"><span className={textHoverClass}>espace client</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div id="qpl" className={popupClass}>
                                    <HashLink smooth to="/espace-client#orders" className="text-gold-premium hover:text-black text-xs tracking-widest uppercase">Mes achats</HashLink>
                                    <HashLink smooth to="/espace-client#profile" className="text-gold-premium hover:text-black  no-underline text-xs tracking-widest uppercase">Mon profil</HashLink>
                                </div>
                            </div>
                            {/* ABONNEMENT */}
                            <div className={navLinkContainer}>
                                <Link to="/Abonnement" className="no-underline text-inherit"><span className={textHoverClass}>abonnement</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                            </div>
                        </div>

                        <div className="w-40 flex-none"></div>

                        {/* Groupe Droite */}
                        <div className="flex-1 flex justify-start gap-12 pl-12">
                            {/* PANIER */}
                            <div className={navLinkContainer}>
                                <Link to="/panier" className="no-underline text-inherit"><span className={textHoverClass}>panier</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div className={popupClass}>
                                    <HashLink smooth to="/checkout" className="text-gold-premium hover:text-black dark:hover:text-white no-underline text-xs tracking-widest uppercase">checkout</HashLink>
                                </div>
                            </div>
                            {/* CONTACT */}
                            <div className={navLinkContainer}>
                                <Link to="/contact" className="no-underline text-inherit"><span className={textHoverClass}>contact</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                            </div>
                            {/* À PROPOS */}
                            <div className={navLinkContainer}>
                                <Link to="/A-Propos" className="no-underline text-inherit"><span className={textHoverClass}>à propos</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div className={popupClass}>
                                <HashLink smooth to="/A-Propos#action" className="text-gold-premium hover:text-black dark:hover:text-white no-underline text-xs tracking-widest uppercase">Nos actions</HashLink>
                                <HashLink smooth to="/A-propos#partenaire" className="text-gold-premium hover:text-black dark:hover:text-white no-underline text-xs tracking-widest uppercase">Nos partenaires</HashLink>
                                <HashLink smooth to="/A-propos#label" className="text-gold-premium hover:text-black dark:hover:text-white no-underline text-xs tracking-widest uppercase">Nos labels</HashLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;