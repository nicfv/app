import { Drawable } from 'graphico';
import { Direction, move, tileSize, Vec2 } from './types';
import { GameMap } from './map';
import { Collectibles } from './collectible';

export class Player implements Drawable {
    private location: Vec2;
    constructor(private readonly map: GameMap, private readonly collectibles: Collectibles) {
        this.location = map.spawnPoint;
    }
    public movePlayer(direction: Direction): void {
        if (this.map.isWalkable(this.location, direction)) {
            this.location = move(this.location, direction);
            this.collectibles.collect(this.location);
        }
    }
    public getLocation(): Vec2 {
        return this.location;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.save();
        graphics.translate(((graphics.canvas.width / 2) | 0) - this.location.x * tileSize.x, ((graphics.canvas.height / 2) | 0) - this.location.y * tileSize.y);
        this.map.draw(graphics);
        this.collectibles.draw(graphics);
        graphics.fillStyle = 'red';
        graphics.fillRect(this.location.x * tileSize.x, this.location.y * tileSize.y, tileSize.x, tileSize.y);
        graphics.restore();
    }
}