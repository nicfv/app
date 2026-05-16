import { Canvas } from 'graphico';
import { daysSinceEpoch } from './lib';

/**
 * Represents the state of the game
 */
export interface GameState {
    /**
     * The guesses made by the player for this game
     */
    readonly guesses: string[];
    /**
     * The number of puzzles the player has solved
     */
    solved: number;
    /**
     * The current streak of consecutive days the player has solved the puzzle
     */
    streak: number;
    /**
     * The last time the player solved this game, in days since epoch
     */
    lastSolved: number;
    /**
     * The last time the player opened this game, in days since epoch
     */
    readonly lastOpened: number;
}
/**
 * Load game state.
 */
export function loadData(rawData: Partial<GameState> | undefined): GameState {
    if (!rawData) {
        return {
            guesses: [],
            solved: 0,
            streak: 0,
            lastSolved: 0,
            lastOpened: daysSinceEpoch(),
        };
    }
    // If the game was last opened before today, reset guesses but keep solved and streak data
    if (typeof rawData.lastOpened === 'number' && rawData.lastOpened > daysSinceEpoch()) {
        return {
            guesses: [],
            solved: rawData.solved ?? 0,
            streak: rawData.streak ?? 0,
            lastSolved: rawData.lastSolved ?? 0,
            lastOpened: daysSinceEpoch(),
        };
    }
    return {
        guesses: rawData.guesses ?? [],
        solved: rawData.solved ?? 0,
        streak: rawData.streak ?? 0,
        lastSolved: rawData.lastSolved ?? 0,
        lastOpened: daysSinceEpoch(),
    }
}
/**
 * Save game state.
 */
export function saveData(state: GameState): void {
    canvas.saveData<GameState>(state, 'geomarin');
}

// Load any saved game data
const canvas: Canvas = new Canvas({ parent: document.createElement('div') });
export const state: GameState = loadData(canvas.loadData<GameState>('geomarin'));
