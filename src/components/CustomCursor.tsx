import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Check for touch devices to disable custom cursor
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      const isInteractive = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
                            
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || isHidden) return null;

  return (
    <>
      {/* Center Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <div className="w-0.5 h-full bg-mm-neon-red absolute" />
        <div className="w-full h-0.5 bg-mm-neon-red absolute" />
      </motion.div>
      
      {/* Camera Viewfinder Corners */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isClicking ? 0.9 : (isHovering ? 1.2 : 1),
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-mm-neon-red" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-mm-neon-red" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-mm-neon-red" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-mm-neon-red" />
      </motion.div>

      {/* Cyber/Camera data string */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen font-mono text-[9px] text-mm-neon-red whitespace-nowrap tracking-widest"
        animate={{
          x: position.x + 20,
          y: position.y + 20,
          opacity: isHovering ? 1 : 0.5,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        {isHovering ? 'TARGET_LOCK' : `REC_POS:${position.x.toString().padStart(4, '0')}:${position.y.toString().padStart(4, '0')}`}
      </motion.div>
    </>
  );
};
