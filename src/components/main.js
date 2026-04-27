import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';
import { getScreen } from '../model/slotMath.js';

const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 600;

// update reel array to store instances of reel
let reels = []; 

const app = new PIXI.Application({
    backgroundColor: 0x1a1a1a,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    autoDensity: true,
});

document.body.appendChild(app.view);

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scale = Math.min(windowWidth / DESIGN_WIDTH, windowHeight / DESIGN_HEIGHT);

    app.renderer.resize(windowWidth, windowHeight);
    
    app.stage.scale.set(scale);
    app.stage.x = (windowWidth - DESIGN_WIDTH * scale) / 2;
    app.stage.y = (windowHeight - DESIGN_HEIGHT * scale) / 2;
}

window.addEventListener('resize', resize);
resize();

// Preloader
const loadingText = new PIXI.Text('Loading: 0%', {
    fontFamily: 'Arial', fontSize: 32, fill: 0xffffff
});
loadingText.anchor.set(0.5);
loadingText.x = DESIGN_WIDTH / 2;
loadingText.y = DESIGN_HEIGHT / 2;
app.stage.addChild(loadingText);

const assetsManifest = [
    { alias: 'hv1', src: '/assets/hv1_symbol.png' },
    { alias: 'hv2', src: '/assets/hv2_symbol.png' },
    { alias: 'hv3', src: '/assets/hv3_symbol.png' },
    { alias: 'hv4', src: '/assets/hv4_symbol.png' },
    { alias: 'lv1', src: '/assets/lv1_symbol.png' },
    { alias: 'lv2', src: '/assets/lv2_symbol.png' },
    { alias: 'lv3', src: '/assets/lv3_symbol.png' },
    { alias: 'lv4', src: '/assets/lv4_symbol.png' },
    { alias: 'spin_button', src: '/assets/spin_button.png' },
];

async function setup() {
    assetsManifest.forEach(asset => {
        PIXI.Assets.add({ alias: asset.alias, src: asset.src });
    });

    try {
        const assetsNames = assetsManifest.map(a => a.alias);
        await PIXI.Assets.load(assetsNames, (progress) => {
            loadingText.text = `Loading: ${Math.round(progress * 100)}%`;
        });

        app.stage.removeChild(loadingText);
        initGame(); 
    } catch (e) {
        console.error('Loading error:', e);
        loadingText.text = 'Error!';
    }
}

function initGame() {
    console.log('Initializing Reels...');

    const initialPositions = [0, 0, 0, 0, 0];
    const screenSymbols = getScreen(initialPositions);

    const reelsContainer = new PIXI.Container();
    
    for (let i = 0; i < 5; i++) {
        const reel = new Reel(i, screenSymbols[i]);
        reel.x = i * 150; 
        reelsContainer.addChild(reel);
        reels.push(reel);
    }

    // cemter reels container
    reelsContainer.x = (DESIGN_WIDTH - reelsContainer.width) / 2;
    reelsContainer.y = (DESIGN_HEIGHT - reelsContainer.height) / 2; 
    
    app.stage.addChild(reelsContainer);
}

setup();