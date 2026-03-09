CafThé - E-commerce de thés et cafés d'exception 

Application E-commerce B2C permettant la consultation et l'achat de cafés et thés haut de gamme. Ce projet Front-End a été développé de zéro (from scratch) dans le cadre de mon Titre Professionnel Développeur Web.

Prérequis

Node.js >= 18

npm

Une API back-end fonctionnelle (Node.js/Express) et une base de données MySQL.

Quickstart

# 1. Cloner le dépôt
git clone https://github.com/mamad41/reactjs-cafthe/tree/main
# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env et renseigner les variables nécessaires (voir tableau ci-dessous)

# 4. Lancer le serveur de développement
npm run dev



L'application sera accessible sur http://localhost:5173.

Variables d'environnement

Variable

Description

Exemple

VITE_API_URL

L'URL racine de votre API Back-end

http://localhost:3000/api

VITE_STRIPE_PUBLIC_KEY

Clé publique pour l'intégration du tunnel Stripe

pk_test_51Px...

Scripts disponibles

Commande

Description

npm run dev

Lancer le serveur de développement

npm run build

Construire le projet pour la prod

npm run preview

Prévisualiser le build de prod

npm run lint

Lancer ESLint sur le projet

Exemples d'utilisation

Voici les principales routes de l'application permettant la navigation de l'utilisateur :

URL

Description

http://localhost:5173/

Accueil : Présentation de l'enseigne et mise en avant des produits phares.

http://localhost:5173/boutique

Catalogue : Liste des produits avec fonctionnalités de tri et de recherche.

http://localhost:5173/produit/:sku

Détail Produit : Fiche détaillée (ex: ProductCard) avec choix des variantes.

http://localhost:5173/panier

Panier : Récapitulatif de la commande géré via un Context React.

http://localhost:5173/checkout

Paiement : Tunnel de commande et passerelle de paiement Stripe.

http://localhost:5173/espace-client

Mon Compte : Connexion, inscription et historique des commandes.

Structure du projet

Afin de respecter les bonnes pratiques, le projet suit une architecture modulaire :

src/
├── assets/            # Images, icônes, polices (ex: Forum, Montserrat)
├── components/        # Composants UI réutilisables (Navbar, ProductCard, Footer)
├── contexts/          # Gestion globale des états (CardContext, AuthContext)
├── pages/             # Vues principales de l'application (Accueil, Boutique, EspaceClient)
├── services/          # Fonctions d'appels API (fetch/axios)
├── App.jsx            # Point d'entrée de l'application et routeur
└── main.jsx           # Montage de l'arbre React



Déploiement

Build de production

npm run build



Les fichiers statiques optimisés sont générés dans le dossier dist/.

Hébergement

(Remplacer par votre plateforme finale, ex: Vercel, Netlify ou o2Switch)
Ce projet front-end peut être facilement déployé sur des plateformes comme Vercel ou Netlify en connectant directement le dépôt GitHub. Il suffit d'ajouter les variables d'environnement dans les paramètres de la plateforme.

Tests

Les tests permettent de garantir la fiabilité du tunnel d'achat et des composants isolés.

# Lancer la suite de tests
npm run test



Stack technique

React.js — Bibliothèque JavaScript pour la création d'interfaces utilisateurs interactives.

Vite.js — Outil de build et serveur de développement ultra-rapide.

Tailwind CSS — Framework CSS utilitaire pour un design sur-mesure et responsive.

React Router DOM — Gestion du routage et de la navigation Front-End.

Stripe / React Stripe.js — Intégration de la passerelle de paiement sécurisée.

Lucide React — Bibliothèque d'icônes optimisée.

Auteurs

Mamadou Baradji — Développeur Web en formation (Front-End & Back-End)

Licence

Ce projet est sous licence MIT.

Liens utiles

Documentation React

Documentation Vite

Documentation Tailwind CSS

Documentation Stripe
