import React from 'react';
import { ShieldCheck, Truck, Phone, CreditCard, Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import ButtonGold from "./ButtonGold.jsx";

const Footer = () => {
    const iconColor = "#C5A059";
    const textColor = "#8B6B3F";

    return (
        <footer style={{ backgroundColor: '#FDFCF7', padding: '60px 80px', fontFamily: 'Forum, serif', borderTop: '2px solid #C5A05933' }}>

            {/* 3. BLOC MARQUE FINAL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', borderTop: '3px solid #C5A05933', paddingTop: '40px' }}>
                <img src="/images/logo-simple.svg" alt="Logo Cafthe" style={{ height: '500px', opacity: 0.8 }} />
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ color: '#C5A059', fontSize: '32px', marginBottom: '10px' }}>CafThé</h3>
                    <p style={{ color: textColor, fontSize: '20px', maxWidth: '700px', lineHeight: '1.6', opacity: 0.9 }}>
                        L'Artisan des Terroirs. Passionnés par l'excellence, nous sélectionnons les meilleurs cafés de spécialité et thés rares à travers le monde. De la graine à la tasse, Cafthe s'engage pour une culture durable et une torréfaction artisanale. Redécouvrez le goût de l'authentique.
                    </p>
                </div>
            </div>


            {/* 1. LIGNE DES RÉCURRENCES (SERVICE) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', paddingBottom: '30px', borderBottom: '3px solid #C5A05933' }}>
                <div style={serviceItemStyle}>
                    <ShieldCheck color={iconColor} size={32} />
                    <span style={serviceTitleStyle}>Paiement Sécurisé</span>
                    <span style={serviceSubtitleStyle}>Mastercard, Visa, Paypal</span>
                </div>
                <div style={{ height: '50px', width: '3px', backgroundColor: '#C5A05933' }}></div>
                <div style={serviceItemStyle}>
                    <Truck color={iconColor} size={32} />
                    <span style={serviceTitleStyle}>Livraison Offerte</span>
                    <span style={serviceSubtitleStyle}>À partir de 50€ d'achat</span>
                </div>
                <div style={{ height: '50px', width: '3px', backgroundColor: '#C5A05933' }}></div>
                <div style={serviceItemStyle}>
                    <Phone color={iconColor} size={32} />
                    <span style={serviceTitleStyle}>Service Client</span>
                    <span style={serviceSubtitleStyle}>01 02 03 04 05</span>
                </div>
                <div style={{ height: '50px', width: '3px', backgroundColor: '#C5A05933' }}></div>
                <div style={serviceItemStyle}>
                    <CreditCard color={iconColor} size={32} />
                    <span style={serviceTitleStyle}>Paiement en 4 fois</span>
                    <span style={serviceSubtitleStyle}>Avec Paypal</span>
                </div>
            </div>

            {/* 2. LIGNE DES LIENS ET RÉSEAUX SOCIAUX */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px' }}>
                <div style={linkColumnStyle}>
                    <h4 style={columnTitleStyle}>Catalogue <ChevronDown size={14} /></h4>
                    <a href="#" style={linkStyle}>Café du monde</a>
                    <a href="#" style={linkStyle}>Thé du monde</a>
                    <a href="#" style={linkStyle}>Accessoires</a>
                </div>
                <div style={linkColumnStyle}>
                    <h4 style={columnTitleStyle}>Environnement <ChevronDown size={14} /></h4>
                    <a href="#" style={linkStyle}>Nos actions</a>
                    <a href="#" style={linkStyle}>Nos partenaires</a>
                    <a href="#" style={linkStyle}>Notre association</a>
                </div>
                <div style={linkColumnStyle}>
                    <h4 style={columnTitleStyle}>Témoignages <ChevronDown size={14} /></h4>
                    <a href="#" style={linkStyle}>Avis clients</a>
                    <a href="#" style={linkStyle}>Galerie</a>
                </div>
                <div style={linkColumnStyle}>
                    <h4 style={columnTitleStyle}>Plus d'informations <ChevronDown size={14} /></h4>
                    <a href="#" style={linkStyle}>Nous contacter</a>
                    <a href="#" style={linkStyle}>Conditions générales de ventes</a>
                    <a href="#" style={linkStyle}>Offres d'emploi</a>
                </div>

                {/* RÉSEAUX SOCIAUX & FAQ */}
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginBottom: '20px' }}>
                        <Facebook size={20} color={iconColor} style={{ cursor: 'pointer' }} />
                        <Twitter size={20} color={iconColor} style={{ cursor: 'pointer' }} />
                        <Instagram size={20} color={iconColor} style={{ cursor: 'pointer' }} />
                        <Linkedin size={20} color={iconColor} style={{ cursor: 'pointer' }} />
                    </div>
                    <ButtonGold style={{
                        backgroundColor: '#634832',
                        color: 'white',
                        padding: '10px 25px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer'
                    }}>
                        Notre FAQ
                    </ButtonGold>
                </div>
            </div>


        </footer>
    );
};

// --- STYLES OBJETS ---
const serviceItemStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 };
const serviceTitleStyle = { color: '#8B6B3F', textTransform: 'uppercase', fontSize: '24px', letterSpacing: '1px', marginTop: '10px', fontWeight: 'bold' };
const serviceSubtitleStyle = { color: '#C5A059', fontSize: '18px', fontStyle: 'italic', marginTop: '2px' };

const linkColumnStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const columnTitleStyle = { color: '#C5A059', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' };
const linkStyle = { color: '#8B6B3F', textDecoration: 'none', fontSize: '16px', opacity: 0.8 };

export default Footer;