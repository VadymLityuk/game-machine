import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';
import { SlotGame } from './SlotGame.js';
import { ASSETS_MANIFEST, DESIGN_RES } from '../model/config.js';

const app = new PIXI.Application({
    backgroundColor: 0x1a1a1a,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    autoDensity: true,
});
document.body.appendChild(app.view);

function resize() {
    const scale = Math.min(window.innerWidth / DESIGN_RES.width, window.innerHeight / DESIGN_RES.height);
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.set(scale);
    app.stage.x = (window.innerWidth - DESIGN_RES.width * scale) / 2;
    app.stage.y = (window.innerHeight - DESIGN_RES.height * scale) / 2;
}

window.addEventListener('resize', resize);
resize();

// preloader
const loadingText = new PIXI.Text('Loading: 0%', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
loadingText.anchor.set(0.5);
loadingText.x = DESIGN_RES.width / 2;
loadingText.y = DESIGN_RES.height / 2;

app.stage.addChild(loadingText);

async function setup() {
    ASSETS_MANIFEST.forEach(asset => PIXI.Assets.add(asset)); // Используем манифест из конфига
    
    try {
        await PIXI.Assets.load(ASSETS_MANIFEST.map(a => a.alias), (p) => {
            loadingText.text = `Loading: ${Math.round(p * 100)}%`;
        });
        app.stage.removeChild(loadingText);
        
        // game instance
        const game = new SlotGame(DESIGN_RES.width, DESIGN_RES.height);
        app.stage.addChild(game);
        
    } catch (e) {
        loadingText.text = 'Error!';
    }
}
setup();