/**
 * @file Login.test.jsx
 * @description Tests de sécurité et de validation pour le composant Login.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext.jsx';

// Mock de l'API fetch pour éviter les appels réseau réels.
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ client: { nom: 'Test User' } }),
    })
);

// Mock du contexte d'authentification.
const mockLogin = vi.fn();
const authContextValue = {
    user: null,
    login: mockLogin,
    logout: vi.fn(),
    loading: false,
    isAuthenticated: false,
};

// Wrapper pour fournir le contexte et le router nécessaires au composant.
const renderWithProviders = (ui) => {
    return render(
        <AuthContext.Provider value={authContextValue}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    );
};


// --- Scénario de test de sécurité pour la page Login/Register ---
describe('Sécurité du composant Login', () => {

    beforeEach(() => {
        fetch.mockClear();
        mockLogin.mockClear();
    });

    // --- Test 1 : Prévention basique du Cross-Site Scripting (XSS) ---
    test('ne devrait pas interpréter le HTML injecté dans les champs de saisie', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const switchToRegisterButton = screen.getByRole('button', { name: /Basculer vers la création de compte/i });
        await user.click(switchToRegisterButton);

        const nomInput = await screen.findByLabelText(/Nom Complet/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const scriptPayload = "<script>alert('XSS')</script>";

        await user.type(nomInput, scriptPayload);
        await user.type(emailInput, scriptPayload);

        expect(nomInput).toHaveValue(scriptPayload);
        expect(emailInput).toHaveValue(scriptPayload);
        const scriptTag = screen.queryByText('alert', { selector: 'script' });
        expect(scriptTag).toBeNull();
    });

    // --- Test 2 : Validation des attributs de sécurité et de type des inputs ---
    test('devrait avoir les attributs de validation HTML5 corrects', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const emailLogin = screen.getByLabelText(/Email/i);
        // CORRECTION: On spécifie que l'on cherche un input pour lever l'ambiguïté.
        const passwordLogin = screen.getByLabelText(/Mot de passe/i, { selector: 'input' });

        expect(emailLogin).toBeRequired();
        expect(emailLogin).toHaveAttribute('type', 'email');
        expect(passwordLogin).toBeRequired();
        expect(passwordLogin).toHaveAttribute('type', 'password');
        expect(passwordLogin).toHaveAttribute('minLength', '8');

        const switchToRegisterButton = screen.getByRole('button', { name: /Basculer vers la création de compte/i });
        await user.click(switchToRegisterButton);

        const nomRegister = await screen.findByLabelText(/Nom Complet/i);
        expect(nomRegister).toBeRequired();
    });

    // --- Test 3 : Contrôle de la soumission du formulaire d'inscription ---
    test('le bouton "S\'inscrire" devrait être désactivé si la case RGPD n\'est pas cochée', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Login />);

        const switchToRegisterButton = screen.getByRole('button', { name: /Basculer vers la création de compte/i });
        await user.click(switchToRegisterButton);

        const submitButton = await screen.findByRole('button', { name: /S'inscrire/i });
        expect(submitButton).toBeDisabled();

        const rgpdCheckbox = screen.getByRole('checkbox', { name: /Accepter l'utilisation des données personnelles/i });
        await user.click(rgpdCheckbox);

        expect(submitButton).not.toBeDisabled();

        await user.click(rgpdCheckbox);
        expect(submitButton).toBeDisabled();
    });
});
