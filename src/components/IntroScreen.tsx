import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context';
import { synth } from '../audio';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const { t, setAudioEnabled } = useAppContext();
  const [cipher, setCipher] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const targetText = t('intro.target');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDecoding) {
      let iteration = 0;
      interval = setInterval(() => {
        setCipher(targetText.split('').map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        
        if (iteration >= targetText.length) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
        
        iteration += 1 / 3;
      }, 50);
    } else {
      // Just random characters changing until click
      interval = setInterval(() => {
        let randomStr = '';
        for(let i=0; i<targetText.length; i++) {
           randomStr += chars[Math.floor(Math.random() * chars.length)];
        }
        setCipher(randomStr);
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isDecoding, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-mm-black flex flex-col items-center justify-center font-mono text-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-4xl md:text-6xl tracking-[0.5em] font-bold text-glow-red glitch-continuous mb-12 text-center break-all px-4">
        {cipher || targetText.replace(/./g, '0')}
      </div>
      
      {!isDecoding && (
        <button 
          onClick={() => {
            setIsDecoding(true);
            setAudioEnabled(true);
            // We defer playClick slightly because audio context is starting
            setTimeout(() => synth.playClick(), 50);
          }}
          className="text-sm tracking-widest text-mm-neon-red border border-mm-neon-red px-6 py-3 hover:bg-mm-neon-red hover:text-white transition-colors"
        >
          {t('intro.btn')}
        </button>
      )}
    </motion.div>
  );
};
