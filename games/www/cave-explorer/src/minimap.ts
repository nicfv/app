import * as SMath from 'smath';
import { Drawable } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';
import { Collectibles } from './collectible';
import { Vec2 } from './types';

export class Minimap implements Drawable {
    private readonly bottomRight: Vec2;
    constructor(private readonly location: Vec2, private readonly size: Vec2, private readonly map: GameMap, private readonly player: Player, private readonly collectibles: Collectibles) {
        this.bottomRight = { x: this.location.x + this.size.x, y: this.location.y + this.size.y };
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const mapSize: Vec2 = this.map.size;
        const playerXY: Vec2 = this.player.getLocation();
        const itemXYs: Vec2[] = this.collectibles.collectibleLocations();
        // Draw map background
        graphics.fillStyle = 'black';
        graphics.fillRect(this.location.x, this.location.y, this.size.x, this.size.y);
        // Draw items
        graphics.fillStyle = 'lime';
        for (const itemXY of itemXYs) {
            graphics.fillRect(SMath.translate(itemXY.x, 0, mapSize.x, this.location.x, this.bottomRight.x) | 0,
                SMath.translate(itemXY.y, 0, mapSize.y, this.location.y, this.bottomRight.y) | 0, 1, 1);
        }
        // Draw player
        graphics.fillStyle = 'red';
        graphics.fillRect(SMath.translate(playerXY.x, 0, mapSize.x, this.location.x, this.bottomRight.x) | 0,
            SMath.translate(playerXY.y, 0, mapSize.y, this.location.y, this.bottomRight.y) | 0, 1, 1);
    }
}