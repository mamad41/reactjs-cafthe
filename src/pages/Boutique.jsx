import React from 'react';
import ProductList from "../components/ProductList.jsx"
import FilterButton from "../components/FilterButton.jsx";

const Boutique = () => {
    return (
        <main className="bg-[#FDFCF7] min-h-screen font-forum">

            {/* EN-TÊTE DE PAGE */}
            <div className="text-center py-16 px-5">
                <h1 className="text-gold-premium text-4xl md:text-5xl uppercase tracking-[5px] mb-8">
                    Cafés, Thés & Accessoires
                </h1>

                {/* FILTRES RAPIDES */}
                <div className="flex justify-center gap-4 flex-wrap mt-10">
                    <FilterButton href="#cafes">Cafés du monde</FilterButton>
                    <FilterButton href="#thes">Thés & Infusions</FilterButton>
                    <FilterButton href="#accessoires">Accessoires</FilterButton>
                </div>
            </div>

            {/* SECTION COFFRETS - Fond purple  */}
            <section id="coffret" className="bg-red-900 py-20 px-10 my-12">
                <h2 className="text-center text-gold-premium text-3xl uppercase tracking-[3px]">
                    Nos coffrets de dégustation
                </h2>
            </section>
            <div className="max-w-7xl mx-auto px-4">
                <ProductList category="coffret" />
            </div>



            {/* SECTION CAFÉS - Fond sombre (Marron Chocolat) */}
            <section id="cafes" className="bg-brown-bg py-20 px-10 my-12">
                <h2 className="text-center text-gold-premium text-3xl uppercase tracking-[3px]">
                    Notre sélection de cafés
                </h2>
            </section>
            <div className="max-w-7xl mx-auto px-4">
                <ProductList category="café" />
            </div>


            {/* SECTION THÉS - Fond Vert Olive */}
            <section id="thes" className="bg-olive-bg py-20 px-10 my-12">
                <h2 className="text-center text-gold-premium text-3xl uppercase tracking-[3px]">
                    Notre sélection de Thés
                </h2>
            </section>
            <div className="max-w-7xl mx-auto px-4">
                <ProductList category="thé" />
            </div>


            {/* SECTION ACCESSOIRES - Fond Crème */}
            <section id="accessoires" className="bg-creme-bg py-20 px-10 my-12 border-y border-gray-100">
                <h2 className="text-center text-gold-premium text-3xl uppercase tracking-[3px]">
                    Accessoires
                </h2>
            </section>
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <ProductList category="accessoire" />
            </div>

        </main>
    );
};

export default Boutique;