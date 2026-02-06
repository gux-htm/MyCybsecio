import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    // Characters: Mix of binary, hex, and special chars for "Matrix" feel
    const chars = '01XYZ<>[]{}@#$%&*+=_';

    const draw = () => {
      // translucent black background to show trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#FFFF00'; // Cyber Yellow
      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Randomly brighten some characters
        if (Math.random() > 0.95) {
             ctx.fillStyle = '#FFFFFF'; 
        } else {
             ctx.fillStyle = '#FFFF00';
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-15"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default MatrixRain;