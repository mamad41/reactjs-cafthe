import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import {AuthProvider} from "./context/authContext.jsx";
import {CardProvider} from "./context/CardContext.jsx";
import ResetPassword from "./pages/ResetPassword";
import Panier from "./pages/Panier.jsx";
import Checkout from "./pages/Chekout.jsx";
import Cgv from "./pages/Cgv.jsx";
import {Toaster} from 'react-hot-toast'
import FAQ from "./Pages/FAQ.jsx";
import Sitemap from "./components/Sitemap.jsx";


function App() {
    return (
        // AuthProvider enveloppe toute l'app pour partager l'authentification
        <AuthProvider>
            <CardProvider>
                 <BrowserRouter>


                        <Routes>
                                {/* Route parent : Layout contient navbar + outlet + footer */}
                                    <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />

                                     <Route path="/boutique" element={<Boutique />} />
                                     <Route path="/ABonnement" element={<Abonnement />} />
                                     <Route path="/Espace-Client" element={<EspaceClient />} />
                                     <Route path="/A-Propos" element={<APropos />} />
                                     <Route path="/Contact" element={<Contact />} />
                                     <Route path="/reset-password" element={<ResetPassword />} />
                                     <Route path="/faq" element={<FAQ />} />
                                     {/* id est un paramètre dynamique contenu dans l'url */}
                                     <Route path="produit/:id" element={<ProductDetails />} />
                                     <Route path="login" element={<Login />} />
                                     <Route path="panier" element={<Panier />} />
                                     <Route path="checkout" element={<Checkout />} />
                                     <Route path="Cgv" element={<Cgv />} />
                                     <Route path="Recherche" element={<Recherche />} />
                                     <Route path="sitemap" element={<Sitemap />} />
                                    </Route>
                         </Routes>
                     <Toaster
                         position="bottom-right"
                         containerStyle={{
                             top: 20,
                             left: 20,
                             bottom: 20,
                             right: 20,
                             zIndex: 999999, // On met un chiffre énorme pour passer devant tout
                         }}
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
    )
}

export default App