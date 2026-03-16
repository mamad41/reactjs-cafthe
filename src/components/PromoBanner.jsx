import React, { useState } from 'react';
import { TicketPercent, X, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [copied, setCopied] = useState(false);
    const promoCode = "BIENVENUE10";

    const handleCopy = () => {
        navigator.clipboard.writeText(promoCode);
        setCopied(true);
        toast.success("Code promo copié !");
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isVisible) return null;

    return (
        <div className="relative bg-[#1a1a1a] border-b border-gold-premium/30 animate-slideDown z-0">
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-nowrap">

                    {/* Message Central */}
                    <div className="flex-1 flex items-center justify-center">
                        <TicketPercent className="h-4 w-4 text-gold-premium mr-3 hidden sm:block" />
                        <p className="font-forum text-white text-[10px] sm:text-xs uppercase tracking-[0.3em] text-center">
                            Offre de bienvenue : <span className="text-gold-premium font-bold">-10%</span> avec le code
                        </p>

                        {/* Badge Code Promo */}
                        <button
                            aria-label="Copier le code promo"
                            onClick={handleCopy}
                            className="ml-4 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:bg-white/10 transition-all group"
                        >
                            <span className="text-[10px] font-bold text-gold-premium tracking-widest">{promoCode}</span>
                            {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} className="text-white/30 group-hover:text-white" />}
                        </button>
                    </div>

                    {/* Bouton Fermer */}
                    <button
                        aria-label="Fermer"
                        onClick={() => setIsVisible(false)}
                        className="flex p-1 rounded-md hover:bg-white/5 transition-colors"
                    >
                        <X className="h-4 w-4 text-white/20 hover:text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;