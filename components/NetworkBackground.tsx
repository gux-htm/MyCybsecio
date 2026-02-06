import React, { useEffect, useRef } from 'react';

const NetworkBackground: React.FC = () => {
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

    // Configuration for the "Dome"
    const GLOBE_RADIUS = Math.min(width, height) * 0.75;
    const DOT_COUNT = 1500;
    const DOT_RADIUS = 1.2;
    const dots: { lat: number; lon: number }[] = [];

    // Generate points on a sphere surface (Fibonacci Sphere)
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);
      const theta = Math.PI * (1 + 5**0.5) * i;
      
      // We want a dome, so we might filter or just position the sphere lower
      dots.push({ lat: phi, lon: theta });
    }

    let rotation = 0;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.9; // Position low on screen

      ctx.fillStyle = '#FFFF00'; // Cyber Yellow

      rotation += 0.001;

      dots.forEach((dot) => {
        // Spherical to Cartesian
        // Rotate around Y axis
        const x = GLOBE_RADIUS * Math.sin(dot.lat) * Math.cos(dot.lon + rotation);
        const y = GLOBE_RADIUS * Math.cos(dot.lat); 
        const z = GLOBE_RADIUS * Math.sin(dot.lat) * Math.sin(dot.lon + rotation);

        // Tilt the globe slightly to see the "top" better
        // Rotate around X axis (tilt forward)
        const tilt = 0.3; 
        const y_tilted = y * Math.cos(tilt) - z * Math.sin(tilt);
        const z_tilted = y * Math.sin(tilt) + z * Math.cos(tilt);

        // Only draw top half-ish (y < 0 in original sphere coords, but we shifted center)
        // Actually, just drawing the whole sphere positioned low looks like a dome if we hide the back or clip it.
        // Let's rely on perspective and position.

        // Perspective projection
        const scale = 800 / (800 + z_tilted); 
        const px = cx + x * scale;
        const py = cy + y_tilted * scale;

        // Visibility check and fading
        if (z_tilted > -GLOBE_RADIUS && scale > 0) {
            // Calculate alpha based on depth (z) and "height" (y) to fade out bottom edges if needed
            const depthAlpha = (z_tilted + GLOBE_RADIUS) / (2 * GLOBE_RADIUS);
            
            // Fade out points that are "below" the horizon or too far back
            ctx.globalAlpha = Math.max(0.05, Math.min(1, depthAlpha));
            
            // Draw
            ctx.beginPath();
            ctx.arc(px, py, DOT_RADIUS * scale, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default NetworkBackground;