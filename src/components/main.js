import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';
import { getScreen, getRandomPositions, calculateWins } from '../model/slotMath.js';

const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 600;

let reels = []; 
let winText;

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
    console.log('Initializing Game UI...');

    const initialPositions = [0, 0, 0, 0, 0];
    const screenSymbols = getScreen(initialPositions);

    // reel container
    const reelsContainer = new PIXI.Container();
    for (let i = 0; i < 5; i++) {
        const reel = new Reel(i, screenSymbols[i]);
        reel.x = i * 135; 
        reelsContainer.addChild(reel);
        reels.push(reel);
    }
    
    reelsContainer.x = (DESIGN_WIDTH - reelsContainer.width) / 2;
    reelsContainer.y = 20; // add margin
    app.stage.addChild(reelsContainer);

    // spin button
    const spinButton = new PIXI.Sprite(PIXI.Assets.get('spin_button'));
    spinButton.anchor.set(0.5);
    
    // button size and postion
    spinButton.width = 120;
    spinButton.height = 120;
    
    spinButton.x = DESIGN_WIDTH / 2;
    spinButton.y = reelsContainer.y + reelsContainer.height + 70;
    
    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';

    // click effect
    const baseScale = spinButton.scale.x;
    spinButton.on('pointerdown', () => spinButton.scale.set(baseScale * 0.9));
    spinButton.on('pointerup', () => { 
        spinButton.scale.set(baseScale); 
        onSpin(); 
    });
    spinButton.on('pointerupoutside', () => spinButton.scale.set(baseScale));

    app.stage.addChild(spinButton);

    // win text
    winText = new PIXI.Text('Press SPIN to start', {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffff00,
        align: 'center',
        wordWrap: true,
        wordWrapWidth: DESIGN_WIDTH - 40
    });
    winText.anchor.set(0.5, 0); 
    winText.x = DESIGN_WIDTH / 2;
    //text under the button
    winText.y = spinButton.y + 70; 
    app.stage.addChild(winText);
}

function onSpin() {
    const newPositions = getRandomPositions();
    const newScreen = getScreen(newPositions);
    
    reels.forEach((reel, i) => {
        reel.updateSymbols(newScreen[i]);
    });

    const result = calculateWins(newScreen);

    if (result.totalWin > 0) {
        let details = `Total wins: ${result.totalWin}\n`;
        result.winDetails.forEach(win => {
            details += `- payline ${win.lineId}, ${win.symbol} x${win.count}, ${win.payout}\n`;
        });
        winText.text = details;
    } else {
        winText.text = 'Total wins: 0';
    }
    
    console.log('Spin Result:', result);
}

setup();