import { describe, it, expect } from 'vitest';
import { getScreen, calculateWins } from '../../src/model/slotMath.js';

describe('Slot Machine Math Engine', () => {

    it('must correctly identify symbols for those positions: 0, 0, 0, 0, 0', () => {
        const positions = [0, 0, 0, 0, 0];
        const screen = getScreen(positions);
        
        // first column symbols for row 0,1,2
        expect(screen[0][0]).toBe('hv2');
        expect(screen[1][0]).toBe('hv1');
        expect(screen[2][0]).toBe('lv1');
    });

    it('must return Total wins: 6 for example 1 from the specification', () => {
        //  Positions: 0, 11, 1, 10, 14
        const positions = [0, 11, 1, 10, 14];
        const screen = getScreen(positions);
        const result = calculateWins(screen);

        expect(result.totalWin).toBe(6);
        // verifying payline 2, hv2 x3 = 5 монет
        const winLine2 = result.winDetails.find(w => w.lineId === 2);
        expect(winLine2.payout).toBe(5);
        expect(winLine2.symbol).toBe('hv2');
    });

    it('must return Total wins: 1 for initial positions 0,0,0,0,0', () => {
        const positions = [0, 0, 0, 0, 0];
        const screen = getScreen(positions);
        const result = calculateWins(screen);

        expect(result.totalWin).toBe(1); // third line win, lv1 x 3 - 1 coin
    });

    it('must return 0 if no wins are available', () => {
        // Positions: 18, 9, 2, 0, 12
        const positions = [18, 9, 2, 0, 12];
        const screen = getScreen(positions);
        const result = calculateWins(screen);

        expect(result.totalWin).toBe(0);
    });
});