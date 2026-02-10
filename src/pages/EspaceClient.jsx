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
            } catch (error) { console.error("Erreur orders:", error); }
        };
        if (user) fetchOrders();
    }, [user]);

    if (!user) return <div className="text-center py-20 font-forum uppercase tracking-widest">Chargement...</div>;

    const tabs = [
        { id: 'overview', label: 'ACCUEIL', color: 'bg-[#5F6A4D]' },
        { id: 'orders', label: 'ACHATS', color: 'bg-[#C5A059]' },
        { id: 'profile', label: 'PROFIL', color: 'bg-[#634832]' }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF7] pt-28 pb-12 px-4 font-forum flex justify-center items-start">
            <div className="max-w-6xl w-full flex items-stretch">

                {/* --- NAVIGATION : ONGLETS À LETTRES EMPILLÉES --- */}
                <nav className="flex flex-col gap-2 pt-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                writingMode: 'vertical-lr',
                                textOrientation: 'upright' // Garde les lettres droites
                            }}
                            className={`w-14 py-8 flex items-center justify-center rounded-l-2xl transition-all duration-500 shadow-[-5px_5px_15px_rgba(0,0,0,0.05)] text-[11px] font-bold tracking-[0.1em] ${
                                activeTab === tab.id
                                    ? `${tab.color} text-white translate-x-3 z-20 scale-105`
                                    : 'bg-gray-200 text-gray-400 hover:bg-gray-300 translate-x-10 z-0'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* --- CORPS DU CLASSEUR --- */}
                <main className="flex-1 bg-white min-h-[800px] rounded-r-3xl rounded-bl-3xl shadow-[40px_40px_80px_rgba(0,0,0,0.06)] border-l-[18px] border-gray-100 p-16 z-10 relative -ml-1">

                    {/* Anneaux métalliques ultra-réalistes */}
                    <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-16 opacity-30 pointer-events-none">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-500 via-gray-200 to-white border border-gray-400 shadow-lg"></div>
                        ))}
                    </div>

                    <div className="animate-fadeIn ml-10">
                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                <h2 className="text-4xl text-[#634832] border-b border-gray-50 pb-8 uppercase tracking-widest">Tableau de bord</h2>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="p-12 bg-[#FDFCF7] rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center">
                                        <p className="text-[10px] uppercase text-gray-400 tracking-[0.4em] mb-4">Points CafThé</p>
                                        <p className="text-7xl font-bold text-[#C5A059]">{user.points_fidelite || 0}</p>
                                    </div>
                                    <div className="p-12 bg-[#FDFCF7] rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center">
                                        <p className="text-[10px] uppercase text-gray-400 tracking-[0.4em] mb-4">Commandes</p>
                                        <p className="text-7xl font-bold text-[#634832]">{orders.length}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-8">
                                <h2 className="text-3xl text-[#634832] uppercase tracking-[0.2em] border-b pb-8">Historique des achats</h2>
                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map(o => (
                                            <div key={o.numero_de_commande} className="p-8 bg-white border border-gray-50 rounded-3xl flex justify-between items-center shadow-sm hover:shadow-md transition-all">
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
                                        <p className="text-[10px] text-gray-300 uppercase tracking-widest">Membre CafThé depuis le {new Date(user.date_inscription).toLocaleDateString('fr-FR')}</p>
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