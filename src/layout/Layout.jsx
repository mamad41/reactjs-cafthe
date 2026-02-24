import React from 'react';
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"
import ScrollControls from "../components/ScrollControls.jsx";
import PromoBanner from '../components/PromoBanner';

/*Structure
-Navbar
-outlet (contenu variable)
Footer
 */

const Layout = () => {
    return (
        <>
        <Navbar />
            <PromoBanner />
        <Outlet />
        <ScrollControls />
        <Footer />
    </>
    );
};

export default Layout;