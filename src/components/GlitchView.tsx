import React from 'react';
import { motion } from 'motion/react';

interface GlitchViewProps {
  children: React.ReactNode;
  viewKey: string;
}

const glitchVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(5px) hue-rotate(90deg) contrast(200%)',
    x: -20,
    clipPath: 'polygon(0 10%, 100% 10%, 100% 20%, 0 20%)'
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px) hue-rotate(0deg) contrast(100%)',
    x: [ -20, 20, -10, 10, -5, 0 ],
    clipPath: [
      'polygon(0 10%, 100% 10%, 100% 20%, 0 20%)',
      'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
      'polygon(0 80%, 100% 80%, 100% 90%, 0 90%)',
      'polygon(0 20%, 100% 20%, 100% 30%, 0 30%)',
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
    ],
    transition: {
      duration: 0.4,
      ease: 'linear',
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  },
  exit: {
    opacity: 0,
    filter: 'blur(5px) hue-rotate(-90deg) contrast(200%)',
    x: 20,
    clipPath: 'polygon(0 30%, 100% 30%, 100% 40%, 0 40%)',
    transition: { duration: 0.2 }
  }
};

export const GlitchView: React.FC<GlitchViewProps> = ({ children, viewKey }) => {
  return (
    <motion.div
      key={viewKey}
      variants={glitchVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
