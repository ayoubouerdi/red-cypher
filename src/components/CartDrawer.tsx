import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '../context';
import { synth } from '../audio';

const RandomText: React.FC<{ length: number }> = ({ length }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>[]{}';
    const interval = setInterval(() => {
      let t = '';
      for (let i = 0; i < length; i++) {
        t += chars[Math.floor(Math.random() * chars.length)];
      }
      setText(t);
    }, 50);
    return () => clearInterval(interval);
  }, [length]);
  return <>{text}</>;
};

export const CartDrawer: React.FC = () => {
  const { t, isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useAppContext();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isCheckingOut) {
      setOrderId(Math.random().toString(36).substring(2, 10).toUpperCase());
      
      const timer1 = setTimeout(() => {
        setCheckoutStep(1);
      }, 2500);

      const timer2 = setTimeout(() => {
        setIsCheckingOut(false);
        setCheckoutStep(0);
        clearCart();
        closeCart();
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isCheckingOut, clearCart, closeCart]);

  const handleCheckout = () => {
    synth.playClick();
    setIsCheckingOut(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-mm-black/80 backdrop-blur-md z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-mm-black border-l border-mm-neon-red/30 z-50 flex flex-col shadow-[0_0_50px_rgba(255,0,60,0.1)]"
          >
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] opacity-20 z-0" />
            
            {/* Header */}
            <div className="p-6 border-b border-mm-dark flex items-center justify-between relative z-10">
              <h2 className="font-mono text-xl tracking-widest text-glow-red flex items-center gap-3">
                <span className="w-8 h-px bg-mm-neon-red inline-block" />
                {t('cart.title')}
              </h2>
              <button onClick={closeCart} className="text-mm-neon-red hover:text-white transition-colors hover:rotate-90 duration-300">
                <X size={28} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-mono text-sm space-y-6">
                  <div className="w-16 h-16 border border-mm-dark flex items-center justify-center relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-mm-neon-red" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-mm-neon-red" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-mm-neon-red" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-mm-neon-red" />
                    <X size={24} className="opacity-20" />
                  </div>
                  <p className="tracking-widest uppercase">{t('cart.empty')}</p>
                  <button onClick={closeCart} className="text-mm-neon-red hover:text-white transition-colors border-b border-mm-neon-red/50 hover:border-white pb-1 tracking-widest uppercase">
                    {t('cart.explore')}
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 bg-mm-dark/10 p-4 relative group border border-transparent hover:border-mm-dark transition-colors">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-24 h-32 bg-mm-dark overflow-hidden flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-mm-neon-red/10 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img src={item.product.mainImage} alt={item.product.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-mono text-sm font-bold tracking-wider group-hover:text-mm-neon-red transition-colors">{item.product.name}</h3>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-600 hover:text-mm-neon-red transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-gray-500 mt-2">{t('cart.size')} <span className="text-white">{item.size}</span></p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-mm-dark h-8">
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-mm-dark/50 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-mm-dark/50 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-mono text-sm text-mm-neon-red">{item.product.price * item.quantity} DH</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-mm-neon-red/30 bg-mm-black relative z-10">
                <div className="flex justify-between items-center mb-6 font-mono">
                  <span className="text-gray-400 tracking-widest text-sm uppercase">{t('cart.total')}</span>
                  <span className="text-white text-glow-red text-xl font-bold">{cartTotal} DH</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-transparent border border-mm-neon-red text-white font-mono font-bold py-4 tracking-widest hover:bg-mm-neon-red transition-all duration-300 relative overflow-hidden group uppercase mb-2">
                  <div className="absolute inset-0 bg-mm-neon-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative z-10 glitch-hover group-hover:text-white">{t('cart.checkout')}</span>
                </button>
                <p className="text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
                  {t('cart.cod')}
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Checkout Fullscreen Animation */}
          <AnimatePresence>
            {isCheckingOut && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-mm-black z-[100] flex flex-col items-center justify-center p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,60,0.15),transparent_60%)]" />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] opacity-20 z-0" />
                
                <div className="relative z-10 text-center max-w-lg w-full">
                  {checkoutStep === 0 ? (
                    <div className="space-y-6">
                      <div className="w-16 h-16 mx-auto border-2 border-mm-neon-red flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                        <div className="w-8 h-8 bg-mm-neon-red/30" />
                      </div>
                      <h2 className="font-mono text-2xl tracking-[0.2em] text-mm-neon-red glitch-continuous uppercase">
                        {t('checkout.validating')}
                      </h2>
                      <div className="h-1 w-full bg-mm-dark overflow-hidden relative">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-mm-neon-red"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.5, ease: "linear" }}
                        />
                      </div>
                      <div className="pt-8 overflow-hidden">
                        <p className="font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest text-left font-bold opacity-70 break-all leading-relaxed">
                          <RandomText length={250} />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                      className="space-y-10"
                    >
                      <div className="w-24 h-24 mx-auto border-4 border-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] bg-white text-mm-black relative">
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-mm-neon-red" />
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-mm-neon-red" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-mm-neon-red" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-mm-neon-red" />
                        <span className="font-mono text-4xl font-bold">✓</span>
                      </div>
                      <h2 className="font-mono text-2xl sm:text-3xl tracking-[0.2em] text-white uppercase text-glow">
                        {t('checkout.success')}
                      </h2>
                      <div className="border border-mm-dark bg-mm-dark/30 p-8 flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mm-neon-red to-transparent opacity-50" />
                        <span className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-[0.3em]">{t('checkout.orderId')}</span>
                        <span className="font-mono text-3xl sm:text-4xl text-mm-neon-red tracking-widest text-glow-red">#{orderId}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
