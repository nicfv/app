import { borders } from '../../assets/borders.json' with { type: 'json' };
import { solutions } from '../../assets/solutions.json' with { type: 'json' };
import { SMath } from 'smath';
import { daysSinceEpoch } from '../state';

/**
 * Represents the name of a point of interest
 */
type SolutionName = keyof typeof solutions;
// Generate a pseudorandom point of interest
const allSolutions: SolutionName[] = Object.keys(solutions) as SolutionName[];
const numSolutions: number = allSolutions.length;
let ran: number = SMath.clamp(numSolutions / 2 - 1, 1, Infinity) | 0;
while (ran > 1) {
    // Check if coprime
    if (SMath.gcd(numSolutions, ran) === 1) {
        break;
    }
    ran--;
}
const solutionId: number = (daysSinceEpoch() * ran) % numSolutions;
const solutionName: SolutionName = allSolutions[solutionId];
const solution = solutions[solutionName];
/**
 * The name of the point of interest
 */
export const name: SolutionName = solutionName;
/**
 * The hint for the point of interest
 */
export const hint: string = solution.hint;
/**
 * The correct answer for this game
 */
export const correct: string = solution.region;
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
