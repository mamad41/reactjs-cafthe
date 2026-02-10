import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import EspaceClient from "./pages/EspaceClient.jsx";
import {AuthProvider} from "./context/authContext.jsx";
import Navbar from "./components/Navbar.jsx";
import {CardProvider} from "./context/CardContext.jsx";
import Panier from "./pages/Panier.jsx";
import Checkout from "./pages/Chekout.jsx";




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
                                 {/* id est un paramètre dynamique contenu dans l'url */}
                                     <Route path="produit/:id" element={<ProductDetails />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="panier" element={<Panier />} />
                                        <Route path={"checkout"} element={<Checkout />} />
                                        <Route path={"Espace-Client"} element={<EspaceClient />} />
                                    </Route>
                         </Routes>
                 </BrowserRouter>
            </CardProvider>
       </AuthProvider>
    )
}

export default App