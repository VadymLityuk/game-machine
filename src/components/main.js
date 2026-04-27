import '../assets/styles/main.css';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x2c3e50, // dark bg for border
    resolution: window.devicePixelRatio || 1,
});

// add canvas to the html
document.body.appendChild(app.view);

console.log('Slot Machine Engine', PIXI.VERSION);