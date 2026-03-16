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

    const navLinkContainer = "group relative flex items-center gap-1 text-gold-premium no-underline font-forum uppercase tracking-[0.2em] text-[15px] text-sm  cursor-pointer transition-all duration-300";
    const textHoverClass = "group-hover:underline decoration-1 underline-offset-8 transition-all";
    const popupClass = "absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] border border-gold-premium/20 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-5 flex flex-col gap-4 normal-case tracking-normal rounded-lg mt-2 ";

    return (
        <header className="z-50 w-full bg-white dark:bg-black font-forum transition-colors duration-300 border-b border-gold-premium/10">
            {/* --- MOBILE BAR --- */}
            <div className="lg:hidden flex justify-between items-center px-6 py-4 relative z-50 bg-white dark:bg-black">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gold-premium dark:text-silver-shine"
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <Link to="/"><img src="/images/Logo-vf.svg" alt="Logo" className="h-10 w-auto " /></Link>
                <Link to="/panier" className="text-gold-premium dark:text-silver-shine relative" aria-label={`Voir mon panier (${cartCount} articles)`}>
                    <ShoppingBag size={24} />
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </Link>
            </div>

            {/* --- MENU MOBILE DÉROULANT (AJOUTÉ ICI) --- */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-black transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl  tracking-[0.3em] uppercase font-forum">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gold-premium  dark:text-silver-shine hover:text-black dark:hover:text-gold-premium ">Accueil</Link>
                    <Link to="/boutique" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">Boutique</Link>
                    <Link to="/Abonnement" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">Abonnement</Link>
                    <Link to="/Abonnement" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">Espace client</Link>
                    <Link to="/EspaceClient" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">Panier</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">Contact</Link>
                    <Link to="/A-propos" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium">A propos</Link>
                    <div className="pt-4">
                        <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-sm border border-gold-premium dark:border-silver-shine px-6 py-2 text-gold-premium dark:text-silver-shine">DÉCONNEXION</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm border border-gold-premium px-6 py-2 text-gold-premium dark:border-silver-shine px-6 py-2 text-gold-premium dark:text-silver-shine">CONNEXION</Link>
                    )}
                </nav>
            </div>

            {/* --- DESKTOP --- */}
            <nav className="hidden lg:block w-full">
                <div className="max-w-360 mx-auto flex flex-col pt-4 px-10">

                    {/* 1. TOP BAR */}
                    <div className="flex justify-between items-center mb-6 h-8 text-gold-premium dark:text-silver-shine">
                        <div className="flex items-center gap-2 border-b border-gold-premium/30 pb-1 dark:border-b-silver-shine">
                            <Search size={16} />
                            <label htmlFor="inp1" className="sr-only">Rechercher un produit</label>
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
                                    <span className="text-[16px] tracking-widest uppercase">Bonjour, {user?.prenom || "Client"}</span>
                                    <LogOut size={18} className="cursor-pointer hover:opacity-60" onClick={logout} />
                                </div>
                            ) : (
                                <Link to="/login" className="hover:opacity-60 text-gold-premium dark:text-silver-shine"><User size={22} /></Link>
                            )}
                            <Link to="/panier" className={`text-gold-premium dark:text-silver-shine relative transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                                <ShoppingBag size={22} />
                                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">{cartCount}</span>}
                            </Link>
                        </div>
                    </div>

                    {/* 2. LOGO & TRAITS */}
                    <div className="flex items-center justify-center w-full h-32 overflow-hidden">
                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                        <div className="px-10 flex-none flex items-center justify-center">
                            <Link to="/"><img src="/images/LLogo-vf 1.svg" loading="lazy"  alt="Logo" className="h-28 w-auto block " /></Link>
                        </div>
                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                    </div>

                    {/* 3. MENUS DESKTOP */}
                    <div className="relative z-10 -mt-18 flex justify-between items-center w-full pb-10">
                        <div className="flex-1 flex justify-end gap-12 pr-12">
                            <div className={navLinkContainer}>
                                <Link to="/boutique" className="no-underline text-inherit "><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>boutique</span></Link>
                                <ChevronDown size={14} className="opacity-50" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`}>
                                    <HashLink smooth to="/boutique#cafes" className="text-gold-premium  dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos Cafés</HashLink>
                                    <HashLink smooth to="/boutique#thes" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos Thés</HashLink>
                                    <HashLink smooth to="/boutique#accessoire" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos accessoires</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/espace-client" className="no-underline text-inherit"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${textHoverClass}`}>espace client</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`}>
                                    <HashLink smooth to="/espace-client#orders" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium text-xs tracking-widest uppercase">Mes achats</HashLink>
                                    <HashLink smooth to="/espace-client#profile" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Mon profil</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/Abonnement" className="no-underline text-inherit"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${textHoverClass}`}>abonnement</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                            </div>
                        </div>

                        <div className="w-40 flex-none"></div>

                        <div className="flex-1 flex justify-start gap-12 pl-12">
                            <div className={navLinkContainer}>
                                <Link to="/panier" className="no-underline text-inherit"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${textHoverClass}`}>panier</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`}>
                                    <HashLink smooth to="/checkout" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">checkout</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/contact" className="no-underline text-inherit"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${textHoverClass}`}>contact</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/A-Propos" className="no-underline text-inherit"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${textHoverClass}`}>à propos</span></Link>
                                <ChevronDown size={14} className="opacity-30" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`}>
                                    <HashLink smooth to="/A-Propos#action" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos actions</HashLink>
                                    <HashLink smooth to="/A-propos#partenaire" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos partenaires</HashLink>
                                    <HashLink smooth to="/A-propos#label" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase">Nos labels</HashLink>
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