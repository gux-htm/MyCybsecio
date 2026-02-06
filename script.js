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
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

class MatrixEngine {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fontSize = 16;
        this.drops = [];
        this.chars = '01XYZ<>[]{}@#$%&*+=_';
        this.columns = 0;
        
        window.addEventListener('resize', debounce(() => this.init(), 250));
        window.addEventListener('resize', debounce(() => this.init(), 200));
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
    constructor() {
        this.canvas = document.getElementById('pixel-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pixelSize = 14;
        this.grid = [];
        this.cols = 0;
        this.rows = 0;
        this.imageData = null;
        this.buf32 = null;
        this.isLittleEndian = true;

        window.addEventListener('resize', debounce(() => this.init(), 250));
        window.addEventListener('resize', debounce(() => this.init(), 200));
        this.init();
        this.animate();
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.ceil(this.canvas.width / this.pixelSize);
        this.rows = Math.ceil(this.canvas.height / this.pixelSize);
        this.grid = new Array(this.cols * this.rows).fill(0).map(() => Math.random() > 0.9 ? 1 : 0);

        this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        this.buf32 = new Uint32Array(this.imageData.data.buffer);
        this.isLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
    }
    animate() {
        this.buf32.fill(0);

        const width = this.canvas.width;
        const height = this.canvas.height;
        const drawSize = this.pixelSize - 1;

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.grid[j * this.cols + i] === 1) {
                    const x = i * this.pixelSize;
                    const y = j * this.pixelSize;
                    const alpha = Math.floor((0.05 + Math.random() * 0.1) * 255);
                    let color;

                    if (this.isLittleEndian) {
                        color = 0x00FFFF | (alpha << 24);
                    } else {
                        color = 0xFFFF0000 | alpha;
                    }

                    for (let dy = 0; dy < drawSize; dy++) {
                        if (y + dy >= height) continue;
                        const rowOffset = (y + dy) * width;
                        for (let dx = 0; dx < drawSize; dx++) {
                            if (x + dx >= width) continue;
                            this.buf32[rowOffset + x + dx] = color;
                        }
                    }
                }
            }
        }

        this.ctx.putImageData(this.imageData, 0, 0);

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
    const logContainer = document.getElementById('boot-logs');
    for (const log of logs) {
        const div = document.createElement('div');
        div.className = "border-l-2 border-cyber-yellow pl-2 opacity-0 transition-opacity duration-300";

        const arrow = document.createElement('span');
        arrow.className = "font-bold";
        arrow.textContent = ">>";

        div.appendChild(arrow);
        div.appendChild(document.createTextNode(" " + log));

        logContainer.appendChild(div);
        await new Promise(r => setTimeout(r, 400));
        div.style.opacity = '1';
    }
    await new Promise(r => setTimeout(r, 800));
    const bootScreen = document.getElementById('boot-screen');
    bootScreen.style.opacity = '0';
    setTimeout(() => {
        bootScreen.remove();
        const mainApp = document.getElementById('main-app');
        mainApp.classList.remove('hidden-content');
        mainApp.classList.add('visible-content');
    }, 500);
}

