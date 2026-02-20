import React from 'react';
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"
import BackToTop from "../components/BackToTop";
/*Structure
-Navbar
-outlet (contenu variable)
Footer
 */

const Layout = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        <BackToTop />
        <Footer />
    </>
    );
};

export default Layout;