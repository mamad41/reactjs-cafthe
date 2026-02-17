import React from 'react';

const PriceDisplay = ({ prixTTC, prixFinal, pourcentage }) => {
    // On vérifie si le produit est en promotion
    const enPromotion = prixFinal < prixTTC;

    return (
        <div className="price-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {enPromotion ? (
                <>
                    {/* Prix final (mis en avant) */}
                    <span style={{ fontWeight: 'bold', color: '#e74c3c', fontSize: '1.2rem' }}>
            {prixFinal}€
          </span>

                    {/* Prix original (barré) */}
                    <span style={{ textDecoration: 'line-through', color: '#7f8c8d', fontSize: '0.9rem' }}>
            {prixTTC}€
          </span>

                    {/* Badge pourcentage (optionnel) */}
                    <span style={{ background: '#e74c3c', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
            -{pourcentage}%
          </span>
                </>
            ) : (
                // Affichage classique sans promo
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          {prixTTC}€
        </span>
            )}
        </div>
    );
};

export default PriceDisplay;