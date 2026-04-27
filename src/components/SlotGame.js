import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';
import { getScreen, getRandomPositions, calculateWins } from '../model/slotMath.js';


export class SlotGame extends PIXI.Container {
    constructor(designWidth, designHeight) {
        super();
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.reels = [];
        this.winText = null;
        this.init();
    }

    init() {
        const initialPositions = [0, 0, 0, 0, 0];
        const screenSymbols = getScreen(initialPositions);

        // 1. Reels
        const reelsContainer = new PIXI.Container();
        for (let i = 0; i < 5; i++) {
            const reel = new Reel(i, screenSymbols[i]);
            reel.x = i * 145;
            reelsContainer.addChild(reel);
            this.reels.push(reel);
        }
        reelsContainer.x = (this.designWidth - reelsContainer.width) / 2;
        reelsContainer.y = 20;
        this.addChild(reelsContainer);

        // 2. Spin Button
        const spinButton = new PIXI.Sprite(PIXI.Assets.get('spin_button'));
        spinButton.anchor.set(0.5);
        spinButton.width = 120;
        spinButton.height = 120;
        spinButton.x = this.designWidth / 2;
        spinButton.y = reelsContainer.y + reelsContainer.height + 70;
        spinButton.eventMode = 'static';
        spinButton.cursor = 'pointer';

        const baseScale = spinButton.scale.x;
        spinButton.on('pointerdown', () => spinButton.scale.set(baseScale * 0.9));
        spinButton.on('pointerup', () => {
            spinButton.scale.set(baseScale);
            this.onSpin();
        });
        this.addChild(spinButton);

        // 3. Win Text
        this.winText = new PIXI.Text('Press SPIN to start', {
            fontFamily: 'Arial', fontSize: 20, fill: 0xffff00, align: 'center',
            wordWrap: true, wordWrapWidth: this.designWidth - 40
        });
        this.winText.anchor.set(0.5, 0);
        this.winText.x = this.designWidth / 2;
        this.winText.y = spinButton.y + 70;
        this.addChild(this.winText);
    }

    onSpin() {
        const newPositions = getRandomPositions();
        const newScreen = getScreen(newPositions);
        this.reels.forEach((reel, i) => reel.updateSymbols(newScreen[i]));

        const result = calculateWins(newScreen);
        this.updateWinDisplay(result);
    }

    updateWinDisplay(result) {
        if (result.totalWin > 0) {
            let details = `Total wins: ${result.totalWin}\n`;
            result.winDetails.forEach(win => {
                details += `- payline ${win.lineId}, ${win.symbol} x${win.count}, ${win.payout}\n`;
            });
            this.winText.text = details;
        } else {
            this.winText.text = 'Total wins: 0';
        }
    }
}