import React, { useEffect, useRef } from 'react';

const PixelBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Configuration
    const PIXEL_SIZE = 14; // Size of each cell
    const UPDATE_INTERVAL = 60; // Update every 60ms (approx 15fps) for retro feel
    const COLOR = '#FFFF00'; // Cyber Yellow

    let cols = Math.ceil(width / PIXEL_SIZE);
    let rows = Math.ceil(height / PIXEL_SIZE);
    
    // Initialize grid with noise
    let grid: number[] = new Array(cols * rows).fill(0).map(() => Math.random() > 0.85 ? 1 : 0);
    let nextGrid: number[] = new Array(cols * rows).fill(0);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / PIXEL_SIZE);
      rows = Math.ceil(height / PIXEL_SIZE);
      // Re-init on resize
      grid = new Array(cols * rows).fill(0).map(() => Math.random() > 0.85 ? 1 : 0);
      nextGrid = new Array(cols * rows).fill(0);
    };

    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    resize();

    let lastTime = 0;

    const getIndex = (x: number, y: number) => {
        const wrappedX = (x + cols) % cols;
        const wrappedY = (y + rows) % rows;
        return wrappedY * cols + wrappedX;
    }

    const update = () => {
        let changed = false;
        
        // Mouse interaction: spawn cells under cursor
        if (mouseRef.current.x >= 0) {
            const mx = Math.floor(mouseRef.current.x / PIXEL_SIZE);
            const my = Math.floor(mouseRef.current.y / PIXEL_SIZE);
            for(let n=0; n<3; n++) {
                 const nx = mx + Math.floor(Math.random()*4 - 2);
                 const ny = my + Math.floor(Math.random()*4 - 2);
                 grid[getIndex(nx, ny)] = 1;
            }
        }

        // Game of Life Logic
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const idx = getIndex(i, j);
                const state = grid[idx];
                
                // Count neighbors
                let neighbors = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x === 0 && y === 0) continue;
                        neighbors += grid[getIndex(i + x, j + y)];
                    }
                }

                // Rules: B3/S23
                if (state === 0 && neighbors === 3) {
                    nextGrid[idx] = 1;
                    changed = true;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    nextGrid[idx] = 0;
                    changed = true;
                } else {
                    nextGrid[idx] = state;
                }
            }
        }

        // Swap buffers
        const temp = grid;
        grid = nextGrid;
        nextGrid = temp;
        
        // Randomly inject noise if things get too quiet
        if (!changed || Math.random() > 0.98) {
             const cx = Math.floor(Math.random() * cols);
             const cy = Math.floor(Math.random() * rows);
             for(let n=0; n<5; n++) {
                 const nx = cx + Math.floor(Math.random()*6 - 3);
                 const ny = cy + Math.floor(Math.random()*6 - 3);
                 grid[getIndex(nx, ny)] = 1;
             }
        }
    };

    const draw = (time: number) => {
      requestAnimationFrame(draw);

      const deltaTime = time - lastTime;
      if (deltaTime < UPDATE_INTERVAL) return;
      lastTime = time;

      update();

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid lines
      ctx.fillStyle = 'rgba(255, 255, 0, 0.02)';
      for (let x = 0; x < cols; x++) {
          if (x % 4 === 0) ctx.fillRect(x * PIXEL_SIZE, 0, 1, height);
      }
      for (let y = 0; y < rows; y++) {
          if (y % 4 === 0) ctx.fillRect(0, y * PIXEL_SIZE, width, 1);
      }

      // Draw active cells
      ctx.fillStyle = COLOR;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[getIndex(i, j)] === 1) {
                // Pixel style: solid squares with slight opacity variation for "flicker"
                ctx.globalAlpha = 0.1 + (Math.random() * 0.25); 
                ctx.fillRect(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
            }
        }
      }
      ctx.globalAlpha = 1.0;
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default PixelBackground;