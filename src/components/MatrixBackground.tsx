import React, { useEffect, useRef } from 'react';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nums = '0123456789'.split('');
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    
    for (let x = 0; x < columns; x++) {
      // Start drops at random negative positions so they don't all fall at once
      drops[x] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only draw if drop is on screen
        if (drops[i] * fontSize > 0) {
          const text = nums[Math.floor(Math.random() * nums.length)];
          
          // Glitch effect: occasionally draw white characters or offset them slightly
          const isGlitch = Math.random() > 0.95;
          const xOffset = isGlitch ? (Math.random() - 0.5) * 10 : 0;
          
          ctx.fillStyle = isGlitch ? '#FFFFFF' : '#FF003C';
          ctx.fillText(text, (i * fontSize) + xOffset, drops[i] * fontSize);
        }

        // Reset drop to top randomly when it goes off screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);
    const interval = setInterval(draw, 50);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-mm-black">
      {/* Red light gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,0,60,0.15),transparent_50%)] z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mm-neon-red/10 rounded-full blur-[100px] z-10 mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mm-neon-red/10 rounded-full blur-[100px] z-10 mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen z-10" />
      
      {/* Fade out to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mm-black/60 to-mm-black z-20" />
    </div>
  );
};
