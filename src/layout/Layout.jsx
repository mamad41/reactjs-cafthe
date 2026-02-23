import React from 'react';
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"
import BackToTop from "../components/BackToTop";
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
        <BackToTop />
        <Footer />
    </>
    );
};

export default Layout;