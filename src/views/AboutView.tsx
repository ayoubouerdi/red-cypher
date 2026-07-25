import React from 'react';
import { useAppContext } from '../context';

export const AboutView: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-mm-neon-red rounded-full flex items-center justify-center mb-8 animate-[spin_10s_linear_infinite]">
        <div className="w-8 h-8 bg-mm-neon-red rotate-45" />
      </div>
      <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-glow">{t('about.title')}</h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed">
        {t('about.desc')}
      </p>
      <div className="p-8 border border-mm-dark bg-mm-dark/20 font-mono text-sm text-left w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-mm-neon-red" />
        <p className="text-gray-500 mb-2">{t('about.manifesto')}</p>
        <p className="text-white">
          {t('about.manifesto.1')}<br/><br/>
          {t('about.manifesto.2')}<br/>
          {t('about.manifesto.3')}<br/>
          {t('about.manifesto.4')}
        </p>
      </div>
    </div>
  );
};
