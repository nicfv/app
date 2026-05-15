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
