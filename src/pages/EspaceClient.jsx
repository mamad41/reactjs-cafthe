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
    const [activeTab, setActiveTab] = useState('overview'); // Gère l'onglet actif.
    const [addresses, setAddresses] = useState([
        { id: 1, label: 'Domicile', rue: '15 rue des saveurs', ville: 'Paris', cp: '75000', isDefault: true }
    ]); // Stocke les adresses de l'utilisateur (données de test).
    const [isAddingAddress, setIsAddingAddress] = useState(false); // Gère l'affichage du formulaire d'ajout d'adresse.
    const [newAddr, setNewAddr] = useState({ label: '', rue: '', ville: '', cp: '' }); // État pour le formulaire de nouvelle adresse.
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Gère l'affichage du formulaire de changement de mot de passe.
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' }); // État pour le formulaire de mot de passe.
    const [orders, setOrders] = useState([]); // Stocke l'historique des commandes.
    const [loadingOrders, setLoadingOrders] = useState(false); // Gère l'état de chargement des commandes.

    // Définition des onglets disponibles.
    const tabs = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'orders', label: 'Mes Achats', icon: <Package size={18} /> },
        { id: 'profile', label: 'Mon Profil', icon: <User size={18} /> }
    ];

    // Effet pour synchroniser l'onglet actif avec le hash de l'URL (ex: /espace-client#orders).
    useEffect(() => {
        const currentHash = location.hash.replace('#', '');
        if (['overview', 'orders', 'profile'].includes(currentHash)) {
            setActiveTab(currentHash);
        }
    }, [location.hash]);

    // Effet pour charger l'historique des commandes lorsque l'utilisateur est authentifié.
    useEffect(() => {
        const fetchOrders = async () => {
            const userId = user?.id || user?.id_client; // Utilise user.id ou user.id_client comme fallback.
            
            if (userId) {
                try {
                    setLoadingOrders(true);
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/commandes/client/${userId}`, {
                        credentials: 'include'
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
                    }
                    
                    const data = await response.json();

                    // Gère différents formats de réponse de l'API.
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

    /**
     * Ajoute tous les articles d'une commande passée au panier actuel.
     * @param {Array} orderItems - Le tableau d'articles d'une commande.
     */
    const handleReorder = (orderItems) => {
        if (!orderItems || orderItems.length === 0) {
            toast.error("Aucun article à recommander dans cette commande.");
            return;
        }
        // La fonction addProductToCart a été modifiée pour accepter un tableau d'articles.
        addProductToCart(orderItems);
        toast.success("Les articles ont été ajoutés à votre panier !");
        navigate('/panier');
    };

    // Fonctions de gestion du profil (adresses, mot de passe) - Logique à implémenter avec l'API.
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
            return toast.error("Les nouveaux mots de passe ne correspondent pas");
        }
        toast.success("Mot de passe mis à jour avec succès");
        setPasswordData({ current: '', new: '', confirm: '' });
        setIsChangingPassword(false);
    };

    // Si l'utilisateur n'est pas authentifié, affiche un message l'invitant à se connecter.
    if (!isAuthenticated) {
        return (
            <>
                <SEO
                    title="Mon Compte Privilège"
                    description="Accédez à votre espace client CafThé : suivez vos commandes, gérez votre abonnement et consultez votre solde de graines de fidélité."
                />
                <main className="min-h-screen bg-input-bg flex items-center justify-center p-6 font-forum">
                    <div className="bg-white max-w-md w-full rounded-[40px] shadow-2xl p-12 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-gold-premium/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-premium">
                            <Lock size={28} />
                        </div>
                        <h2 className="text-2xl uppercase tracking-widest text-[#634832] mb-4 font-bold">Espace Privé</h2>
                        <p className="text-gray-400 text-xs italic mb-8 leading-relaxed font-sans">
                            Veuillez vous connecter pour accéder à votre espace client
                        </p>
                        <Link to="/login?redirect=espace-client">
                            <ButtonGold className="w-full py-4 text-[10px] tracking-widest">Se Connecter / S'inscrire</ButtonGold>
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    // Affichage principal pour un utilisateur connecté.
    return (
        <>
            <SEO
                title="Mon Compte Privilège"
                description="Suivez vos commandes et gérez vos avantages fidélité."
            />
            <main className="min-h-screen bg-input-bg pt-32 pb-20 px-4 md:px-10 font-forum">
                <div className="max-w-6xl mx-auto">
                    {/* Navigation par onglets */}
                    <nav className="flex flex-row gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 md:px-10 py-5 rounded-t-[30px] transition-all duration-300 text-[10px] font-bold tracking-[0.2em] uppercase
                                ${activeTab === tab.id
                                    ? 'bg-white text-gold-premium shadow-[0_-10px_20px_rgba(0,0,0,0.03)] border-t border-x border-gray-100 translate-y-px z-10'
                                    : 'bg-transparent text-gray-400 hover:text-[#634832]'}`}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="bg-white rounded-tr-[40px] rounded-br-[40px] rounded-bl-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-8 md:p-16 border border-gray-100">

                        {/* Contenu de l'onglet "Dashboard" */}
                        {activeTab === 'overview' && (
                            <div className="space-y-12 animate-fadeIn">
                                <h1 className="text-3xl text-[#634832] uppercase tracking-[0.2em]">Bienvenue, {user?.prenom}</h1>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="bg-linear-to-br from-gold-premium to-[#2d1b0f] p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
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
                                    <div id="Card" className="bg-input-bg border border-gray-100 rounded-[40px] p-10 flex flex-col justify-center items-center text-center">
                                        <p className="text-[10px] uppercase text-gray-400 tracking-[0.4em] mb-4 font-bold italic">Dernière activité</p>
                                        <span className="text-5xl font-bold text-[#634832]">{orders.length}</span>
                                        <p className="text-xs text-gold-premium uppercase tracking-[0.2em] mt-2 font-bold font-sans">Commandes au total</p>
                                    </div>
                                </div>
                                <FidelityInfo className="w-full"/>
                            </div>
                        )}

                        {/* Contenu de l'onglet "Mes Achats" */}
                        {activeTab === 'orders' && (
                            <div className="space-y-8 animate-fadeIn">
                                <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em] border-b border-gray-100 pb-6">Historique des commandes</h2>
                                {loadingOrders ? (
                                    <div className="py-20 text-center text-gold-premium italic">Chargement de vos commandes...</div>
                                ) : orders.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                                        <Package size={40} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-400 italic">Vous n'avez pas encore passé de commande.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map(order => (
                                            <div key={order.id_commande} className="bg-gray-50/50 border border-gray-100 rounded-[30px] p-6">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-widest">Commande N°{order.id_commande}</p>
                                                        <p className="text-lg text-[#634832] font-bold">{new Date(order.date_commande).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                    <div className="text-right mt-4 md:mt-0">
                                                        <p className="text-2xl font-bold text-gold-premium">{order.total_commande}€</p>
                                                        <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${order.statut === 'Livrée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.statut}</span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-gray-200 pt-4 mt-4">
                                                    <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Articles</h4>
                                                    <div className="space-y-2">
                                                        {order.items && order.items.map(item => (
                                                            <div key={item.reference_sku} className="flex justify-between items-center text-sm">
                                                                <p className="text-brand-brown">{item.nom_produit} <span className="text-gray-400 text-xs">x{item.quantite}</span></p>
                                                                <p className="font-sans font-bold text-gray-600">{(item.prix_unitaire * item.quantite).toFixed(2)}€</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mt-6 text-right">
                                                    <ButtonGold onClick={() => handleReorder(order.items)} className="py-3 px-6 text-[10px] flex items-center gap-2">
                                                        <RefreshCw size={14} />
                                                        Recommander
                                                    </ButtonGold>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Contenu de l'onglet "Mon Profil" */}
                        {activeTab === 'profile' && (
                            <div className="space-y-16 animate-fadeIn">
                                <section>
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em]">Mon Profil</h2>
                                        <button
                                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                                            className="flex items-center gap-2 text-[9px] border border-gray-200 text-gray-400 px-6 py-3 rounded-full uppercase tracking-widest font-bold hover:border-gold-premium hover:text-gold-premium transition-all"
                                        >
                                            <KeyRound size={14} />
                                            {isChangingPassword ? "Annuler" : "Sécurité & Mot de passe"}
                                        </button>
                                    </div>

                                    {isChangingPassword ? (
                                        <form onSubmit={handleChangePassword} className="bg-gray-50 p-8 rounded-[35px] border border-gray-100 mb-10 animate-slideDown font-sans max-w-xl">
                                            <div className="space-y-6">
                                                <input
                                                    type="password"
                                                    placeholder="Mot de passe actuel"
                                                    className="w-full border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                    value={passwordData.current}
                                                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                                                    required
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <input
                                                        type="password"
                                                        placeholder="Nouveau mot de passe"
                                                        className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                        value={passwordData.new}
                                                        onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                                                        required
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Confirmer le mot de passe"
                                                        className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                        value={passwordData.confirm}
                                                        onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <ButtonGold type="submit" className="py-4 text-[10px] mt-4">Mettre à jour le mot de passe</ButtonGold>
                                            </div>
                                        </form>
                                    ) : (
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
                                    )}
                                </section>

                                <section>
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-2xl text-[#634832] uppercase tracking-[0.2em]">Carnet d'adresses</h2>
                                        <button
                                            onClick={() => setIsAddingAddress(!isAddingAddress)}
                                            className="flex items-center gap-2 text-[9px] bg-gold-premium text-white px-6 py-3 rounded-full uppercase tracking-widest font-bold hover:bg-[#634832] transition-all shadow-md"
                                        >
                                            {isAddingAddress ? <X size={14} /> : <Plus size={14} />}
                                            {isAddingAddress ? "Annuler" : "Ajouter"}
                                        </button>
                                    </div>

                                    {isAddingAddress && (
                                        <form onSubmit={handleAddAddress} className="bg-[#FDFCF7] p-8 rounded-[35px] border border-gold-premium/20 mb-10 animate-slideDown font-sans">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <input
                                                    type="text"
                                                    placeholder="Titre (ex: Maison, Bureau)"
                                                    className="md:col-span-2 border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                    value={newAddr.label}
                                                    onChange={(e) => setNewAddr({...newAddr, label: e.target.value})}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Adresse complète (Rue)"
                                                    className="md:col-span-2 border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                    value={newAddr.rue}
                                                    onChange={(e) => setNewAddr({...newAddr, rue: e.target.value})}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Ville"
                                                    className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                    value={newAddr.ville}
                                                    onChange={(e) => setNewAddr({...newAddr, ville: e.target.value})}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Code Postal"
                                                    className="border-b border-gray-200 py-2 bg-transparent outline-none focus:border-gold-premium text-sm italic"
                                                    value={newAddr.cp}
                                                    onChange={(e) => setNewAddr({...newAddr, cp: e.target.value})}
                                                    required
                                                />
                                                <ButtonGold type="submit" className="md:col-span-2 py-4 text-[10px] mt-4">Enregistrer l'adresse</ButtonGold>
                                            </div>
                                        </form>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses.map((addr) => (
                                            <div id="Card" key={addr.id} className={`p-8 rounded-[35px] border transition-all relative group ${addr.isDefault ? 'border-gold-premium dark:border-silver-shine bg-white shadow-xl' : 'border-gray-100 bg-white/40'}`}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2 text-gold-premium">
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
                                                    <span className="inline-block mt-4 text-[8px] text-gold-premium uppercase font-bold tracking-[0.3em] bg-gold-premium/5 px-3 py-1 rounded-full font-sans">
                                                        Par défaut
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div id="Card" className="mt-20 p-10 bg-gray-50 rounded-[40px] border border-gray-100 italic">
                                    <h3 className="text-gold-premium text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-3">
                                        <ShieldCheck size={18} /> Vos données sont protégées
                                    </h3>
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans px-2">
                                        Nous conservons vos adresses uniquement pour assurer la livraison de vos colis de café et de thé. Vos données de fidélité sont stockées pour vous offrir vos avantages CafThé.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default EspaceClient;
