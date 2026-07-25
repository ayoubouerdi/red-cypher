import React from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useAppContext } from '../context';
import { motion, AnimatePresence } from 'motion/react';

import { synth } from '../audio';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, viewState, navigate, openCart, cartCount, searchQuery, setSearchQuery } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'store', label: t('nav.store') },
    { id: 'about', label: t('nav.about') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-mm-black/80 backdrop-blur-md border-b border-mm-dark">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-mm-offwhite hover:text-mm-neon-red transition-colors"
          onClick={() => {
            synth.playClick();
            setMobileMenuOpen(true);
          }}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div 
          className="cursor-pointer flex-1 text-center md:flex-none flex justify-center md:justify-start items-center"
          onClick={() => navigate('home')}
        >
          <span className="font-mono text-xl md:text-2xl font-bold tracking-[0.2em] text-mm-neon-red text-glow-red glitch-hover uppercase">
            RED CYPHER
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.id as any)}
              className={`relative overflow-hidden group py-2 ${viewState.view === link.id ? 'text-mm-offwhite' : 'text-gray-400 hover:text-mm-offwhite'}`}
            >
              <span className="relative z-10">{link.label}</span>
              {viewState.view === link.id && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-mm-neon-red"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6 md:flex-none">
          {/* Language Toggle */}
          <button 
            onClick={() => {
              synth.playClick();
              setLanguage(language === 'fr' ? 'ar' : 'fr');
            }}
            className="font-mono text-xs tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            {language === 'fr' ? 'AR' : 'FR'}
          </button>
          {/* Desktop Search */}
          <div className="relative hidden md:flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 160, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder={t('nav.search')}
                  className="bg-transparent border-b border-mm-neon-red text-sm text-white font-mono outline-none py-1 mr-2"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (viewState.view !== 'store') navigate('store');
                  }}
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => {
                synth.playClick();
                setSearchOpen(!searchOpen);
              }}
              className="text-gray-400 hover:text-mm-neon-red transition-colors"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Cart Icon */}
          <button 
            onClick={openCart}
            className="relative text-mm-offwhite hover:text-mm-neon-red transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-mm-neon-red text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center font-mono"
              >
                {cartCount}
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6 h-[100dvh]"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <span className="font-mono text-2xl font-bold tracking-[0.2em] text-mm-neon-red text-glow-red glitch-hover uppercase">
                  RED CYPHER
                </span>
              </div>
              <button onClick={() => {
                synth.playClick();
                setMobileMenuOpen(false);
              }} className="text-gray-400 hover:text-white">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 font-mono text-2xl tracking-widest">
              {/* Mobile Language Toggle */}
              <button 
                onClick={() => {
                  synth.playClick();
                  setLanguage(language === 'fr' ? 'ar' : 'fr');
                }}
                className="text-left font-mono text-xl tracking-widest text-mm-neon-red mb-4"
              >
                LANG: {language === 'fr' ? 'ARABE (DARIJA)' : 'FRANÇAIS'}
              </button>

              {/* Mobile Search */}
              <div className="relative flex items-center border-b border-mm-dark pb-2 mb-4">
                <Search size={24} className="text-gray-400 mr-4" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="bg-transparent text-xl text-white outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (viewState.view !== 'store') {
                      navigate('store');
                      setMobileMenuOpen(false);
                    }
                  }}
                />
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigate(link.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${viewState.view === link.id ? 'text-mm-neon-red' : 'text-gray-400'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
