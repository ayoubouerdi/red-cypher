import React, { useState, useMemo } from 'react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Size } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context';

type SortOption = 'new' | 'price-asc' | 'price-desc';

export const StoreView: React.FC = () => {
  const { t, language, searchQuery } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('new');
  const [showFilters, setShowFilters] = useState(false);

  const sizes: Size[] = ['S', 'M', 'L', 'XL'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    // Filter by size
    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'new') {
        if (a.isNew === b.isNew) return 0;
        return a.isNew ? -1 : 1;
      }
      return 0;
    });

    return result;
  }, [selectedSize, sortOption]);

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12 border-b border-mm-dark pb-8">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 text-glow">
          {t('store.title')}
        </h1>
        <p className="text-gray-500 font-mono text-sm max-w-xl">
          {t('store.desc')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 font-mono text-sm tracking-widest hover:text-mm-neon-red transition-colors border border-mm-dark px-4 py-2 rounded bg-mm-dark/30"
        >
          <Filter size={16} />
          {showFilters ? t('store.filter.hide') : t('store.filter.show')}
        </button>

        <div className="flex items-center gap-3 font-mono text-sm">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-transparent border-none text-white focus:ring-0 cursor-pointer outline-none tracking-widest"
          >
            <option value="new" className="bg-mm-black">{t('store.sort.new')}</option>
            <option value="price-asc" className="bg-mm-black">{t('store.sort.priceAsc')}</option>
            <option value="price-desc" className="bg-mm-black">{t('store.sort.priceDesc')}</option>
          </select>
        </div>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="p-6 bg-mm-dark/20 border border-mm-dark rounded-lg flex flex-wrap items-center gap-8">
              <div>
                <h3 className="font-mono text-xs text-gray-500 mb-3 tracking-widest">{t('store.filter.size')}</h3>
                <div className="flex gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={`w-10 h-10 flex items-center justify-center font-mono text-sm border rounded transition-colors ${
                        selectedSize === size 
                          ? 'border-mm-neon-red text-mm-neon-red bg-mm-neon-red/10' 
                          : 'border-mm-dark text-gray-400 hover:border-gray-500 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedSize && (
                <div className="mt-4 sm:mt-0 flex items-end">
                  <button 
                    onClick={() => setSelectedSize(null)}
                    className="font-mono text-xs text-mm-neon-red hover:underline tracking-widest"
                  >
                    {t('store.filter.reset')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 font-mono flex flex-col items-center">
            <span className="text-4xl mb-4">Ø</span>
            <p>{t('store.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
