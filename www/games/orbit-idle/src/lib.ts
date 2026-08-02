/**
 * Format any number for display.
 */
export function N(num: number): string {
    const log10: number = Math.log10(Math.abs(num)) | 0;
    if (log10 >= 21) {
        return `${(num / (10 ** log10)).toFixed(2)}E${log10}`;
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
