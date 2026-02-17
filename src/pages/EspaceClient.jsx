import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const EspaceClient = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/orders/history", {
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Erreur fetch orders:", error);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    if (!user) return <div className="text-center py-20 font-forum uppercase tracking-widest text-[#634832]">Chargement de votre espace...</div>;

    const tabs = [
        { id: 'overview', label: 'ACCUEIL', color: 'bg-[#5F6A4D]' },
        { id: 'orders', label: 'ACHATS', color: 'bg-[#C5A059]' },
        { id: 'profile', label: 'PROFIL', color: 'bg-[#634832]' }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF7] pt-28 pb-12 px-4 font-forum flex justify-center items-start">
            {/* Conteneur principal en Flexbox Row */}
            <div className="max-w-6xl w-full flex flex-row items-start">

                {/* --- NAVIGATION : ONGLETS VERTICAUX "UPRIGHT" --- */}
                <nav className="flex flex-col gap-4 pt-16 shrink-0" style={{ marginRight: '40px' }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                writingMode: 'vertical-lr',
                                textOrientation: 'upright'
                            }}
                            className={`w-14 py-8 flex items-center justify-center rounded-r-[10px] rounded-l-none
                             transition-all duration-500 shadow-md text-[11px] font-bold tracking-[0.1em] ${
                                activeTab === tab.id
                                    ? `${tab.color} text-white z-20 scale-110 shadow-[-8px_0_20px_rgba(0,0,0,0.1)]`
                                    : 'bg-gray-200 text-gray-400 hover:bg-gray-300 z-0'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* --- CORPS DU CLASSEUR (ZONE BLANCHE) --- */}
                <main className="flex-1 bg-white min-h-[800px] rounded-[40px] shadow-[40px_40px_80px_rgba(0,0,0,0.06)] p-16 z-10 relative">

                    <div className="animate-fadeIn ml-10">
                        {/* ONGLET : VUE D'ENSEMBLE */}
                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                <h2 className="text-4xl text-[#C5A059] uppercase tracking-widest border-b border-gray-50 pb-8">Tableau de bord</h2>

                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-10">

                                    {/* CARTE DE FIDÉLITÉ STYLE PREMIUM */}
                                    {/* CARTE DE FIDÉLITÉ : VERSION BOX-SIZING */}
                                    <div className="flex justify-start text-[#C5A059]">
                                        <div
                                            style={{
                                                width: '400px',
                                                height: '250px',
                                                padding: '40px', // Marge interne forcée
                                                boxSizing: 'border-box', // Force le padding à l'intérieur des 400px
                                                borderRadius: '24px',
                                                background: 'linear-gradient(135deg, #634832 0%, #2d1b0f 100%)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}
                                        >
                                            {/* HAUT DE LA CARTE */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Privilège</span>
                                                    <span className="text-xl font-forum italic text-white">CafThé Signature</span>
                                                </div>
                                                {/* Puce simuler */}
                                                <div className="w-10 h-7 bg-[#C5A059] rounded-sm opacity-40 shadow-inner"></div>
                                            </div>

                                            {/* MILIEU : LE COMPTEUR */}
                                            <div style={{ width: '100%' }}>
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-1">Votre Solde</span>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-6xl font-bold text-white tabular-nums">{user.points_fidelite || 0}</span>
                                                    <span className="text-lg text-white/60 font-forum uppercase">grains</span>
                                                </div>
                                            </div>

                                            {/* BAS DE LA CARTE */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="text-[10px] font-mono text-white/30 tracking-[0.2em]">0000 0000 4100 2026</span>
                                                    <span className="text-sm font-light tracking-widest uppercase text-white">
                    {user.prenom} {user.nom}
                </span>
                                                </div>
                                                <span className="text-2xl text-white/10 italic font-forum">CafThé</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* DEUXIÈME CARTE : STATISTIQUES RAPIDES */}
                                    <div className="p-10 bg-[#FDFCF7] rounded-[30px] border border-[#634832]/10 max-w-[400px] shadow-sm flex flex-col justify-center items-center text-center">
                                        <p className="text-[10px] uppercase text-gray-400 tracking-[0.4em] mb-6">Activité totale</p>
                                        <p className="text-7xl font-bold text-[#634832] tracking-tighter">{orders.length}</p>
                                        <p className="text-sm text-[#C5A059] uppercase tracking-widest mt-4 font-bold">Commandes passées</p>
                                    </div>

                                </div>
                            </div>
                        )}
                        {/* ONGLET : HISTORIQUE DES COMMANDES */}
                        {activeTab === 'orders' && (
                            <div className="space-y-8">
                                <h2 className="text-3xl text-[#634832] uppercase tracking-[0.2em] border-b pb-8">Historique des achats</h2>
                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map(o => (
                                            <div key={o.numero_de_commande} className="p-8 bg-white border border-gray-50 rounded-3xl
                                            flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">N° {o.numero_de_commande}</p>
                                                    <p className="text-xl font-bold">{new Date(o.date_de_commande).toLocaleDateString('fr-FR')}</p>
                                                </div>
                                                <p className="text-3xl font-bold text-[#634832]">{o.montant_total_ttc}€</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className="italic text-gray-400 py-10">Aucune commande enregistrée.</p>}
                            </div>
                        )}

                        {/* ONGLET : PROFIL PERSONNEL */}
                        {activeTab === 'profile' && (
                            <div className="max-w-2xl space-y-12">
                                <h2 className="text-3xl text-[#634832] uppercase tracking-[0.2em] border-b pb-8">Vos Coordonnées</h2>
                                <div className="grid grid-cols-1 gap-12 pt-4">
                                    <div className="flex justify-between items-end border-b border-gray-50 pb-6">
                                        <span className="text-[10px] uppercase text-gray-400 tracking-[0.3em]">Client</span>
                                        <span className="text-2xl font-light text-[#634832]">{user.prenom} {user.nom}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-gray-50 pb-6">
                                        <span className="text-[10px] uppercase text-gray-400 tracking-[0.3em]">Email</span>
                                        <span className="text-2xl font-light text-[#634832]">{user.email}</span>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">
                                            Membre CafThé depuis le {new Date(user.date_inscription).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EspaceClient;