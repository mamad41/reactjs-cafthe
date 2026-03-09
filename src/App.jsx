// Importation des dépendances React et React Router
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importation des différentes pages de l'application
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Recherche from "./components/Recherche.jsx";
import Boutique from "./pages/Boutique.jsx";
import Abonnement from "./pages/Abonnement.jsx";
import EspaceClient from "./pages/EspaceClient.jsx";
import APropos from "./pages/APropos.jsx";
import Contact from "./pages/Contact.jsx";
import ResetPassword from "./pages/ResetPassword";
import Panier from "./pages/Panier.jsx";
import Checkout from "./pages/Checkout.jsx";
import Cgv from "./pages/Cgv.jsx";
import FAQ from "./pages/FAQ.jsx";
import Sitemap from "./components/Sitemap.jsx";
import Success from "./pages/Success.jsx";

// Importation des fournisseurs de contexte pour l'authentification et le panier
import { AuthProvider } from "./context/AuthContext.jsx";
import { CardProvider } from "./context/CardContext.jsx";

// Importation du composant Toaster pour les notifications
import { Toaster } from 'react-hot-toast';

/**
 * Composant principal de l'application.
 * Il configure le routing, les contextes et la structure globale.
 */
function App() {
    return (
        // Le AuthProvider rend le contexte d'authentification disponible dans toute l'application.
        <AuthProvider>
            {/* Le CardProvider rend le contexte du panier disponible. */}
            <CardProvider>
                {/* BrowserRouter active le routing côté client. */}
                <BrowserRouter>
                    {/* Le composant Routes définit les différentes routes de l'application. */}
                    <Routes>
                        {/* La route parente "/" utilise le composant Layout qui contient la barre de navigation et le pied de page. */}
                        {/* Toutes les routes imbriquées s'afficheront à l'intérieur du Layout. */}
                        <Route path="/" element={<Layout />}>
                            {/* La route d'index (page d'accueil) affiche le composant Home. */}
                            <Route index element={<Home />} />

                            {/* Définition des routes pour chaque page de l'application. */}
                            <Route path="/boutique" element={<Boutique />} />
                            <Route path="/Abonnement" element={<Abonnement />} />
                            <Route path="/Espace-Client" element={<EspaceClient />} />
                            <Route path="/A-Propos" element={<APropos />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/FAQ" element={<FAQ />} />
                            
                            {/* Route dynamique pour la page de détails d'un produit. L':id est un paramètre d'URL. */}
                            <Route path="produit/:id" element={<ProductDetails />} />
                            
                            <Route path="login" element={<Login />} />
                            <Route path="Panier" element={<Panier />} />
                            <Route path="Checkout" element={<Checkout />} />
                            <Route path="success" element={<Success />} />
                            <Route path="Cgv" element={<Cgv />} />
                            <Route path="Recherche" element={<Recherche />} />
                            <Route path="sitemap" element={<Sitemap />} />
                        </Route>
                    </Routes>

                    {/* Configuration du composant Toaster pour afficher des notifications globales. */}
                    <Toaster
                        position="bottom-right" // Position des notifications à l'écran.
                        containerStyle={{
                            top: 20,
                            left: 20,
                            bottom: 20,
                            right: 20,
                            zIndex: 999999, // z-index très élevé pour s'assurer qu'il est au-dessus de tout.
                        }}
                        toastOptions={{
                            duration: 5000, // Durée d'affichage par défaut des notifications.
                            style: {
                                zIndex: 999999,
                                background: '#333',
                                color: '#fff',
                            },
                        }}
                    />
                </BrowserRouter>
            </CardProvider>
        </AuthProvider>
    );
}

export default App;
