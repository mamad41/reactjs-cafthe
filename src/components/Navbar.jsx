import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "../context/CardContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Search, User, ShoppingBag, ChevronDown, LogOut } from 'lucide-react';

function Navbar() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CardContext); // Assure-toi que cartCount est bien dans ton Context
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Déclenchement de l'animation au changement du panier
    useEffect(() => {
        if (cartCount === 0) return;
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [cartCount]);

    const navLinkContainer = "group relative flex items-center gap-1 text-[#C5A059]" +
        " no-underline font-forum uppercase tracking-[0.2em] text-sm cursor-pointer px-6 py-2 " +
        "transition-all duration-300 rounded-t-lg border border-transparent group-hover:bg-[#FDFCF7]" +
        " group-hover:border-[#C5A05933] group-hover:border-b-transparent";

    const popupClass = "absolute top-[100%] left-0 min-w-full w-max bg-[#FDFCF7] border border-[#C5A05933]" +
        " shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all " +
        "duration-300 z-50 p-5 flex flex-col gap-4 normal-case tracking-normal rounded-b-lg rounded-tr-lg";

    const textHoverClass = "group-hover:underline decoration-1 underline-offset-8 transition-all ";

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== "") {
            navigate(`/recherche?query=${searchTerm}`);
        }
    };

    return (
        <header>
            <nav style={{ width: '100vw', backgroundColor: 'white', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', padding: '5px 0' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0px' }}>

                    {/* 1. LIGNE DU HAUT : Recherche et Icones */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 60px', marginBottom: '0px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C5A059', borderBottom: '1px solid #C5A05944', paddingBottom: '2px' }}>
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="RECHERCHE"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{ background: 'none', border: 'none', outline: 'none', color: '#C5A059', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Forum', width: '120px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                            {isAuthenticated ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#C5A059', fontFamily: 'Forum' }}>
                                <span style={{ fontSize: '12px', letterSpacing: '1px' }}>
                                    BONJOUR, {user?.prenom || user?.name || "CLIENT"}
                                </span>
                                    <LogOut size={18} onClick={logout} style={{ cursor: 'pointer' }} />
                                </div>
                            ) : (
                                <Link to="/login" style={{ color: '#C5A059' }}><User size={22} /></Link>
                            )}

                            {/* SECTION PANIER AVEC BADGE */}
                            <Link to="/panier" style={{ color: '#C5A059', position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <div style={{
                                    transition: 'transform 0.3s ease',
                                    transform: isAnimating ? 'scale(1.3)' : 'scale(1)'
                                }}>
                                    <ShoppingBag size={22} />
                                </div>
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#634832',
                                        color: 'white', fontSize: '10px', fontWeight: 'bold', width: '18px', height: '18px',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white'
                                    }}>
                                    {cartCount}
                                </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* 2. LIGNE DU MILIEU : Traits et Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '-5px' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#C5A059', marginLeft: '40px', marginBottom: '35px' }}></div>
                        <Link to="/" style={{ textDecoration: 'none', padding: '0 15px' }}>
                            <img src="/images/CAFV4 logo.svg" alt="Logo" style={{ height: '70px', width: 'auto', display: 'block' }} />
                        </Link>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#C5A059', marginRight: '40px', marginBottom: '35px' }}></div>
                    </div>

                    {/* 3. LIGNE DU BAS : Menus avec Pop-up et Chevrons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 80px', marginTop: '-20px' }}>

                        {/* BLOC GAUCHE */}
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div className={navLinkContainer}>
                                <Link to="/boutique" className="no-underline text-inherit"><span className={textHoverClass}>boutique</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/boutique#cafes" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs tracking-widest">Nos Cafés</Link>
                                    <Link to="/boutique#thes" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs tracking-widest">Nos Thés</Link>
                                    <Link to="/boutique#thes" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs tracking-widest">Nos Accéssoires</Link>
                                    <Link to="/boutique#promo" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs tracking-widest">Promotions</Link>
                                </div>
                            </div>

                            <div className={navLinkContainer}>
                                <Link to="/espace-client" className="no-underline text-inherit"><span className={textHoverClass}>espace client</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/profil#commandes" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Mes Commandes</Link>
                                    <Link to="/profil#infos" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Mes Informations</Link>
                                </div>
                            </div>

                            <div className={navLinkContainer}>
                                <Link to="/Abonnement" className="no-underline text-inherit"><span className={textHoverClass}>Abonnement</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/profil#commandes" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Mes Commandes</Link>
                                    <Link to="/profil#infos" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Mes Informations</Link>
                                </div>
                            </div>
                        </div>

                        {/* BLOC DROITE */}
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div className={navLinkContainer}>
                                <Link to="/panier" className="no-underline text-inherit"><span className={textHoverClass}>panier</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/panier" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Voir mon panier</Link>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/contact" className="no-underline text-inherit"><span className={textHoverClass}>contact</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/contact" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Nous écrire</Link>
                                </div>
                            </div>
                            <div className={navLinkContainer}>
                                <Link to="/A-Propos" className="no-underline text-inherit"><span className={textHoverClass}>A Propos</span></Link>
                                <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={popupClass}>
                                    <Link to="/A-Aropos" className="text-[#8B6B3F] hover:text-[#C5A059] no-underline text-xs">Notre Histoire</Link>
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