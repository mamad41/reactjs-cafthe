// Importation des hooks nécessaires depuis React.
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importation pour la redirection

// Création du Contexte d'Authentification.
export const AuthContext = createContext(null);

/**
 * Fournisseur du contexte d'authentification.
 * @param {object} props - Les props du composant, incluant `children`.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialisation du hook de navigation

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/client/me`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login'); // Redirection simple sans `redirect` ici
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client);
                }
            } catch (error) {
                console.error("Erreur vérification session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [navigate]);

    const login = (userData) => {
        setUser(userData);
        // Stockage du token lors de la connexion
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/client/logout`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
