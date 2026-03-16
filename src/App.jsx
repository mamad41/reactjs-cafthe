// Importation des dépendances React et React Router
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importation classique pour le Layout (qui doit toujours s'afficher immédiatement)
import Layout from "./layout/Layout.jsx";

// Importation différée (Lazy Loading) pour les pages
const Home = React.lazy(() => import("./pages/Home.jsx"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Recherche = React.lazy(() => import("./components/Recherche.jsx"));
const Boutique = React.lazy(() => import("./pages/Boutique.jsx"));
const Abonnement = React.lazy(() => import("./pages/Abonnement.jsx"));
const EspaceClient = React.lazy(() => import("./pages/EspaceClient.jsx"));
const APropos = React.lazy(() => import("./pages/APropos.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword.jsx"));
const Panier = React.lazy(() => import("./pages/Panier.jsx"));
const Checkout = React.lazy(() => import("./pages/Checkout.jsx"));
const Cgv = React.lazy(() => import("./pages/Cgv.jsx"));
const FAQ = React.lazy(() => import("./pages/FAQ.jsx"));
const Sitemap = React.lazy(() => import("./components/Sitemap.jsx"));
const Success = React.lazy(() => import("./pages/Success.jsx"));

// Importation des fournisseurs de contexte
import { AuthProvider } from "./context/AuthContext.jsx";
import { CardProvider } from "./context/CardContext.jsx";

// Importation du composant Toaster pour les notifications
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <AuthProvider>
            <CardProvider>
                <BrowserRouter>
                    {/* Suspense enveloppe les routes pour afficher un écran d'attente pendant le chargement des pages */}
                    <Suspense fallback={<div className="flex h-screen items-center justify-center text-xl">Chargement de la page...</div>}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="/boutique" element={<Boutique />} />
                                <Route path="/Abonnement" element={<Abonnement />} />
                                <Route path="/Espace-Client" element={<EspaceClient />} />
                                <Route path="/A-Propos" element={<APropos />} />
                                <Route path="/Contact" element={<Contact />} />
                                <Route path="/reset-password" element={<ResetPassword />} />
                                <Route path="/FAQ" element={<FAQ />} />
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
                    </Suspense>

                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            duration: 5000,
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