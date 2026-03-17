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

    const navLinkContainer = "group relative flex items-center gap-1 text-gold-premium no-underline font-style-script capitalize tracking-[0.05em] text-2xl cursor-pointer transition-all duration-300";
    const textHoverClass = "group-hover:underline decoration-1 underline-offset-8 transition-all";
    const popupClass = "absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] border border-gold-premium/20 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-5 flex flex-col gap-4 normal-case tracking-normal rounded-lg mt-2 font-forum uppercase";

    return (
        <header className="z-50 w-full bg-white dark:bg-black font-forum transition-colors duration-300 border-b border-gold-premium/10">
            {/* --- MOBILE BAR --- */}
            <div className="lg:hidden flex justify-between items-center px-6 py-4 relative z-50 bg-white dark:bg-black">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gold-premium dark:text-silver-shine"
                        aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}>
                    {isMenuOpen ? <X size={28} aria-label="Fermer le menu de navigation" /> : <Menu size={28} aria-label="Ouvrir le menu de navigation" />}
                </button>
                <Link to="/" aria-label="Aller à l'accueil"><img src="/images/Logo-vf.svg" alt="Logo CafThé" className="h-10 w-auto " /></Link>
                <Link to="/panier" className="text-gold-premium dark:text-silver-shine relative" aria-label={`Voir mon panier, ${cartCount} articles ajoutés`}>
                    <ShoppingBag size={24} aria-label="Panier" />
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </Link>
            </div>

            {/* --- MENU MOBILE DÉROULANT (AJOUTÉ ICI) --- */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-black transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <nav className="flex flex-col items-center justify-center h-full gap-8 text-3xl font-style-script tracking-wide capitalize" aria-label="Menu principal de navigation mobile">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gold-premium  dark:text-silver-shine hover:text-black dark:hover:text-gold-premium " aria-label="Naviguer vers l'accueil">Accueil</Link>
                    <Link to="/boutique" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="Naviguer vers la boutique">Boutique</Link>
                    <Link to="/Abonnement" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="Découvrir nos offres d'abonnement">Abonnement</Link>
                    <Link to="/EspaceClient" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="Accéder à votre espace client">Espace client</Link>
                    <Link to="/panier" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="Consulter votre panier d'achats">Panier</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="Accéder à la page de contact">Contact</Link>
                    <Link to="/A-propos" onClick={() => setIsMenuOpen(false)} className="text-gold-premium dark:text-silver-shine hover:text-black dark:hover:text-gold-premium" aria-label="En savoir plus sur notre entreprise">A propos</Link>
                    <div className="pt-4" aria-label="Basculer le thème">
                        <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-xl font-forum uppercase tracking-widest border border-gold-premium dark:border-silver-shine px-6 py-2 text-gold-premium dark:text-silver-shine mt-4" aria-label="Se déconnecter de votre compte">DÉCONNEXION</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-forum uppercase tracking-widest border border-gold-premium px-6 py-2 text-gold-premium dark:border-silver-shine px-6 py-2 text-gold-premium dark:text-silver-shine mt-4" aria-label="Se connecter à votre compte">CONNEXION</Link>
                    )}
                </nav>
            </div>

            {/* --- DESKTOP --- */}
            <nav className="hidden lg:block w-full" aria-label="Menu principal">
                <div className="max-w-360 mx-auto flex flex-col pt-4 px-10">

                    {/* 1. TOP BAR */}
                    <div className="flex justify-between items-center mb-6 h-8 text-gold-premium dark:text-silver-shine">
                        <div className="flex items-center gap-2 border-b border-gold-premium/30 pb-1 dark:border-b-silver-shine">
                            <Search size={16} aria-label="barre de recherche" />
                            <label htmlFor="inp1" className="sr-only">Rechercher un produit</label>
                            <input id="inp1"
                                   type="text"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   onKeyDown={handleSearch}
                                   placeholder="RECHERCHE"
                                   aria-label="Champ de recherche de produits"
                                   className="bg-transparent border-none outline-none text-[11px] tracking-[2px] w-32 placeholder:text-gold-premium/50 dark:placeholder:text-silver-text font-forum uppercase"
                            />
                        </div>

                        <div className="flex items-center gap-8">
                            <div aria-label="Bouton basculer de thème">
                                <ThemeToggle />
                            </div>
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3 font-forum">
                                    <span className="text-[16px] tracking-widest uppercase" aria-label={`Connecté en tant que ${user?.prenom || "Client"}`}>Bonjour, {user?.prenom || "Client"}</span>
                                    <button aria-label="Se déconnecter" onClick={logout} className="cursor-pointer hover:opacity-60 flex items-center">
                                        <LogOut size={18} aria-label="Se déconnecter" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="hover:opacity-60 text-gold-premium dark:text-silver-shine" aria-label="Page de connexion"><User size={22} aria-hidden="true" /></Link>
                            )}
                            <Link to="/panier" className={`text-gold-premium dark:text-silver-shine relative transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`} aria-label={`Consulter le panier, ${cartCount} articles ajoutés`}>
                                <ShoppingBag size={22} aria-label="Panier" />
                                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#634832] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold font-sans">{cartCount}</span>}
                            </Link>
                        </div>
                    </div>

                    {/* 2. LOGO & TRAITS */}
                    <div className="flex items-center justify-center w-full h-32 overflow-hidden">
                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                        <div className="px-10 flex-none flex items-center justify-center">
                            <Link to="/" aria-label="Retourner à l'accueil"><img src="/images/LLogo-vf 1.svg" loading="lazy"  alt="Logo principal CafThé" className="h-28 w-auto block " /></Link>
                        </div>
                        <div className="flex-1 flex items-center relative" style={{ top: '-30px' }}>
                            <div className="w-full h-px bg-gold-premium opacity-40 dark:bg-silver-shine"></div>
                        </div>
                    </div>

                    {/* 3. MENUS DESKTOP */}
                    <div className="relative z-10 -mt-18 flex justify-between items-center w-full pb-10">
                        <div className="flex-1 flex justify-end gap-12 pr-12">
                            <div className={navLinkContainer}>
                                <Link to="/boutique" className="no-underline text-inherit " aria-label="Voir notre boutique"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>Boutique</span></Link>
                                <ChevronDown size={14} className="opacity-50" aria-hidden="true" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`} aria-label="Sous-menu Boutique">
                                    <HashLink smooth to="/boutique#cafes" className="text-gold-premium  dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir la section de nos cafés">Nos Cafés</HashLink>
                                    <HashLink smooth to="/boutique#thes" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir la section de nos thés">Nos Thés</HashLink>
                                    <HashLink smooth to="/boutique#accessoire" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir la section de nos accessoires">Nos accessoires</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/espace-client" className="no-underline text-inherit" aria-label="Accéder à l'espace client"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>Espace client</span></Link>
                                <ChevronDown size={14} className="opacity-30" aria-hidden="true" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`} aria-label="Sous-menu Espace client">
                                    <HashLink smooth to="/espace-client#orders" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium text-xs tracking-widest uppercase" aria-label="Voir la page de mes achats">Mes achats</HashLink>
                                    <HashLink smooth to="/espace-client#profile" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir mon profil client">Mon profil</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/Abonnement" className="no-underline text-inherit" aria-label="Découvrir nos abonnements"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>Abonnement</span></Link>
                                <ChevronDown size={14} className="opacity-30" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="w-40 flex-none" aria-hidden="true"></div>

                        <div className="flex-1 flex justify-start gap-12 pl-12">
                            <div className={navLinkContainer}>
                                <Link to="/panier" className="no-underline text-inherit" aria-label="Aller à la page du panier"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>Panier</span></Link>
                                <ChevronDown size={14} className="opacity-30" aria-hidden="true" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`} aria-label="Sous-menu Panier">
                                    <HashLink smooth to="/checkout" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Passer à la caisse">checkout</HashLink>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/contact" className="no-underline text-inherit" aria-label="Nous contacter via le formulaire"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>Contact</span></Link>
                                <ChevronDown size={14} className="opacity-30" aria-hidden="true" />
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/A-Propos" className="no-underline text-inherit" aria-label="Aller à la page À propos"><span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${textHoverClass}`}>À propos</span></Link>
                                <ChevronDown size={14} className="opacity-30" aria-hidden="true" />
                                <div className={`bg-white dark:bg-surface-dark ${popupClass}`} aria-label="Sous-menu À propos">
                                    <HashLink smooth to="/A-Propos#action" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir nos actions">Nos actions</HashLink>
                                    <HashLink smooth to="/A-propos#partenaire" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir nos partenaires">Nos partenaires</HashLink>
                                    <HashLink smooth to="/A-propos#label" className="text-gold-premium dark:text-silver-text hover:text-black dark:hover:text-gold-premium no-underline text-xs tracking-widest uppercase" aria-label="Voir nos labels de qualité">Nos labels</HashLink>
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