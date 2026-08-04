import { Drawable } from 'graphico';
import { SMath, Vec3 } from 'smath';
import { Color } from 'viridis';
import { player, zoom } from './state';

/**
 * Represents a single planetary orbit
 */
export class Orbit implements Drawable {
    /**
     * 2pi
     */
    private static readonly TAU: number = Math.PI * 2;
    /**
     * The planet color
     */
    public readonly color: Color;
    /**
     * The radius of the orbit
     */
    private readonly radius: number;
    /**
     * The radius of the planet
     */
    private readonly thickness: number;
    /**
     * The maximum speed of the orbit at the max level
     */
    private readonly maxSpeed: number;
    /**
     * The maximum level for the speed
     */
    private readonly maxSpeedLevel: number;
    /**
     * The cost for the first speed upgrade
     */
    private readonly baseCost: number;
    /**
     * The incremental cost percentage increase
     */
    private readonly costIncrease: number;
    /**
     * The incremental cost percentage increase per ascension
     */
    private readonly ascCostIncrease: number;
    /**
     * Create a new planet.
     */
    constructor(public readonly index: number, private readonly data: OrbitData = JSON.parse(JSON.stringify(defaultData))) {
        this.color = Color.hsl(SMath.translate(index, 0, player.getNumOrbits(), 0, 360), 100, 55);
        this.radius = 100 * (1.3 ** index);
        this.thickness = this.radius * 0.2;
        this.maxSpeed = 2 * (index + 1) ** -0.25;
        this.maxSpeedLevel = 100;
        this.baseCost = 10 ** index;
        this.costIncrease = 1.02 + 0.02 * index;
        this.ascCostIncrease = 1.25 + 0.05 * index;
    }
    /**
     * Copy orbit data for saving this orbit.
     */
    public save(): OrbitData {
        return JSON.parse(JSON.stringify(this.data));
    }
    /**
     * Load orbit data into this orbit.
     */
    public load(data: OrbitData): void {
        this.data.angle = SMath.clamp(data.angle, 0, Orbit.TAU);
        this.data.ascensions = SMath.clamp(data.ascensions, 0, Infinity) | 0;
        this.data.rotations = SMath.clamp(data.rotations, 0, Infinity) | 0;
        this.data.speedLevel = SMath.clamp(data.speedLevel, 0, Infinity) | 0;
    }
    /**
     * Determine if the orbit has been activated.
     */
    public isActive(): boolean {
        return this.data.speedLevel > 0 || this.data.rotations > 0;
    }
    /**
     * Determine if this orbit's speed level is maxed out.
     */
    public isMaxed(): boolean {
        return this.data.speedLevel >= this.maxSpeedLevel;
    }
    /**
     * Determine if this orbit has ascended yet.
     */
    public hasAscended(): boolean {
        return this.data.ascensions > 0;
    }
    /**
     * Get the cost for the next `N` levels.
     */
    public getNextNCost(n: number): number {
        const ascensionMult: number = this.ascCostIncrease ** this.data.ascensions;
        let cost = 0;
        for (let level = this.data.speedLevel; level < SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel); level++) {
            cost += this.baseCost * (this.costIncrease ** level) * ascensionMult;
        }
        return cost;
    }
    /**
     * Get the cost for the next `N` ascensions.
     */
    public getNextNAscensionCost(n: number): number {
        const maxCost: number = this.baseCost * (this.costIncrease ** this.maxSpeedLevel);
        let cost = 0;
        for (let asc = this.data.ascensions; asc < this.data.ascensions + n; asc++) {
            cost += maxCost * (this.ascCostIncrease ** asc);
        }
        return cost;
    }
    /**
     * Get the final speed after `N` levels.
     */
    public getNextNSpeed(n: number): number {
        return SMath.translate(SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel), 0, this.maxSpeedLevel, 0, this.maxSpeed);
    }
    /**
     * Increase the speed by `N` levels.
     */
    public increaseSpeed(n: number): void {
        this.data.speedLevel = SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel) | 0;
    }
    /**
     * Calculates the current speed in rotations per second. (Hz)
     */
    public currentSpeedHz(): number {
        return SMath.translate(this.data.speedLevel, 0, this.maxSpeedLevel, 0, this.maxSpeed);
    }
    /**
     * Increase the number of ascensions for this wheel `N` times.
     */
    public ascend(n: number): void {
        if (this.isMaxed()) {
            this.data.ascensions += n | 0;
            this.data.angle = 0;
            this.data.speedLevel = 0;
        }
    }
    /**
     * Get the base value to calculate score.
     */
    public getBase(): number {
        return this.data.rotations / 100 + 1;
    }
    /**
     * Get the exponent to calculate score.
     */
    public getExp(): number {
        return this.data.ascensions / 100 + 1;
    }
    /**
     * Rotate this orbit. Returns the number of complete rotations this past interval.
     */
    public rotate(dt: number): number {
        this.data.angle += this.currentSpeedHz() * dt / 1e3 * Orbit.TAU;
        const rotations: number = (this.data.angle / Orbit.TAU) | 0;
        this.data.rotations += rotations;
        this.data.angle %= Orbit.TAU;
        return rotations;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Skip drawing if it hasn't begun rotating yet
        if (this.data.speedLevel <= 0) {
            return;
        }
        // Center the orbit on the canvas
        const center: Vec3 = new Vec3(graphics.canvas.width / 2, graphics.canvas.height / 2);
        const zoomFactor: number = 1.3 ** (player.getNumOrbits() - zoom.getZoom());
        const radial: Vec3 = Vec3.fromPolar(this.radius / zoomFactor, this.data.angle);
        const planetCenter: Vec3 = center.plus(radial);
        const planetRadius: number = this.thickness / zoomFactor / 2;
        graphics.fillStyle = this.color.toString();
        graphics.beginPath();
        graphics.arc(planetCenter.x, planetCenter.y, planetRadius, 0, Orbit.TAU, false);
        graphics.fill();
    }
}

/**
 * Volatile orbit data, used for saving and loading game state
 */
export interface OrbitData {
    /**
     * The current angle of the orbit
     */
    angle: number;
    /**
     * The total amount of rotations for this ascension
     */
    rotations: number;
    /**
     * The total number of ascensions for this mega-ascension
     */
    ascensions: number;
    /**
     * The current rotation speed of this orbit
     */
    speedLevel: number;
}

const defaultData: OrbitData = {
    angle: 0,
    rotations: 0,
    ascensions: 0,
    speedLevel: 0,
};
