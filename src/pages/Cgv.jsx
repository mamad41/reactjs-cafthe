import React from 'react';

const CGV = () => {
    return (
        <main className="bg-white dark:bg-black min-h-screen font-forum transition-colors duration-500 pb-20">
            {/* Header de la page */}
            <div id="cgv" className="py-20 px-[10vw] text-center border-b border-gold-premium/10">
                <h1 className="text-gold-premium dark:text-white uppercase tracking-[5px] text-4xl mb-4">
                    Conditions Générales de Vente
                </h1>
                <p className="text-neutral-500 dark:text-silver-dim font-sans text-xs uppercase tracking-widest">
                    Dernière mise à jour : Février 2026
                </p>
            </div>

            {/* Contenu des CGV */}
            <div className="max-w-5xl mx-auto mt-16 px-6">
                <div className="bg-card-bg dark:bg-[#212121] p-10 md:p-16 rounded-[40px] shadow-sm border border-gold-premium/5">

                    <div className="font-sans text-neutral-800 dark:text-[#D1D5DB] leading-relaxed space-y-12 text-sm md:text-base">

                        {/* Section 1 */}
                        <section >
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">1. Objet</h2>
                            <p>
                                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la boutique <strong>CafThé</strong> et toute personne effectuant un achat sur le site. Elles s'appliquent à l'exclusion de toutes autres conditions.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">2. Produits et Disponibilité</h2>
                            <p>
                                Nos cafés de spécialité, thés rares et accessoires sont décrits avec la plus grande précision. Compte tenu de la nature artisanale de nos produits (torréfaction fraîche), les stocks sont limités. En cas d'indisponibilité après commande, nous vous proposerons un produit équivalent ou un remboursement total.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">3. Prix et Paiement</h2>
                            <p>
                                Les prix sont indiqués en Euros TTC. Le paiement est exigible immédiatement à la commande. Nous utilisons des protocoles de sécurisation SSL pour garantir la confidentialité de vos transactions bancaires.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">4. Livraison</h2>
                            <p>
                                Nous livrons en Europe. Les délais moyens sont de 3 à 5 jours ouvrés. Les frais de port sont calculés lors du passage à la caisse. Conformément à notre politique commerciale, la livraison peut être offerte sous conditions (ex: montant minimum d'achat).
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">5. Droit de Rétractation</h2>
                            <p>
                                Conformément à la loi, vous disposez de 14 jours pour retourner vos accessoires. <strong>Attention :</strong> Pour des raisons d'hygiène et de conservation, ce droit ne s'applique pas aux produits alimentaires (café et thé) dont l'emballage a été ouvert.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-gold-premium font-forum text-xl uppercase tracking-wider mb-4">6. Service Client</h2>
                            <p>
                                Pour toute question relative à votre sélection ou à une commande en cours, notre équipe est à votre disposition via la rubrique "Contact" ou par email à l'adresse indiquée dans votre espace client.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default CGV;