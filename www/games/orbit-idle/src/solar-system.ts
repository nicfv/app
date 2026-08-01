import { Drawable } from 'graphico';
import { Orbit, OrbitData } from './orbit';
import { income, player } from './state';
import { Color } from 'viridis';

/**
 * Represents the solar system in the game
 */
export class SolarSystem implements Drawable {
    /**
     * Contains orbits for all planets within the solar system
     */
    public readonly orbits: Orbit[];
    /**
     * Create a new solar system, passing in optional orbit data
     */
    constructor(solarData?: SolarData) {
        this.orbits = [];
        for (let i = 0; i < player.getNumOrbits(); i++) {
            this.orbits.push(new Orbit(i, solarData?.[i]));
        }
    }
    /**
     * Compute a single timestep for the solar system
     */
    public step(dt: number): void {
        for (const orbit of this.orbits) {
            player.earn(income.getIncomePerRotation() * orbit.rotate(dt));
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Shade in the background
        const semiTransparent: Color = new Color(0, 0, 0, 10);
        graphics.fillStyle = semiTransparent.toString();
        graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        // Draw all orbits/planets
        for (const orbit of this.orbits) {
            orbit.draw(graphics);
        }
    }
}

/**
 * Represents data for saving/loading
 */
export type SolarData = OrbitData[];
