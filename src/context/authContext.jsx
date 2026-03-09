// Importation des hooks nécessaires depuis React.
import React, { createContext, useState, useEffect } from "react";

// Création du Contexte d'Authentification. Il sera utilisé par les composants pour accéder aux données d'authentification.
export const AuthContext = createContext(null);

/**
 * Le AuthProvider est un composant qui enveloppe d'autres composants
 * pour leur fournir l'accès au contexte d'authentification.
 * @param {object} props - Les props du composant, incluant `children` qui représente les composants enfants.
 */
export function AuthProvider({ children }) {
    // État pour stocker les informations de l'utilisateur connecté.
    const [user, setUser] = useState(null);
    // État pour suivre le chargement initial de la session.
    const [loading, setLoading] = useState(true);

    // Ce `useEffect` s'exécute une seule fois au chargement de l'application.
    // Il vérifie si une session utilisateur est déjà active côté serveur.
    useEffect(() => {
        const checkSession = async () => {
            try {
                // Appel à l'API pour récupérer les informations de l'utilisateur actuel.
                // L'option `credentials: "include"` est cruciale pour envoyer les cookies de session.
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/client/me`,
                    { credentials: "include" }
                );

                // Si la réponse est positive (status 200-299), l'utilisateur est connecté.
                if (response.ok) {
                    const data = await response.json();
                    // On met à jour l'état `user` avec les données reçues.
                    setUser(data.client);
                }
            } catch (error) {
                // En cas d'erreur réseau, on affiche un message dans la console.
                console.error("Erreur vérification session:", error);
            } finally {
                // Dans tous les cas (succès ou échec), on indique que le chargement est terminé.
                setLoading(false);
            }
        };

        checkSession();
    }, []); // Le tableau de dépendances vide assure que cet effet ne s'exécute qu'une fois.

    /**
     * Fonction pour connecter un utilisateur.
     * Elle met à jour l'état `user` avec les données fournies.
     * @param {object} userData - Les données de l'utilisateur à stocker.
     */
    const login = (userData) => {
        setUser(userData);
    };

    /**
     * Fonction pour déconnecter un utilisateur.
     * Elle appelle l'API de déconnexion et réinitialise l'état `user`.
     */
    const logout = async () => {
        try {
            // Appel à l'API pour détruire la session côté serveur.
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/client/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
        // On réinitialise l'état `user` à `null` pour déconnecter l'utilisateur côté client.
        setUser(null);
    };

    // L'objet `value` contient toutes les données et fonctions que nous voulons rendre accessibles via le contexte.
    const value = {
        user,               // L'objet utilisateur (ou null).
        login,              // La fonction pour se connecter.
        logout,             // La fonction pour se déconnecter.
        loading,            // Le statut de chargement initial.
        isAuthenticated: !!user, // Un booléen pratique pour vérifier si l'utilisateur est connecté.
    };

    // Le Provider rend la `value` accessible à tous ses composants enfants.
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
