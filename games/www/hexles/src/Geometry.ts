import { rint } from 'smath';
export { clamp } from 'smath';
/**
 * Select a random element from `arr` of type `T`
 */
export function selectRandom<T>(arr: T[]): T {
    return arr[rint(0, arr.length - 1)];
}
/**
 * Return a weighted random bucket 0-indexed ID from an array of buckets.
 */
export function selectRandomBucket(bucketSizes: number[]): number {
    const startVal: number[] = [];
    let accumulation = 0;
    for (const s of bucketSizes) {
        accumulation += s;
        startVal.push(accumulation);
    }
    const size = accumulation,
        ran = rint(0, size - 1);
    return startVal.findIndex(s => ran < s);
}

/**
 * Represents an `(x,y)` coordinate pair.
 */
export interface Vec2 {
    readonly x: number;
    readonly y: number;
}

/**
 * Represents a regular 6-sided polygon.
 */
export class Hexagon {
    /**
     * The vertices that make up the hexagon.
     */
    protected readonly points: Vec2[] = [];
    /**
     * Create a new hexagon located at `center` with side length of `size`
     */
    constructor(center: Vec2, size: number) {
        const SIDES = 6;
        for (let i = 0; i < SIDES; i++) {
            const ANGLE: number = i / SIDES * 2 * Math.PI;
            this.points.push({
                x: size * Math.cos(ANGLE) + center.x,
                y: size * Math.sin(ANGLE) + center.y,
            });
        }
    }
}