function renderPortfolio() {
    // Hero
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) heroDesc.innerText = PORTFOLIO_DATA.hero;
    
    // Clock
    setInterval(() => {
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
    }, 1000);

    // Skills
    const skillList = document.getElementById('skills-list');
    if (skillList) {
        let skillsHtml = '';
        PORTFOLIO_DATA.skills.forEach(s => {
            const blocks = Math.floor(s.value / 5);

            const wrapper = document.createElement('div');
            wrapper.className = "space-y-2";

            const header = document.createElement('div');
            header.className = "flex justify-between text-[10px] font-black tracking-widest uppercase";

            const nameSpan = document.createElement('span');
            nameSpan.textContent = s.name;

            const valueSpan = document.createElement('span');
            valueSpan.className = "opacity-40";
            valueSpan.textContent = `${s.value}%`;

            header.appendChild(nameSpan);
            header.appendChild(valueSpan);

            const blocksContainer = document.createElement('div');
            blocksContainer.className = "flex gap-1 overflow-hidden";

            for(let i=0; i<20; i++) {
                const block = document.createElement('div');
                block.className = `h-4 w-2 sm:w-3 skew-x-[-20deg] ${i < blocks ? 'bg-cyber-yellow' : 'bg-cyber-yellow/10'}`;
                blocksContainer.appendChild(block);
            }
            skillsHtml += `
                <div class="space-y-2">
                    <div class="flex justify-between text-[10px] font-black tracking-widest uppercase">
                        <span>${s.name}</span>
                        <span class="opacity-40">${s.value}%</span>
                    </div>
                    <div class="flex gap-1 overflow-hidden">${blocksHtml}</div>
                </div>`;

            wrapper.appendChild(header);
            wrapper.appendChild(blocksContainer);
            skillList.appendChild(wrapper);
        });
        skillList.innerHTML = skillsHtml;
    }

    // Certs
    const certsList = document.getElementById('certs-list');
    if (certsList) {
        PORTFOLIO_DATA.certs.forEach(c => {
            const row = document.createElement('div');
            row.className = "py-4 flex justify-between items-center group cursor-pointer hover:bg-cyber-yellow/5 px-2 transition-all";

            const leftDiv = document.createElement('div');
            leftDiv.className = "flex items-center gap-4";

            const iconContainer = document.createElement('div');
            iconContainer.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/><path d="M15 7a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"/></svg>`;
            leftDiv.appendChild(iconContainer.firstElementChild);

            const infoDiv = document.createElement('div');

            const titleDiv = document.createElement('div');
            titleDiv.className = "text-[11px] font-black uppercase text-white";
            titleDiv.textContent = c.title;

            const issuerDiv = document.createElement('div');
            issuerDiv.className = "text-[9px] font-mono opacity-40 uppercase";
            issuerDiv.textContent = `${c.issuer} // ${c.year}`;

            infoDiv.appendChild(titleDiv);
            infoDiv.appendChild(issuerDiv);
            leftDiv.appendChild(infoDiv);

            const arrowContainer = document.createElement('div');
            arrowContainer.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-30 group-hover:opacity-100"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="m15 3 6 6"/><path d="M10 14 21 3"/></svg>`;

            row.appendChild(leftDiv);
            row.appendChild(arrowContainer.firstElementChild);

            certsList.appendChild(row);
        });
    }

    // Projects
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        PORTFOLIO_DATA.projects.forEach(p => {
            const card = document.createElement('div');
            card.className = "tactical-frame group";

            // Corners
            const corners = ['tl', 'tr', 'bl', 'br'];
            corners.forEach(c => {
                const corner = document.createElement('div');
                corner.className = `${c} corner`;
                card.appendChild(corner);
            });

            // Image Container
            const imgContainer = document.createElement('div');
            imgContainer.className = "aspect-video relative overflow-hidden mb-4 border border-cyber-yellow/20";

            const img = document.createElement('img');
            img.src = p.img;
            img.className = "w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700";
            imgContainer.appendChild(img);

            card.appendChild(imgContainer);

            // Title
            const h3 = document.createElement('h3');
            h3.className = "text-md font-black uppercase text-white mb-2";
            h3.textContent = p.title;
            card.appendChild(h3);

            // Desc
            const pDesc = document.createElement('p');
            pDesc.className = "text-[10px] font-mono text-cyber-yellow/60 uppercase mb-4";
            pDesc.textContent = p.desc;
            card.appendChild(pDesc);

            // Tech
            const techDiv = document.createElement('div');
            techDiv.className = "text-[9px] border border-cyber-yellow/40 px-2 py-1 font-bold inline-block";
            techDiv.textContent = p.tech;
            card.appendChild(techDiv);

            projectsList.appendChild(card);
        });
    }
}

// --- INITIALIZE ---
window.addEventListener('DOMContentLoaded', () => {
    new MatrixEngine();
    new PixelEngine();
    renderPortfolio();
    startBootSequence();
});
