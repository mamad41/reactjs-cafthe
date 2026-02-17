import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGold from "../components/ButtonGold.jsx";

const Home = () => {
    const navigate = useNavigate();

    const products = [
        { id: 1, type: "Café", name: "Café Moka", origin: "Éthiopie", price: "12.90€", image: "/images/moka.jpg" },
        { id: 2, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/blue-mountain.jpg" },
        { id: 3, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/green-coffee.jpg" },
        { id: 4, type: "Café", name: "Café Blue mountain", origin: "Jamaïque", price: "12.90€", image: "/images/green-coffee-2.jpg" },
    ];

    return (
        <main style={{ backgroundColor: '#FDFCF7', minHeight: '100vh', fontFamily: 'Forum, serif' }}>
            {/* 1. IMAGE HERO */}
            {/* 1. SECTION HERO AVEC TITRE SUPERPOSÉ */}
            <div style={{
                position: 'relative', // Obligatoire pour que le titre reste "dans" l'image
                width: '100%',
                overflow: 'hidden'
            }}>
                {/* L'IMAGE */}
                <img
                    src="/images/backgroud-hero.webp"
                    alt="Bannière Café Thé"
                    style={{
                        width: '95%',
                        height: '700px',
                        display: 'block',
                        margin: '0 auto',
                        objectFit: 'cover',
                        filter: 'brightness(0.8)' // Optionnel : assombrit un peu l'image pour mieux lire le texte
                    }}
                />

                {/* LE TITRE SUR L'IMAGE */}
                <div style={{
                    position: 'absolute',
                    top: '50%', // Centre verticalement
                    left: '50%', // Centre horizontalement
                    transform: 'translate(-50%, -50%)', // Ajustement parfait au milieu
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '64px', // Taille plus imposante
                        fontFamily: 'Forum, serif',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)', // Ombre pour détacher le texte du fond
                        margin: 0,
                        letterSpacing: '5px',
                        textTransform: 'uppercase'
                    }}>
                        Saveurs<br />
                        D’ailleurs
                    </h1>

                    <h1 style={{
                        color: 'white',
                        fontSize: '24px', // Taille plus imposante
                        fontFamily: 'Forum, serif',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)', // Ombre pour détacher le texte du fond
                        margin: 0,
                        letterSpacing: '5px',
                        textTransform: 'uppercase'
                    }}>
                        Nouveauté
                    </h1>

                    {/* BOUTON */}
                    <div style={{marginTop:'20px'}}>
                    <ButtonGold
                        onClick={() => navigate('/boutique?filter=nouveaute')}
                        style={{ padding: '8px 16px', fontSize: '16px', color: 'white'}}
                    >
                        Explorer
                    </ButtonGold>
                    </div>
                </div>
            </div>

            {/* 2. SECTION SÉLECTION DU MOIS */}

            <section style={{
                margin: '40px auto',
                padding: '60px 40px',
                textAlign: 'center',
                maxWidth: '1300px', // Un peu plus large pour le cadre
                border: '1px solid #C5A059', // Ton cadre de 1px
                backgroundColor: '#FDFCF7'
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <span style={{ color: '#C5A059', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '14px' }}>Février 2026</span>
                    <h2 style={{ color: '#C5A059', fontSize: '48px', margin: '15px 0' }}>Sélection du mois</h2>
                    <p style={{ color: '#C5A059', maxWidth: '600px',fontSize: '24px', margin: '0 auto', opacity: 0.8 }}>
                        Découvrez notre sélection de cafés et thés d'exception, soigneusement choisis par nos experts.
                    </p>
                </div>

                {/* LA GRILLE EN COLONNES (FLEXBOX) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap', // Permet de revenir à la ligne sur mobile
                    maxWidth: '1200px',
                    margin: '0 auto 40px auto'
                }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ flex: '1 1 250px', maxWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '15px 15px 0 0', marginBottom: '15px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectCover: 'cover' }}
                                />
                            </div>
                            <span style={{ color: '#C5A059', fontStyle: 'italic', fontSize: '13px' }}>{product.type}</span>
                            <h3 style={{ color: '#8B6B3F', margin: '5px 0', fontSize: '18px' }}>{product.name}</h3>
                            <p style={{ color: '#8B6B3F', margin: '0', fontSize: '14px' }}>{product.origin}</p>
                            <span style={{ color: '#C5A059', fontWeight: 'bold', marginTop: '10px' }}>{product.price}</span>
                        </div>
                    ))}
                </div>

                {/* BOUTON */}
                <div style={{marginTop:'20px'}}>
                    <ButtonGold
                        onClick={() => navigate('/boutique?filter=nouveaute')}
                        style={{ padding: '8px 16px', fontSize: '16px', color: 'white'}}

                    >
                        Decouvrir
                    </ButtonGold>
                </div>
            </section>
            <div style={{ marginBottom: '40px',padding: '60px 20px', textAlign: 'center' }}>
                <h2 style={{ color: '#C5A059', fontSize: '48px', margin: '15px 0' }}>L'Excellence à Chaque Tasse</h2>
                <p style={{ color: '#C5A059', maxWidth: '1000px',fontSize: '24px', margin: '0 auto', opacity: 0.8 }}>
                    Chez CafThé, nous parcourons le monde pour vous offrir les meilleurs cafés de spécialité et thés d'exception.
                    Notre engagement envers la qualité, la durabilité et le commerce équitable garantit une expérience unique
                    à chaque dégustation. De l'Éthiopie à la Jamaïque
                    du Japon à l'Inde, découvrez des saveurs authentiques et des terroirs d'exception.
                </p>
            </div>

        </main>
    );
};

export default Home;