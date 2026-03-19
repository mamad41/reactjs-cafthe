/**
 * @file Panier.test.jsx
 * @description Tests unitaires et de sécurité pour la page Panier.
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Panier from './Panier';
import { CardContext } from '../context/CardContext';
import { AuthContext } from '../context/AuthContext';

// --- Mocks des Contextes ---
const mockAuthContext = {
    user: { nom: 'Test' },
    isAuthenticated: true,
};

// Fonction pour rendre le composant avec des contextes personnalisables
const renderWithProviders = (cardContextValue) => {
    return render(
        <AuthContext.Provider value={mockAuthContext}>
            <CardContext.Provider value={cardContextValue}>
                <MemoryRouter>
                    <Panier />
                </MemoryRouter>
            </CardContext.Provider>
        </AuthContext.Provider>
    );
};


// --- Scénarios de test pour la page Panier ---
describe('Page Panier', () => {

    // --- Test 1 : Comportement lorsque le panier est vide ---
    test('devrait afficher un message lorsque le panier est vide', () => {
        const emptyCardContext = {
            cartItems: [],
            totalAmount: '0.00',
            cartCount: 0,
        };
        renderWithProviders(emptyCardContext);

        expect(screen.getByText(/Votre panier est vide/i)).toBeInTheDocument();
        // CORRECTION: On cherche le lien par son "nom accessible" (aria-label).
        expect(screen.getByRole('link', { name: /Retourner à la boutique pour ajouter des articles/i })).toBeInTheDocument();
    });

    // --- Test 2 : Affichage correct des articles dans le panier ---
    test('devrait afficher les articles, leurs quantités et prix', () => {
        const filledCardContext = {
            cartItems: [
                { reference_sku: 'CAFE-01', nom_produit: 'Café du Brésil', quantite: 2, prix_final: '10.00', image: 'test.jpg' },
                { reference_sku: 'THE-02', nom_produit: 'Thé Vert Sencha', quantite: 1, prix_ttc: '15.50', image: 'test2.jpg' },
            ],
            totalAmount: '35.50',
            cartCount: 3,
        };
        renderWithProviders(filledCardContext);

        // Vérifier que les noms des produits sont affichés
        expect(screen.getByText(/Café du Brésil/i)).toBeInTheDocument();
        expect(screen.getByText(/Thé Vert Sencha/i)).toBeInTheDocument();

        // Vérifier que les quantités sont correctes
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();

        // Vérifier que les prix sont affichés
        expect(screen.getByText(/20.00€/i)).toBeInTheDocument(); // 2 * 10.00
        expect(screen.getByText(/15.50€/i)).toBeInTheDocument();

        // CORRECTION: On cible la section "Total TTC" pour éviter l'ambiguïté.
        const totalSection = screen.getByText(/Total TTC/i).closest('div');
        expect(within(totalSection).getByText(/35.50€/i)).toBeInTheDocument();
    });

    // --- Test 3 : Interaction avec les boutons de quantité ---
    test('devrait appeler les fonctions de mise à jour de quantité au clic', async () => {
        const user = userEvent.setup();
        const mockDecrease = vi.fn();
        const mockAdd = vi.fn();
        const filledCardContext = {
            cartItems: [{ reference_sku: 'CAFE-01', nom_produit: 'Café du Brésil', quantite: 2, prix_final: '10.00', image: 'test.jpg' }],
            decreaseQuantity: mockDecrease,
            addProductToCart: mockAdd,
        };
        renderWithProviders(filledCardContext);

        // Simuler un clic sur le bouton "-"
        const decreaseButton = screen.getByRole('button', { name: /Diminuer la quantité de Café du Brésil/i });
        await user.click(decreaseButton);
        expect(mockDecrease).toHaveBeenCalledTimes(1);
        expect(mockDecrease).toHaveBeenCalledWith('CAFE-01', undefined); // Le poids est undefined dans cet exemple

        // Simuler un clic sur le bouton "+"
        const increaseButton = screen.getByRole('button', { name: /Augmenter la quantité de Café du Brésil/i });
        await user.click(increaseButton);
        expect(mockAdd).toHaveBeenCalledTimes(1);
    });

    // --- Test 4 : Sécurité du champ de code promo ---
    test('le champ de code promo ne devrait pas être vulnérable à une injection simple', async () => {
        const user = userEvent.setup();
        const emptyCardContext = { cartItems: [] };
        renderWithProviders(emptyCardContext);

        // On cherche le champ par son label
        const promoInput = screen.getByLabelText(/Code privilège/i);
        const scriptPayload = '<img src=x onerror=alert("XSS")>';
        
        await user.type(promoInput, scriptPayload);

        // L'input doit contenir le payload comme du texte brut
        expect(promoInput).toHaveValue(scriptPayload);

        // On vérifie qu'aucune image malveillante n'a été rendue
        const maliciousImage = screen.queryByRole('img', { name: /x/i });
        expect(maliciousImage).toBeNull();
    });
});
