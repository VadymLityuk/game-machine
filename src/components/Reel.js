import * as PIXI from 'pixi.js';

export class Reel extends PIXI.Container {
    constructor(columnIndex, symbols) {
        super();
        
        this.columnIndex = columnIndex;
        this.symbolSprites = [];
        
        // size const for symbols
        this.symbolHeight = 110; 
        this.reelWidth = 130;

        // spin weel symbols
        symbols.forEach((symbolId, rowIndex) => {
            const sprite = new PIXI.Sprite(PIXI.Assets.get(symbolId));
            
            // center position
            sprite.anchor.set(0.5);
            sprite.x = this.reelWidth / 2;
            sprite.y = rowIndex * this.symbolHeight + (this.symbolHeight / 2);
            
            // size slot fit
            sprite.width = 90;
            sprite.height = 90;

            this.addChild(sprite);
            this.symbolSprites.push(sprite);
        });
    }

    // update method for symbol changes 
    updateSymbols(newSymbols) {
        newSymbols.forEach((symbolId, index) => {
            this.symbolSprites[index].texture = PIXI.Assets.get(symbolId);
        });
    }

}