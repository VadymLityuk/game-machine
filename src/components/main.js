import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';

// const sizes
const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 600;

const app = new PIXI.Application({
    backgroundColor: 0x1a1a1a,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    autoDensity: true, // retina display suport
});

document.body.appendChild(app.view);

// resize main page
function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scale = Math.min(windowWidth / DESIGN_WIDTH, windowHeight / DESIGN_HEIGHT);

    app.renderer.resize(windowWidth, windowHeight);
    
    // the main page scene scales
    app.stage.scale.set(scale);
    app.stage.x = (windowWidth - DESIGN_WIDTH * scale) / 2;
    app.stage.y = (windowHeight - DESIGN_HEIGHT * scale) / 2;
}

window.addEventListener('resize', resize);
resize(); // Вызываем сразу при старте

// preloader
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
    assetsManifest.forEach(asset => PIXI.Assets.add(asset.alias, asset.src));

    try {
        await PIXI.Assets.load(assetsManifest.map(a => a.alias), (progress) => {
            loadingText.text = `Loading: ${Math.round(progress * 100)}%`;
        });

        app.stage.removeChild(loadingText);
        initGame(); // the game starts here after loading
    } catch (e) {
        console.error('Loading error:', e);
        loadingText.text = 'Error!';
    }
}

function initGame() {
    console.log('Game Started!');
    // furuture game logic
}

setup();