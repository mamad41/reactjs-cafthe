/**
 * @file Home.test.jsx
 * @description Fichier de test unitaire pour la page d'accueil (Home).
 */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home.jsx';

// On simule (mock) l'API fetch globale pour contrôler les réponses des appels réseau.
global.fetch = vi.fn();

// --- Scénario de test pour la page d'accueil ---
describe('Page Home', () => {

    // Avant chaque test, on réinitialise les simulations pour éviter les interférences.
    beforeEach(() => {
        fetch.mockClear();
    });

    // --- Test 1 : Vérifie que les éléments statiques sont bien affichés ---
    test('devrait afficher le titre principal et le bouton', () => {
        // On simule une réponse API vide pour ce test qui ne se concentre que sur le contenu statique.
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ articles: [] }),
        });

        // On rend le composant Home dans un environnement de test avec le routing mémoire.
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // CORRECTION : On cherche un titre de niveau 1 (h1) qui contient le texte "Saveurs" et "D’ailleurs".
        // C'est plus robuste que de chercher le texte complet qui est cassé par le <br />.
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/Saveurs/i);
        expect(heading).toHaveTextContent(/D’ailleurs/i);

        // On vérifie que le bouton principal est bien là.
        expect(screen.getByRole('button', { name: /Explorer la collection/i })).toBeInTheDocument();
    });

    // --- Test 2 : Simule un appel API réussi et vérifie l'affichage des données ---
    test('devrait afficher les coffrets après un appel API réussi', async () => {
        // On prépare de fausses données qui imitent la réponse de votre API.
        const mockCoffrets = [
            {
                reference_sku: 'COF-001',
                nom_produit: 'Coffret Découverte Éthiopie',
                categorie: 'coffret',
                origine_produit: 'Éthiopie',
                prix_ttc: '35.00',
                image: 'image_ethiopie.jpg'
            },
        ];

        // On configure le mock de fetch pour qu'il renvoie nos fausses données.
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ articles: mockCoffrets }),
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // `waitFor` est utilisé pour attendre que les mises à jour asynchrones (comme le fetch) soient terminées.
        // On attend que le nom de notre faux coffret apparaisse à l'écran.
        await waitFor(() => {
            expect(screen.getByText(/Coffret Découverte Éthiopie/i)).toBeInTheDocument();
        });

        // On vérifie également que le prix est affiché.
        expect(screen.getByText(/35.00€/i)).toBeInTheDocument();
    });

    // --- Test 3 : Simule une erreur API et vérifie l'affichage du message d'erreur ---
    test('devrait afficher un message d\'erreur si l\'appel API échoue', async () => {
        // On configure le mock de fetch pour qu'il simule une erreur réseau.
        fetch.mockRejectedValueOnce(new Error('Erreur réseau simulée'));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // On attend que le message indiquant qu'aucun coffret n'est disponible apparaisse.
        // C'est le comportement de "fallback" de votre composant en cas d'erreur.
        await waitFor(() => {
            expect(screen.getByText(/Aucun coffret disponible pour le moment/i)).toBeInTheDocument();
        });
    });
});
