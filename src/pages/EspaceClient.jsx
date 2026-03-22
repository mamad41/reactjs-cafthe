// Importation des hooks et composants React.
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// Importation des contextes pour l'authentification et le panier.
import { AuthContext } from '../context/AuthContext';
import { CardContext } from '../context/CardContext.jsx';
// Importation des icônes et des composants personnalisés.
import {
    Package, User, LayoutDashboard, ShieldCheck,
    Lock, X, MapPin, Plus, CreditCard, Trash2, KeyRound, RefreshCw
} from 'lucide-react';
import ButtonGold from "../components/ButtonGold.jsx";
import toast from 'react-hot-toast';
import FidelityInfo from "../components/FidelityInfo.jsx";
import SEO from "../components/SEO";

/**
 * Composant de l'Espace Client.
 * Permet à l'utilisateur de voir son tableau de bord, son historique de commandes,
 * et de gérer son profil et ses adresses.
 */
const EspaceClient = () => {
    // Récupération des données depuis les contextes.
    const { user, isAuthenticated } = useContext(AuthContext);
    const { addProductToCart } = useContext(CardContext);
    // Hooks de React Router.
    const location = useLocation();
    const navigate = useNavigate();

    // --- États locaux ---
    const [activeTab, setActiveTab] = useState('overview');
    const [addresses, setAddresses] = useState([
        { id: 1, label: 'Domicile', rue: '15 rue des saveurs', ville: 'Paris', cp: '75000', isDefault: true }
    ]);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddr, setNewAddr] = useState({ label: '', rue: '', ville: '', cp: '' });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const tabs = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'orders', label: 'Mes Achats', icon: <Package size={18} /> },
        { id: 'profile', label: 'Mon Profil', icon: <User size={18} /> }
    ];

    useEffect(() => {
        const currentHash = location.hash.replace('#', '');
        if (['overview', 'orders', 'profile'].includes(currentHash)) {
            setActiveTab(currentHash);
        }
    }, [location.hash]);

    // Effet pour charger l'historique des commandes avec le Token manuel
    useEffect(() => {
        const fetchOrders = async () => {
            const userId = user?.id || user?.id_client;
            const token = localStorage.getItem('token'); // Récupération du token

            if (userId && token) {
                try {
                    setLoadingOrders(true);
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/commandes/client/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Envoi du token manuel
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.commandes) {
                        setOrders(data.commandes);
                    } else if (Array.isArray(data)) {
                        setOrders(data);
                    } else {
                        setOrders([]);
                    }
                } catch (error) {
                    console.error("Erreur fetchOrders:", error);
                    toast.error("Impossible de charger l'historique des commandes.");
                } finally {
                    setLoadingOrders(false);
                }
            }
        };

        if (isAuthenticated && user) {
            fetchOrders();
        }
    }, [user, isAuthenticated]);

    const handleReorder = (orderItems) => {
        if (!orderItems || orderItems.length === 0) {
            toast.error("Aucun article à recommander.");
            return;
        }
        addProductToCart(orderItems);
        toast.success("Articles ajoutés au panier !");
        navigate('/panier');
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!newAddr.label || !newAddr.rue || !newAddr.ville || !newAddr.cp) return;
        const addressToSave = { id: Date.now(), ...newAddr, isDefault: addresses.length === 0 };
        setAddresses([...addresses, addressToSave]);
        setNewAddr({ label: '', rue: '', ville: '', cp: '' });
        setIsAddingAddress(false);
    };

    const deleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            return toast.error("Les mots de passe ne correspondent pas");
        }
        toast.success("Mot de passe mis à jour");
        setIsChangingPassword(false);
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-input-bg flex items-center justify-center p-6 font-forum">
                <div className="bg-white max-w-md w-full rounded-[40px] shadow-2xl p-12 text-center">
                    <Lock size={28} className="mx-auto mb-6 text-gold-premium" />
                    <h2 className="text-2xl uppercase tracking-widest text-[#634832] mb-4 font-bold">Espace Privé</h2>
                    <Link to="/login?redirect=espace-client">
                        <ButtonGold className="w-full py-4 text-[10px]">Se Connecter / S'inscrire</ButtonGold>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <SEO title="Mon Compte Privilège" description="Suivez vos commandes et gérez vos avantages fidélité." />
            <main className="min-h-screen bg-input-bg pt-32 pb-20 px-4 md:px-10 font-forum">
                <div className="max-w-6xl mx-auto">
                    <nav className="flex flex-row gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 md:px-10 py-5 rounded-t-[30px] transition-all text-[10px] font-bold uppercase
                                ${activeTab === tab.id ? 'bg-white text-gold-premium shadow-md' : 'text-gray-400 hover:text-[#634832]'}`}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="bg-white rounded-tr-[40px] rounded-br-[40px] rounded-bl-[40px] shadow-xl p-8 md:p-16 border border-gray-100">
                        {activeTab === 'overview' && (
                            <div className="space-y-12 animate-fadeIn">
                                <h1 className="text-3xl text-[#634832] uppercase tracking-[0.2em]">Bienvenue, {user?.prenom}</h1>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="bg-gradient-to-br from-gold-premium to-[#2d1b0f] p-10 rounded-[40px] shadow-2xl text-white">
                                        <div className="flex justify-between mb-12">
                                            <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">Membre Privilège</p>
                                            <CreditCard className="opacity-50" />
                                        </div>
                                        <div className="mb-8">
                                            <p className="text-[10px] uppercase opacity-30 mb-2">Votre Solde de Grains</p>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-7xl font-bold">{user?.points_fidelite || 0}</span>
                                                <span className="text-sm opacity-50 uppercase tracking-widest font-sans italic">Grains</span>
                                            </div>
                                        </div>
                                        <p className="text-lg tracking-[0.2em] uppercase">{user?.prenom} {user?.nom}</p>
                                    </div>
                                    <div className="bg-input-bg border rounded-[40px] p-10 flex flex-col justify-center items-center text-center">
                                        <span className="text-5xl font-bold text-[#634832]">{orders.length}</span>
                                        <p className="text-xs text-gold-premium uppercase tracking-[0.2em] mt-2 font-bold font-sans">Commandes au total</p>
                                    </div>
                                </div>
                                <FidelityInfo className="w-full"/>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-8 animate-fadeIn">
                                <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em] border-b pb-6">Historique des commandes</h2>
                                {loadingOrders ? (
                                    <div className="py-20 text-center text-gold-premium italic">Chargement...</div>
                                ) : orders.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed rounded-[40px]">
                                        <p className="text-gray-400 italic">Aucune commande pour le moment.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map(order => (
                                            <div key={order.id_commande} className="bg-gray-50/50 border rounded-[30px] p-6">
                                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase">Commande N°{order.id_commande}</p>
                                                        <p className="text-lg text-[#634832] font-bold">{new Date(order.date_commande).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-gold-premium">{order.total_commande}€</p>
                                                        <span className="text-xs uppercase font-bold px-3 py-1 bg-gold-premium/10 rounded-full">{order.statut}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-6 text-right">
                                                    <ButtonGold onClick={() => handleReorder(order.items)} className="py-3 px-6 text-[10px] flex items-center gap-2">
                                                        <RefreshCw size={14} /> Recommander
                                                    </ButtonGold>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-16 animate-fadeIn">
                                <section>
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em]">Mon Profil</h2>
                                        <button onClick={() => setIsChangingPassword(!isChangingPassword)} className="text-[9px] border px-6 py-3 rounded-full uppercase font-bold text-gray-400 hover:text-gold-premium">
                                            {isChangingPassword ? "Annuler" : "Mot de passe"}
                                        </button>
                                    </div>

                                    {isChangingPassword ? (
                                        <form onSubmit={handleChangePassword} className="bg-gray-50 p-8 rounded-[35px] max-w-xl space-y-6">
                                            <input type="password" placeholder="Ancien mot de passe" className="w-full border-b py-2 bg-transparent outline-none focus:border-gold-premium" required />
                                            <div className="grid grid-cols-2 gap-6">
                                                <input type="password" placeholder="Nouveau" className="w-full border-b py-2 bg-transparent outline-none focus:border-gold-premium" required minLength="8" />
                                                <input type="password" placeholder="Confirmer" className="w-full border-b py-2 bg-transparent outline-none focus:border-gold-premium" required minLength="8" />
                                            </div>
                                            <ButtonGold type="submit" className="py-4 text-[10px]">Mettre à jour</ButtonGold>
                                        </form>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-8 max-w-2xl font-sans">
                                            <div><span className="text-[9px] uppercase text-gray-400 font-bold italic">Nom</span><p className="border-b py-2">{user?.prenom} {user?.nom}</p></div>
                                            <div><span className="text-[9px] uppercase text-gray-400 font-bold italic">Email</span><p className="border-b py-2">{user?.email}</p></div>
                                        </div>
                                    )}
                                </section>

                                <section>
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em]">Carnet d'adresses</h2>
                                        <button onClick={() => setIsAddingAddress(!isAddingAddress)} className="bg-gold-premium text-white px-6 py-3 rounded-full uppercase text-[9px] font-bold">
                                            {isAddingAddress ? <X size={14} /> : <Plus size={14} />} {isAddingAddress ? "Annuler" : "Ajouter"}
                                        </button>
                                    </div>

                                    {isAddingAddress && (
                                        <form onSubmit={handleAddAddress} className="bg-[#FDFCF7] p-8 rounded-[35px] border border-gold-premium/20 mb-10 grid grid-cols-2 gap-6">
                                            <input type="text" placeholder="Titre (ex: Maison)" className="border-b py-2 bg-transparent outline-none focus:border-gold-premium" value={newAddr.label} onChange={(e) => setNewAddr({...newAddr, label: e.target.value})} required />
                                            <input type="text" placeholder="Rue" className="border-b py-2 bg-transparent outline-none focus:border-gold-premium" value={newAddr.rue} onChange={(e) => setNewAddr({...newAddr, rue: e.target.value})} required />
                                            <input type="text" placeholder="Ville" className="border-b py-2 bg-transparent outline-none focus:border-gold-premium" value={newAddr.ville} onChange={(e) => setNewAddr({...newAddr, ville: e.target.value})} required pattern="^[a-zA-ZÀ-ÿ\s'-]{2,}$" />
                                            <input type="text" placeholder="CP" className="border-b py-2 bg-transparent outline-none focus:border-gold-premium" value={newAddr.cp} onChange={(e) => setNewAddr({...newAddr, cp: e.target.value})} required pattern="^[0-9]{5}$" />
                                            <ButtonGold type="submit" className="col-span-2 py-4 text-[10px]">Enregistrer</ButtonGold>
                                        </form>
                                    )}

                                    <div className="grid grid-cols-2 gap-6">
                                        {addresses.map((addr) => (
                                            <div key={addr.id} className="p-8 rounded-[35px] border bg-white relative group">
                                                <div className="flex justify-between mb-4">
                                                    <div className="flex items-center gap-2 text-gold-premium">
                                                        <MapPin size={16} /> <span className="text-[10px] uppercase font-bold">{addr.label}</span>
                                                    </div>
                                                    <button onClick={() => deleteAddress(addr.id)} className="text-gray-200 hover:text-red-500"><Trash2 size={16} /></button>
                                                </div>
                                                <p className="text-[#634832] text-xl font-forum leading-tight">{addr.rue}</p>
                                                <p className="text-gray-400 text-sm italic">{addr.cp} {addr.ville}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default EspaceClient;