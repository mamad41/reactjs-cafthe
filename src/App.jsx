import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import EspaceClient from "./pages/EspaceClient.jsx";
import APropos from "./pages/APropos.jsx";
import Contact from "./pages/Contact.jsx";
import {AuthProvider} from "./context/authContext.jsx";
import {CardProvider} from "./context/CardContext.jsx";
import Panier from "./pages/Panier.jsx";
import Checkout from "./pages/Chekout.jsx";
import {Toaster} from 'react-hot-toast'



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
                                     <Route path="/Espace-Client" element={<EspaceClient />} />
                                     <Route path="/A-Propos" element={<APropos />} />
                                     <Route path="/Contact" element={<Contact />} />
                                     {/* id est un paramètre dynamique contenu dans l'url */}
                                     <Route path="produit/:id" element={<ProductDetails />} />
                                     <Route path="login" element={<Login />} />
                                     <Route path="panier" element={<Panier />} />
                                     <Route path={"checkout"} element={<Checkout />} />
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