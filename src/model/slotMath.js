import { REEL_BANDS, PAYTABLE, PAYLINES } from './config.js';

export function getScreen(positions) {
    const screen = [];
    for (let col = 0; col < 5; col++) {
        const columnSymbols = [];
        for (let row = 0; row < 3; row++) {
            const bandIndex = (positions[col] + row) % REEL_BANDS[col].length;
            columnSymbols.push(REEL_BANDS[col][bandIndex]);
        }
        screen.push(columnSymbols);
    }
    return screen;
}

export function calculateWins(screen) {
    let totalWin = 0;
    const winDetails = [];

    PAYLINES.forEach(line => {
        const firstSymbol = screen[0][line.pattern[0]];
        let matchCount = 1;

        for (let col = 1; col < 5; col++) {
            const currentSymbol = screen[col][line.pattern[col]];
            if (currentSymbol === firstSymbol) {
                matchCount++;
            } else {
                break;
            }
        }

        if (matchCount >= 3) {
            const payout = PAYTABLE[firstSymbol][matchCount];
            if (payout) {
                totalWin += payout;
                winDetails.push({
                    lineId: line.id,
                    symbol: firstSymbol,
                    count: matchCount,
                    payout: payout
                });
            }
        }
    });

    return { totalWin, winDetails };
}

export function getRandomPositions() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 20));
}