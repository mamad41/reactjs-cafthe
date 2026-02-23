import React from 'react';
import { Coffee, Gift, Star, Zap } from 'lucide-react';

const FidelityInfo = () => {
    return (
        <div className="mt-8 bg-white dark:bg-surface-dark rounded-[30px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-brand-brown dark:text-gold-premium font-forum uppercase tracking-widest text-lg mb-8 border-b border-gray-50 dark:border-white/5 pb-4">
                Programme Privilège CafThé
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Étape 1 */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gold-premium/10 flex items-center justify-center text-gold-premium">
                        <Coffee size={24} />
                    </div>
                    <h4 className="font-sans font-bold text-[10px] uppercase tracking-tighter">Récoltez</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                        Chaque euro dépensé vous rapporte <span className="text-gold-premium font-bold">1 Graine</span>.
                    </p>
                </div>

                {/* Étape 2 */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gold-premium/10 flex items-center justify-center text-gold-premium">
                        <Star size={24} />
                    </div>
                    <h4 className="font-sans font-bold text-[10px] uppercase tracking-tighter">Cumulez</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-400 font-sans leading-relaxed">
                        Atteignez <span className="text-gold-premium font-bold">100 Graines</span> pour débloquer vos privilèges.
                    </p>
                </div>

                {/* Étape 3 */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gold-premium/10 flex items-center justify-center text-gold-premium">
                        <Gift size={24} />
                    </div>
                    <h4 className="font-sans font-bold text-[10px] uppercase tracking-tighter">Dégustez</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                        Échangez vos points contre des <span className="text-gold-premium font-bold">remises exclusives</span> ou des cadeaux.
                    </p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-center gap-2">
                <Zap size={14} className="text-gold-premium" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">
                    Astuce : Complétez votre profil pour gagner vos 20 premières graines.
                </p>
            </div>
        </div>
    );
};

export default FidelityInfo;