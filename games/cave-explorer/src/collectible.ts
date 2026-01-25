import { Drawable } from 'graphico';
import { tileSize, Vec2 } from './types';
import { GameMap } from './map';

export class CompletionBar implements Drawable {
    constructor(private readonly location: Vec2, private readonly maxSize: Vec2, private readonly color: string, private readonly stretch: 'horiz' | 'vert', public percentComplete = 0) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = this.color;
        const width: number = (this.stretch === 'vert' ? 1 : this.percentComplete) * this.maxSize.x;
        const height: number = (this.stretch === 'horiz' ? 1 : this.percentComplete) * this.maxSize.y;
        graphics.fillRect(this.location.x, this.location.y, width | 0, height | 0);
    }
}

export class Collectibles implements Drawable {
    private readonly total: number;
    private readonly collectibles: Collectible[];
    constructor(map: GameMap, private readonly completionBar: CompletionBar) {
        this.collectibles = [];
        for (const location of map.collectibleLocations) {
            this.collectibles.push(new Collectible(location));
        }
        this.total = this.collectibles.length;
    }
    public collect(location: Vec2): void {
        const index: number = this.collectibles.findIndex(collectible => collectible.isAt(location));
        if (index >= 0) {
            this.collectibles.splice(index, 1);
            this.completionBar.percentComplete = 1 - (this.collectibles.length / this.total);

        }
    }
    public collectibleLocations(): Vec2[] {
        return this.collectibles.map(collectible => collectible.location);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const collectible of this.collectibles) {
            collectible.draw(graphics);
        }
    }
}

class Collectible implements Drawable {
    constructor(public readonly location: Vec2) { }
    public isAt(location: Vec2): boolean {
        return location.x === this.location.x && location.y === this.location.y;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'lime';
        graphics.fillRect(this.location.x * tileSize.x, this.location.y * tileSize.y, tileSize.x, tileSize.y);
    }
}