import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    // 1. Initialisation : on regarde si le thème est déjà stocké ou si le PC est en mode sombre
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // 2. L'effet qui applique RÉELLEMENT le changement
    useEffect(() => {
        const root = window.document.documentElement; // C'est la balise <html>

        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gold-premium flex items-center justify-center"
            aria-label="Changer de thème"
        >
            {darkMode ? (
                <Sun size={20} className="transition-transform duration-500 rotate-0 scale-100" />
            ) : (
                <Moon size={20} className="transition-transform duration-500 rotate-0 scale-100" />
            )}
        </button>
    );
};

export default ThemeToggle;