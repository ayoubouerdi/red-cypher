import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useAppContext } from '../context';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { t, navigate } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer relative"
      onClick={() => navigate('product', product.id)}
    >
      <div className="relative aspect-[3/4] bg-mm-dark rounded-lg overflow-hidden mb-4 border border-mm-dark/50 group-hover:border-mm-neon-red/30 transition-colors duration-500">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isLimited && (
            <span className="bg-mm-black/80 backdrop-blur text-mm-neon-red border border-mm-neon-red/30 text-[10px] font-mono px-2 py-1 uppercase tracking-widest">
              {t('badge.limited')}
            </span>
          )}
          {product.isNew && (
            <span className="bg-mm-black/80 backdrop-blur text-white border border-white/20 text-[10px] font-mono px-2 py-1 uppercase tracking-widest">
              {t('badge.new')}
            </span>
          )}
        </div>

        {/* Image */}
        <div className="absolute inset-0 bg-mm-black/20 group-hover:bg-transparent transition-colors duration-500 z-0" />
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Hover overlay text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none bg-black/40">
          <span className="font-mono text-sm tracking-[0.3em] text-white glitch-hover">{t('product.discover')}</span>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-mono text-base font-bold text-gray-200 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs mt-1 font-mono">
            {product.sizes.join(' - ')}
          </p>
        </div>
        <span className="font-mono text-mm-neon-red font-medium">
          {product.price} DH
        </span>
      </div>
    </motion.div>
  );
};
