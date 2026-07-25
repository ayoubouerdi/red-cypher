import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Mail, Volume2, VolumeX } from 'lucide-react';
import { useAppContext } from '../context';
import { synth } from '../audio';

export const Footer: React.FC = () => {
  const { t, audioEnabled, setAudioEnabled, navigate } = useAppContext();

  useEffect(() => {
    if (audioEnabled) {
      synth.start();
    } else {
      synth.stop();
    }
    return () => {
      synth.stop();
    };
  }, [audioEnabled]);

  return (
    <footer className="border-t border-mm-dark bg-mm-black pt-16 pb-8 px-6 relative z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="mb-6">
            <img src="/logo.png" alt="Red Cypher Logo" className="h-16 scale-[1.2] origin-left object-contain filter drop-shadow-[0_0_10px_rgba(255,0,60,0.6)]" />
          </div>
          <p className="text-gray-500 max-w-sm mb-6 text-sm">
            {t('footer.desc')}
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-mm-neon-red transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-mm-neon-red transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-mm-neon-red transition-colors"><Mail size={20} /></a>
            <div className="w-px h-4 bg-mm-dark mx-2" />
            <button 
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`flex items-center gap-2 text-xs font-mono tracking-widest transition-colors ${audioEnabled ? 'text-mm-neon-red' : 'hover:text-white'}`}
              title="Atmosphere Audio"
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-sm tracking-widest text-white mb-6">{t('footer.links')}</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-mono">
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.faq')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.shipping')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.size')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
            <li><button onClick={() => navigate('admin')} className="hover:text-white transition-colors uppercase">{t('nav.admin')}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm tracking-widest text-white mb-6">{t('footer.newsletter')}</h4>
          <p className="text-xs text-gray-500 mb-4">{t('footer.newsletter.desc')}</p>
          <form className="flex border border-mm-dark focus-within:border-mm-neon-red transition-colors">
            <input 
              type="email" 
              placeholder={t('footer.newsletter.input')} 
              className="bg-transparent w-full px-4 py-2 text-sm text-white font-mono outline-none"
            />
            <button 
              type="submit" 
              className="bg-mm-dark px-4 font-mono text-xs hover:bg-mm-neon-red hover:text-white transition-colors"
            >
              {t('footer.newsletter.btn')}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-mm-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
        <p>{t('footer.copyright')}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400 transition-colors">{t('footer.legal')}</a>
          <a href="#" className="hover:text-gray-400 transition-colors">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  );
};
