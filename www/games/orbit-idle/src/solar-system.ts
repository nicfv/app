import { Drawable } from 'graphico';
import { Orbit, OrbitData } from './orbit';
import { income, player, zoom } from './state';
import { Color, Gradient } from 'viridis';
import { Vec3 } from 'smath';

/**
 * Represents the solar system in the game
 */
export class SolarSystem implements Drawable {
    /**
     * The gradient for the main central star
     */
    private static readonly starGradient: Gradient = new Gradient([
        new Color(255, 255, 225),
        new Color(200, 225, 255),
    ]);
    /**
     * Contains orbits for all planets within the solar system
     */
    public readonly orbits: Orbit[];
    /**
     * Create a new solar system, passing in optional orbit data
     */
    constructor() {
        this.orbits = [];
    }
    /**
     * Generate data for all orbits in the solar system for saving data
     */
    public save(): SolarData {
        return this.orbits.map(o => o.save());
    }
    /**
     * Regenerate the solar system, optionally passing in data
     */
    public load(solarData?: SolarData): void {
        this.orbits.splice(0);
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
        // Draw the central star
        const center: Vec3 = new Vec3(graphics.canvas.width / 2, graphics.canvas.height / 2);
        const zoomFactor: number = 1.3 ** (player.getNumOrbits() - zoom.getZoom());
        const starRadius: number = 50 / zoomFactor;
        const gradient: CanvasGradient = graphics.createRadialGradient(center.x, center.y, 0, center.x, center.y, starRadius);
        SolarSystem.starGradient.setColorStops(gradient);
        graphics.fillStyle = gradient;
        graphics.beginPath();
        graphics.arc(center.x, center.y, starRadius, 0, 2 * Math.PI);
        graphics.fill();
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
