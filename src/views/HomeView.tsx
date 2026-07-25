import React, { useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useAppContext } from '../context';
import { MatrixBackground } from '../components/MatrixBackground';

export const HomeView: React.FC = () => {
  const { t, navigate, products } = useAppContext();
  const featuredProducts = products.filter(p => p.isNew || p.isLimited).slice(0, 4);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const xTransform = useTransform(smoothMouseX, [-0.5, 0.5], ['-3%', '3%']);
  const yTransform = useTransform(smoothMouseY, [-0.5, 0.5], ['-3%', '3%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-0.5, 0.5]
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 scale-110"
          style={{ x: xTransform, y: yTransform }}
        >
          <MatrixBackground />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-mono text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 text-glow-red"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-10"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onClick={() => navigate('store')}
            className="group relative px-8 py-4 bg-transparent border border-white hover:border-mm-neon-red overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 bg-mm-neon-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 font-mono font-bold tracking-[0.2em] text-sm group-hover:text-white transition-colors">
              {t('home.hero.cta')}
            </span>
          </motion.button>
        </div>
      </section>

      {/* Featured / Mystery Drop Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-mono text-3xl font-bold tracking-widest uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-mm-neon-red inline-block" />
              {t('home.drop.title')}
            </h2>
            <p className="text-gray-500 mt-4 max-w-md">{t('home.drop.desc')}</p>
          </div>
          <button 
            onClick={() => navigate('store')}
            className="font-mono text-sm tracking-widest text-mm-neon-red hover:text-white transition-colors pb-1 border-b border-mm-neon-red/50 hover:border-white"
          >
            {t('home.drop.viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Lore Section */}
      <section className="py-24 border-y border-mm-dark relative overflow-hidden bg-mm-dark/20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mm-neon-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="font-mono text-mm-neon-red mb-8 opacity-80">{t('home.lore.tag')}</div>
          <h2 className="font-mono text-4xl font-bold tracking-tighter mb-8">{t('home.lore.title')}</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
            {t('home.lore.desc')}
          </p>
          <div className="mt-12 w-px h-24 bg-gradient-to-b from-mm-neon-red to-transparent mx-auto opacity-50" />
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <h2 className="font-mono text-3xl font-bold tracking-widest uppercase flex items-center gap-4">
            <span className="w-12 h-px bg-mm-neon-red inline-block" />
            {/* @ts-ignore - Dynamic key usage */}
            {t('home.reviews.title')}
            <span className="w-12 h-px bg-mm-neon-red inline-block" />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'h1', user: 'X_AESTHETIC', rating: 5, comment: 'Incredible fit. The fabric weight is perfect for layering.', product: 'VOID WALKER' },
            { id: 'h2', user: 'STREET_SAMURAI', rating: 5, comment: 'Incredible details, fits perfectly. Tech works flawlessly.', product: 'GHOST SHELL JACKET' },
            { id: 'h3', user: 'SYS_ADMIN', rating: 5, comment: 'The boxy proportions are mathematically perfect.', product: 'CIPHER BOX TEE' }
          ].map((review) => (
            <div key={review.id} className="p-8 border border-mm-dark bg-mm-black relative group hover:border-mm-neon-red/50 transition-colors flex flex-col h-full">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-mm-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-mm-neon-red">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-400 font-light leading-relaxed mb-6 flex-1">
                "{review.comment}"
              </p>
              <div className="border-t border-mm-dark pt-4 mt-auto">
                <div className="font-mono font-bold text-white tracking-widest text-sm">{review.user}</div>
                <div className="font-mono text-xs text-mm-neon-red mt-1 opacity-80">VERIFIED // {review.product}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
