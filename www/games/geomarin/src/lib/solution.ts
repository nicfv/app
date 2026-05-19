import { borders } from '../../assets/borders.json' with { type: 'json' };
/**
 * The correct answer for this game
 */
export const correct = 'Bolinas';
/**
 * Close but incorrect answers for this game
 */
export const close: string[] = [];
// Determine close answers based on borders
for (const border of borders) {
    if (border.includes(correct)) {
        for (const region of border) {
            if (region !== correct && !close.includes(region)) {
                close.push(region);
            }
        }
    }
}
