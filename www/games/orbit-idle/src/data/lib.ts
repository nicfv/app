/**
 * Format any number for display.
 */
export function N(num: number): string {
    const log10: number = Math.log10(Math.abs(num)) | 0;
    if (log10 >= 36) {
        return `${(num / (10 ** log10)).toFixed(2)}E${log10}`;
    } else if (log10 >= 33) {
        return `${(num / 1e33).toFixed(2)}D`;
    } else if (log10 >= 30) {
        return `${(num / 1e30).toFixed(2)}N`;
    } else if (log10 >= 27) {
        return `${(num / 1e27).toFixed(2)}o`;
    } else if (log10 >= 24) {
        return `${(num / 1e24).toFixed(2)}S`;
    } else if (log10 >= 21) {
        return `${(num / 1e21).toFixed(2)}s`;
    } else if (log10 >= 18) {
        return `${(num / 1e18).toFixed(2)}Q`;
    } else if (log10 >= 15) {
        return `${(num / 1e15).toFixed(2)}q`;
    } else if (log10 >= 12) {
        return `${(num / 1e12).toFixed(2)}T`;
    } else if (log10 >= 9) {
        return `${(num / 1e9).toFixed(2)}B`;
    } else if (log10 >= 6) {
        return `${(num / 1e6).toFixed(2)}M`;
    } else if (log10 >= 3) {
        return `${(num / 1e3).toFixed(2)}K`;
    } else {
        return num.toFixed(2);
    }
};

/**
 * Represents a data type which can be saved and loaded from memory
 */
export abstract class SaveLoad<T extends object> {
    /**
     * Create a new instance of this class
     */
    constructor(protected readonly data: T) { }
    /**
     * Make a copy of this data object for saving
     */
    public save(): T {
        return JSON.parse(JSON.stringify(this.data));
    }
    /**
     * Load the saved data into this object
     */
    public abstract load(data: T): void;
}
