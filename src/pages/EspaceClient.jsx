import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    Package, User, LayoutDashboard, ShieldCheck,
    Lock, X, MapPin, Plus, CreditCard, Trash2
} from 'lucide-react';
import ButtonGold from "../components/ButtonGold.jsx";

const EspaceClient = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // États de navigation
    const [activeTab, setActiveTab] = useState('overview');

    // États pour les adresses (Dynamique)
    const [addresses, setAddresses] = useState([
        { id: 1, label: 'Domicile', rue: '15 rue des saveurs', ville: 'Paris', cp: '75000', isDefault: true }
    ]);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddr, setNewAddr] = useState({ label: '', rue: '', ville: '', cp: '' });

    // État pour les commandes
    const [orders, setOrders] = useState([]);

    const tabs = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'orders', label: 'Mes Achats', icon: <Package size={18} /> },
        { id: 'profile', label: 'Mon Profil', icon: <User size={18} /> }
    ];

    // Gestion de la navigation par onglets
    useEffect(() => {
        const currentHash = location.hash.replace('#', '');
        if (['overview', 'orders', 'profile'].includes(currentHash)) {
            setActiveTab(currentHash);
        }
    }, [location.hash]);

    // LOGIQUE : Ajouter une adresse
    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!newAddr.label || !newAddr.rue || !newAddr.ville || !newAddr.cp) return;

        const addressToSave = {
            id: Date.now(),
            ...newAddr,
            isDefault: addresses.length === 0
        };

        setAddresses([...addresses, addressToSave]);
        setNewAddr({ label: '', rue: '', ville: '', cp: '' }); // Reset
        setIsAddingAddress(false); // Fermer le formulaire
    };

    // LOGIQUE : Supprimer une adresse
    const deleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    // Protection : Si non connecté
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FDFCF7] flex items-center justify-center p-6 font-forum">
                <div className="bg-white max-w-md w-full rounded-[40px] shadow-2xl p-12 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-gold-premium/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-premium">
                        <Lock size={28} />
                    </div>
                    <h2 className="text-2xl uppercase tracking-widest text-[#634832] mb-4 font-bold">Espace Privé</h2>
                    <p className="text-gray-400 text-xs italic mb-8 leading-relaxed font-sans">
                        Veuillez vous connecter pour accéder à votre carnet d'adresses et vos points de fidélité.
                    </p>
                    <Link to="/login?redirect=espace-client">
                        <ButtonGold className="w-full py-4 text-[10px] tracking-widest">Se Connecter / S'inscrire</ButtonGold>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF7] pt-32 pb-20 px-4 md:px-10 font-forum">
            <div className="max-w-6xl mx-auto">

                {/* --- NAVIGATION HORIZONTALE --- */}
                <nav className="flex flex-row gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 md:px-10 py-5 rounded-t-[30px] transition-all duration-300 text-[10px] font-bold tracking-[0.2em] uppercase
                            ${activeTab === tab.id
                                ? 'bg-white text-[#C5A059] shadow-[0_-10px_20px_rgba(0,0,0,0.03)] border-t border-x border-gray-100 translate-y-[1px] z-10'
                                : 'bg-transparent text-gray-400 hover:text-[#634832]'}`}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {/* --- CONTENU PRINCIPAL --- */}
                <main className="bg-white rounded-tr-[40px] rounded-br-[40px] rounded-bl-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-8 md:p-16 border border-gray-100">

                    {/* 1. DASHBOARD */}
                    {activeTab === 'overview' && (
                        <div className="space-y-12 animate-fadeIn">
                            <h1 className="text-3xl text-[#634832] uppercase tracking-[0.2em]">Bienvenue, {user?.prenom}</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Carte Fidélité */}
                                <div className="bg-gradient-to-br from-[#634832] to-[#2d1b0f] p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                    <div className="flex justify-between items-start mb-12">
                                        <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Membre Privilège</p>
                                        <CreditCard className="text-gold-premium opacity-50" />
                                    </div>
                                    <div className="mb-8">
                                        <p className="text-[10px] uppercase text-white/30 mb-2">Votre Solde de Grains</p>
                                        <div className="flex items-baseline gap-3 text-white">
                                            <span className="text-7xl font-bold">{user?.points_fidelite || 0}</span>
                                            <span className="text-sm opacity-50 uppercase tracking-widest font-sans italic">Grains</span>
                                        </div>
                                    </div>
                                    <p className="text-white text-lg tracking-[0.2em] uppercase">{user?.prenom} {user?.nom}</p>
                                </div>

                                {/* Résumé Rapide */}
                                <div className="bg-[#FDFCF7] border border-gray-100 rounded-[40px] p-10 flex flex-col justify-center items-center text-center">
                                    <p className="text-[10px] uppercase text-gray-400 tracking-[0.4em] mb-4 font-bold italic">Dernière activité</p>
                                    <span className="text-5xl font-bold text-[#634832]">{orders.length}</span>
                                    <p className="text-xs text-[#C5A059] uppercase tracking-[0.2em] mt-2 font-bold font-sans">Commandes au total</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. ACHATS */}
                    {activeTab === 'orders' && (
                        <div className="space-y-8 animate-fadeIn">
                            <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em] border-b border-gray-100 pb-6">Historique des commandes</h2>
                            {orders.length === 0 ? (
                                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                                    <Package size={40} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-gray-400 italic">Vous n'avez pas encore passé de commande.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Map des commandes ici */}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. PROFIL & ADRESSES */}
                    {activeTab === 'profile' && (
                        <div className="space-y-16 animate-fadeIn">

                            {/* Infos Perso */}
                            <section>
                                <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em] mb-10">Mon Profil</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl font-sans">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase text-gray-400 font-bold mb-1 tracking-widest italic">Nom Complet</span>
                                        <p className="border-b border-gray-100 py-2 text-brand-brown">{user?.prenom} {user?.nom}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase text-gray-400 font-bold mb-1 tracking-widest italic">Email</span>
                                        <p className="border-b border-gray-100 py-2 text-brand-brown">{user?.email}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Carnet d'adresses Dynamique */}
                            <section>
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em]">Carnet d'adresses</h2>
                                    <button
                                        onClick={() => setIsAddingAddress(!isAddingAddress)}
                                        className="flex items-center gap-2 text-[9px] bg-[#C5A059] text-white px-6 py-3 rounded-full uppercase tracking-widest font-bold hover:bg-[#634832] transition-all shadow-md"
                                    >
                                        {isAddingAddress ? <X size={14} /> : <Plus size={14} />}
                                        {isAddingAddress ? "Annuler" : "Ajouter"}
                                    </button>
                                </div>

                                {/* FORMULAIRE D'AJOUT DYNAMIQUE */}
                                {isAddingAddress && (
                                    <form onSubmit={handleAddAddress} className="bg-[#FDFCF7] p-8 rounded-[35px] border border-[#C5A059]/20 mb-10 animate-slideDown font-sans">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input
                                                type="text"
                                                placeholder="Titre (ex: Maison, Bureau)"
                                                className="md:col-span-2 border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#C5A059] text-sm italic"
                                                value={newAddr.label}
                                                onChange={(e) => setNewAddr({...newAddr, label: e.target.value})}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Adresse complète (Rue)"
                                                className="md:col-span-2 border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#C5A059] text-sm italic"
                                                value={newAddr.rue}
                                                onChange={(e) => setNewAddr({...newAddr, rue: e.target.value})}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Ville"
                                                className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#C5A059] text-sm italic"
                                                value={newAddr.ville}
                                                onChange={(e) => setNewAddr({...newAddr, ville: e.target.value})}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Code Postal"
                                                className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#C5A059] text-sm italic"
                                                value={newAddr.cp}
                                                onChange={(e) => setNewAddr({...newAddr, cp: e.target.value})}
                                                required
                                            />
                                            <ButtonGold type="submit" className="md:col-span-2 py-4 text-[10px] mt-4">Enregistrer l'adresse</ButtonGold>
                                        </div>
                                    </form>
                                )}

                                {/* LISTE DES ADRESSES */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className={`p-8 rounded-[35px] border transition-all relative group ${addr.isDefault ? 'border-[#C5A059] bg-white shadow-xl' : 'border-gray-100 bg-white/40'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2 text-[#C5A059]">
                                                    <MapPin size={16} />
                                                    <span className="text-[10px] uppercase tracking-widest font-bold">{addr.label}</span>
                                                </div>
                                                <button
                                                    onClick={() => deleteAddress(addr.id)}
                                                    className="text-gray-200 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-[#634832] text-xl mb-1 font-forum leading-tight">{addr.rue}</p>
                                            <p className="text-gray-400 text-sm italic font-sans">{addr.cp} {addr.ville}</p>
                                            {addr.isDefault && (
                                                <span className="inline-block mt-4 text-[8px] text-[#C5A059] uppercase font-bold tracking-[0.3em] bg-[#C5A059]/5 px-3 py-1 rounded-full font-sans">
                                                    Par défaut
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* RGPD */}
                            <div className="mt-20 p-10 bg-gray-50 rounded-[40px] border border-gray-100 italic">
                                <h3 className="text-[#C5A059] text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-3">
                                    <ShieldCheck size={18} /> Vos données sont protégées
                                </h3>
                                <p className="text-[10px] text-gray-500 leading-relaxed font-sans px-2">
                                    Nous conservons vos adresses uniquement pour assurer la livraison de vos colis de café et de thé. Vos données de fidélité sont stockées pour vous offrir vos avantages CafThé.
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default EspaceClient;