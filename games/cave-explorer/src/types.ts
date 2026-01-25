export interface Vec2 {
    readonly x: number;
    readonly y: number;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export function move(location: Vec2, direction: Direction): Vec2 {
    return {
        x: location.x + DELTAS[direction].x,
        y: location.y + DELTAS[direction].y,
    };
}

const DELTAS: Record<Direction, Vec2> = {
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
};

export const allDirections: Direction[] = Object.keys(DELTAS) as Direction[];

export const tileSize: Vec2 = { x: 1, y: 1 };
