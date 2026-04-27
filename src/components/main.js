import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';
import { SlotGame } from './SlotGame.js';

const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 600;

const app = new PIXI.Application({
    backgroundColor: 0x1a1a1a,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    autoDensity: true,
});
document.body.appendChild(app.view);

function resize() {
    const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.set(scale);
    app.stage.x = (window.innerWidth - DESIGN_WIDTH * scale) / 2;
    app.stage.y = (window.innerHeight - DESIGN_HEIGHT * scale) / 2;
}

window.addEventListener('resize', resize);
resize();

// Preloader
const loadingText = new PIXI.Text('Loading: 0%', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
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
    assetsManifest.forEach(asset => PIXI.Assets.add(asset));
    try {
        await PIXI.Assets.load(assetsManifest.map(a => a.alias), (p) => {
            loadingText.text = `Loading: ${Math.round(p * 100)}%`;
        });
        app.stage.removeChild(loadingText);
        
        // the game instance
        const game = new SlotGame(DESIGN_WIDTH, DESIGN_HEIGHT);
        app.stage.addChild(game);
        
    } catch (e) {
        loadingText.text = 'Error!';
    }
}
setup();