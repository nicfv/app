import { Drawable } from 'graphico';
import { allDirections, Direction, move, tileSize, Vec2 } from './types';
import * as SMath from 'smath';

export class GameMap implements Drawable {
    private readonly tiles: TileType[][];
    public readonly spawnPoint: Vec2;
    public readonly collectibleLocations: Vec2[];
    constructor(public readonly size: Vec2) {
        this.tiles = [];
        for (let x = 0; x < size.x; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < size.y; y++) {
                this.tiles[x][y] = 'wall';
            }
        }
        this.step({
            x: SMath.rint(0, this.size.x / 2 - 1) * 2 + 1,
            y: SMath.rint(0, this.size.y / 2 - 1) * 2 + 1,
        });
        this.collectibleLocations = [];
        this.spawnPoint = this.addRooms(2, 8);
        this.cleanPaths();
        this.cleanWalls();
    }
    private getTileAt(location: Vec2): TileType {
        return this.tiles[location.x]?.[location.y] ?? 'void';
    }
    public isWalkable(location: Vec2, direction: Direction): boolean {
        const tile: TileType = this.getTileAt(move(location, direction));
        return tile === 'path' || tile === 'room';
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const tile: TileType = this.getTileAt({ x: x, y: y });
                if (tile === 'path') {
                    graphics.fillStyle = 'dimgray';
                } else if (tile === 'room') {
                    graphics.fillStyle = 'dimgray';
                } else {
                    graphics.fillStyle = 'gray';
                }
                graphics.fillRect(x * tileSize.x, y * tileSize.y, tileSize.x, tileSize.y);
            }
        }
    }
    private step(location: Vec2): void {
        this.tiles[location.x][location.y] = 'path';
        const directions: Direction[] = SMath.shuffle(allDirections);
        for (const direction of directions) {
            const mid: Vec2 = move(location, direction);
            const dest: Vec2 = move(mid, direction);
            const tile: TileType = this.getTileAt(dest);
            if (tile === 'wall') {
                this.tiles[mid.x][mid.y] = 'path';
                this.step(dest);
            }
        }
    }
    private addRooms(minRooms: number, maxTries: number): Vec2 {
        let tries = 0;
        let rooms = 0;
        let spawn: Vec2 = { x: 0, y: 0 };
        while (tries < maxTries || rooms < minRooms) {
            tries++;
            const location: Vec2 = {
                x: SMath.rint(0, this.size.x / 2 - 3) * 2 + 1,
                y: SMath.rint(0, this.size.y / 2 - 3) * 2 + 1,
            };
            const size: Vec2 = {
                x: SMath.rint(0, 5) * 2 + 3,
                y: SMath.rint(0, 5) * 2 + 3,
            };
            const bottomRight: Vec2 = {
                x: location.x + size.x - 1,
                y: location.y + size.y - 1,
            };
            if (bottomRight.x >= this.size.x || bottomRight.y >= this.size.y) {
                continue;
            }
            for (let x = location.x; x <= bottomRight.x; x++) {
                for (let y = location.y; y <= bottomRight.y; y++) {
                    this.tiles[x][y] = 'room';
                }
            }
            rooms++;
            spawn = {
                x: SMath.rint(location.x, bottomRight.x),
                y: SMath.rint(location.y, bottomRight.y),
            };
            this.collectibleLocations.push(spawn);
        }
        this.collectibleLocations.pop();
        return spawn;
    }
    private cleanPaths(): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const location: Vec2 = { x: x, y: y };
                const tile: TileType = this.getTileAt(location);
                const count: number = this.countAround(location);
                if ((tile === 'path' || tile === 'room') && count <= 1) {
                    this.cleanPathStep(location);
                } else if (tile === 'wall' && count === 4) {
                    this.tiles[x][y] = 'path';
                }
            }
        }
    }
    private countAround(location: Vec2): number {
        let count = 0;
        for (const direction of allDirections) {
            if (this.isWalkable(location, direction)) {
                count++;
            }
        }
        return count;
    }
    private cleanPathStep(location: Vec2): void {
        this.tiles[location.x][location.y] = 'wall';
        for (const direction of allDirections) {
            if (this.isWalkable(location, direction)) {
                const dest: Vec2 = move(location, direction);
                const count: number = this.countAround(dest);
                if (count <= 1) {
                    this.cleanPathStep(move(location, direction));
                }
            }
        }
    }
    private cleanWalls(): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const location: Vec2 = { x: x, y: y };
                const tile: TileType = this.getTileAt(location);
                const count: number = this.countAround(location);
                if (tile === 'wall' && count >= 3) {
                    this.cleanWallStep(location);
                }
            }
        }
    }
    private cleanWallStep(location: Vec2): void {
        this.tiles[location.x][location.y] = 'path';
        for (const direction of allDirections) {
            if (!this.isWalkable(location, direction)) {
                const dest: Vec2 = move(location, direction);
                const count: number = this.countAround(dest);
                if (count >= 3) {
                    this.cleanWallStep(move(location, direction));
                }
            }
        }
    }
}

type TileType = 'void' | 'wall' | 'path' | 'room';
