import React from 'react';
import ProductList from "../components/ProductList.jsx";

const Boutique = () => {
    return (
        <main style={{ backgroundColor: '#FDFCF7', minHeight: '100vh', fontFamily: 'Forum, serif' }}>

            {/* EN-TÊTE DE PAGE */}
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h1 style={{ color: '#C5A059', fontSize: '42px', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '30px' }}>
                    Cafés, Thés & Accessoires
                </h1>

                {/* FILTRES RAPIDES (ANCRES) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <a href="#cafes" style={filterButtonStyle}>Cafés du monde</a>
                    <a href="#thes" style={filterButtonStyle}>Thés & Infusions</a>
                    <a href="#accessoires" style={filterButtonStyle}>Accessoires</a>
                </div>
            </div>

            {/* SECTION CAFÉS - Fond sombre (Marron Chocolat) */}
            <section id="cafes" style={{ backgroundColor: '#2C241E', padding: '80px 40px' }}>
                <h2 style={{ textAlign: 'center', color: '#C5A059', fontSize: '32px', marginBottom: '50px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                    Notre sélection de cafés
                </h2>
                <ProductList category="café" />
            </section>

            {/* SECTION THÉS - Fond Vert Olive */}
            <section id="thes" style={{ backgroundColor: '#4A5D3F', padding: '80px 40px' }}>
                <h2 style={{ textAlign: 'center', color: '#C5A059', fontSize: '32px', marginBottom: '50px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                    Notre sélection de Thés
                </h2>
                <ProductList category="thé" />
            </section>

            {/* SECTION ACCESSOIRES - Fond Crème */}
            <section id="accessoires" style={{ backgroundColor: '#FDFCF7', padding: '80px 40px' }}>
                <h2 style={{ textAlign: 'center', color: '#8B6B3F', fontSize: '32px', marginBottom: '50px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                    Accessoires
                </h2>
                <ProductList category="accessoire" />
            </section>

        </main>
    );
};

// Style pour les petits boutons de navigation en haut
const filterButtonStyle = {
    color: '#8B6B3F',
    textDecoration: 'none',
    border: '1px solid #C5A059',
    padding: '10px 25px',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: '0.3s'
};

export default Boutique;