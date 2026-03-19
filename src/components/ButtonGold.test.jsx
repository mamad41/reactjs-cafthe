import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest'; // Note l'ajout de "vi" ici
import ButtonGold from './ButtonGold.jsx';

describe('Composant ButtonGold', () => {

    it('affiche correctement le texte (children)', () => {
        render(<ButtonGold>Commander</ButtonGold>);

        // On vérifie que le texte est bien dans le document
        const bouton = screen.getByText('Commander');
        expect(bouton).toBeInTheDocument();
    });

    it('applique les classes Tailwind par défaut et les classes personnalisées', () => {
        // On lui passe une classe spécifique "mt-10" pour le test
        render(<ButtonGold className="mt-10">Bouton Stylé</ButtonGold>);

        const bouton = screen.getByText('Bouton Stylé');

        // On vérifie une de tes classes par défaut
        expect(bouton).toHaveClass('bg-gold-premium');
        // On vérifie que la classe personnalisée a bien été ajoutée
        expect(bouton).toHaveClass('mt-10');
    });

    it('déclenche bien la fonction onClick quand on clique dessus', async () => {
        // "vi.fn()" crée une fausse fonction (un "espion") pour voir si elle est appelée
        const fausseFonctionClick = vi.fn();
        const user = userEvent.setup();

        render(<ButtonGold onClick={fausseFonctionClick}>Cliquez-moi</ButtonGold>);

        const bouton = screen.getByText('Cliquez-moi');

        // On simule un clic d'utilisateur sur le bouton
        await user.click(bouton);

        // On s'attend à ce que notre fausse fonction ait été appelée exactement 1 fois
        expect(fausseFonctionClick).toHaveBeenCalledTimes(1);
    });

    it('applique le bon type de bouton', () => {
        // On teste le type "submit" souvent utilisé dans les formulaires
        render(<ButtonGold type="submit">Envoyer</ButtonGold>);

        const bouton = screen.getByText('Envoyer');

        // On vérifie que l'attribut HTML "type" est bien "submit"
        expect(bouton).toHaveAttribute('type', 'submit');
    });

});