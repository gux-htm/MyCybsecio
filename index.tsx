// --- PORTFOLIO DATA ---
const PORTFOLIO_DATA = {
    hero: "OFFENSIVE SECURITY RESEARCHER & FULL-STACK ARCHITECT. SPECIALIZING IN ZERO-TRUST INFRASTRUCTURE, KERNEL-LEVEL VULNERABILITY RESEARCH, AND DEVELOPING UNBREACHABLE DECENTRALIZED PROTOCOLS.",
    skills: [
        { name: 'VULN_RESEARCH', value: 95 },
        { name: 'EXP_DEVELOPMENT', value: 90 },
        { name: 'REACT_ENGINEERING', value: 92 },
        { name: 'CLOUD_HARDENING', value: 85 },
        { name: 'ZK_PROOFS', value: 78 }
    ],
    certs: [
        { title: 'OSCP // Offensive Security Certified Professional', issuer: 'OffSec', year: '2023' },
        { title: 'AWS Certified Security - Specialty', issuer: 'AWS', year: '2024' },
        { title: 'CEH Master // Certified Ethical Hacker', issuer: 'EC-Council', year: '2023' }
    ],
    projects: [
        { id: '01', title: 'SENTINEL KERNEL', tech: 'C / ASM / RUST', desc: 'Kernel hardening module with real-time entropy analysis.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800' },
        { id: '02', title: 'VOID-PROTOCOL', tech: 'GO / SOLIDITY', desc: 'Layer-2 scaling for private state transitions.', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800' },
        { id: '03', title: 'ONYX RADAR', tech: 'PYTHON / ELASTIC', desc: 'Enterprise SIEM platform with automated incident response.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?w=800' }
    ]
};

// --- BACKGROUND ENGINES ---
class MatrixEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fontSize: number;
    drops: number[];
    chars: string;
    columns: number = 0;

    constructor() {
        this.canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.fontSize = 16;
        this.drops = [];
        this.chars = '01XYZ<>[]{}@#$%&*+=_';
        window.addEventListener('resize', () => this.init());
        this.init();
        this.draw();
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = `${this.fontSize}px "JetBrains Mono"`;
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillStyle = Math.random() > 0.98 ? '#FFF' : '#FF0';
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) this.drops[i] = 0;
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.draw());
    }
}

class PixelEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pixelSize: number;
    grid: number[];
    cols: number = 0;
    rows: number = 0;

    constructor() {
        this.canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.pixelSize = 14;
        this.grid = [];
        window.addEventListener('resize', () => this.init());
        this.init();
        this.animate();
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.ceil(this.canvas.width / this.pixelSize);
        this.rows = Math.ceil(this.canvas.height / this.pixelSize);
        this.grid = new Array(this.cols * this.rows).fill(0).map(() => Math.random() > 0.9 ? 1 : 0);
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#FF0';
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.grid[j * this.cols + i] === 1) {
                    this.ctx.globalAlpha = 0.05 + Math.random() * 0.1;
                    this.ctx.fillRect(i * this.pixelSize, j * this.pixelSize, this.pixelSize - 1, this.pixelSize - 1);
                }
            }
        }
        if (Math.random() > 0.9) this.grid[Math.floor(Math.random() * this.grid.length)] = Math.random() > 0.5 ? 1 : 0;
        setTimeout(() => requestAnimationFrame(() => this.animate()), 100);
    }
}

// --- CORE LOGIC ---
async function startBootSequence() {
    const logs = [
        "ESTABLISHING SECURE HANDSHAKE...",
        "BYPASSING KERNEL AUTHENTICATION...",
        "LOADING NEURAL MODULES...",
        "INITIALIZING THREAT RADAR...",
        "UPLINK SUCCESSFUL. WELCOME OPERATOR."
    ];
    const logContainer = document.getElementById('boot-logs')!;
    for (const log of logs) {
        const div = document.createElement('div');
        div.className = "border-l-2 border-cyber-yellow pl-2 opacity-0 transition-opacity duration-300";
        div.innerHTML = `<span class="font-bold">>></span> ${log}`;
        logContainer.appendChild(div);
        await new Promise(r => setTimeout(r, 400));
        div.style.opacity = '1';
    }
    await new Promise(r => setTimeout(r, 800));
    document.getElementById('boot-screen')!.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('boot-screen')!.remove();
        document.getElementById('main-app')!.classList.remove('hidden-content');
        document.getElementById('main-app')!.classList.add('visible-content');
    }, 500);
}

function renderPortfolio() {
    // Hero
    document.getElementById('hero-desc')!.innerText = PORTFOLIO_DATA.hero;
    
    // Clock
    setInterval(() => {
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
    }, 1000);

    // Skills
    const skillList = document.getElementById('skills-list')!;
    PORTFOLIO_DATA.skills.forEach(s => {
        const blocks = Math.floor(s.value / 5);
        let blocksHtml = '';
        for(let i=0; i<20; i++) {
            blocksHtml += `<div class="h-4 w-2 sm:w-3 skew-x-[-20deg] ${i < blocks ? 'bg-cyber-yellow' : 'bg-cyber-yellow/10'}"></div>`;
        }
        skillList.innerHTML += `
            <div class="space-y-2">
                <div class="flex justify-between text-[10px] font-black tracking-widest uppercase">
                    <span>${s.name}</span>
                    <span class="opacity-40">${s.value}%</span>
                </div>
                <div class="flex gap-1 overflow-hidden">${blocksHtml}</div>
            </div>`;
    });

    // Certs
    const certsList = document.getElementById('certs-list')!;
    PORTFOLIO_DATA.certs.forEach(c => {
        certsList.innerHTML += `
            <div class="py-4 flex justify-between items-center group cursor-pointer hover:bg-cyber-yellow/5 px-2 transition-all">
                <div class="flex items-center gap-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/><path d="M15 7a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"/></svg>
                    <div>
                        <div class="text-[11px] font-black uppercase text-white">${c.title}</div>
                        <div class="text-[9px] font-mono opacity-40 uppercase">${c.issuer} // ${c.year}</div>
                    </div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-30 group-hover:opacity-100"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="m15 3 6 6"/><path d="M10 14 21 3"/></svg>
            </div>`;
    });

    // Projects
    const projectsList = document.getElementById('projects-list')!;
    PORTFOLIO_DATA.projects.forEach(p => {
        projectsList.innerHTML += `
            <div class="tactical-frame group">
                <div class="tl corner"></div><div class="tr corner"></div><div class="bl corner"></div><div class="br corner"></div>
                <div class="aspect-video relative overflow-hidden mb-4 border border-cyber-yellow/20">
                    <img src="${p.img}" class="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                </div>
                <h3 class="text-md font-black uppercase text-white mb-2">${p.title}</h3>
                <p class="text-[10px] font-mono text-cyber-yellow/60 uppercase mb-4">${p.desc}</p>
                <div class="text-[9px] border border-cyber-yellow/40 px-2 py-1 font-bold inline-block">${p.tech}</div>
            </div>`;
    });
}

// --- INITIALIZE ---
window.addEventListener('DOMContentLoaded', () => {
    new MatrixEngine();
    new PixelEngine();
    renderPortfolio();
    startBootSequence();
});