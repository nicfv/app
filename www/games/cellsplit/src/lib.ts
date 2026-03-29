/**
 * Represents a cartesian coordinate pair.
 */
export interface Vec2 {
    x: number;
    y: number;
}

/**
 * Calculate the distance between two points.
 */
export function distance(ptA: Vec2, ptB: Vec2): number {
    return Math.sqrt((ptA.x - ptB.x) ** 2 + (ptA.y - ptB.y) ** 2);
}