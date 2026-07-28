import { Drawable } from 'graphico';
import { SMath } from 'smath';
import { Color } from 'viridis';
import { player, zoom } from './state';

/**
 * Represents a single spinning wheel
 */
export class Wheel implements Drawable {
    /**
     * 2pi
     */
    private static readonly TAU: number = Math.PI * 2;
    /**
     * The wheel color
     */
    public readonly color: Color;
    /**
     * The radius of the wheel
     */
    private readonly radius: number;
    /**
     * The thickness of the wheel
     */
    private readonly thickness: number;
    /**
     * The maximum speed of the wheel at the max level
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
     * Create a new wheel.
     */
    constructor(public readonly index: number, private readonly data: WheelData = JSON.parse(JSON.stringify(defaultData))) {
        this.color = Color.hsl(SMath.translate(index, 0, player.getNumWheels(), 0, 360), 100, 55);
        this.radius = 100 * (1.3 ** index);
        this.thickness = this.radius * 0.2;
        this.maxSpeed = SMath.translate(index, 0, player.getNumWheels(), 20, 1);
        this.maxSpeedLevel = 100;
        this.baseCost = 10 ** index;
        this.costIncrease = 1.02 + 0.02 * index;
        this.ascCostIncrease = 1.25 + 0.05 * index;
    }
    /**
     * Determine if the wheel has been activated
     */
    public isActive(): boolean {
        return this.data.speedLevel > 0;
    }
    /**
     * Determine if this wheel's speed level is maxed out.
     */
    public isMaxed(): boolean {
        return this.data.speedLevel >= this.maxSpeedLevel;
    }
    /**
     * Determine if this wheel has ascended yet
     */
    public hasAscended(): boolean {
        return this.data.ascensions > 0;
    }
    /**
     * Get the cost for the next `N` levels.
     */
    public getNextNCost(n: number): number {
        let cost = 0;
        for (let level = this.data.speedLevel; level < SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel); level++) {
            cost += this.baseCost * (this.costIncrease ** level) * (this.ascCostIncrease ** this.data.ascensions);
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
        this.data.speedLevel = SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel);
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
            this.data.ascensions += n;
            this.data.angle = 0;
            this.data.rotations = 0;
            this.data.speedLevel = 0;
        }
    }
    /**
     * Get the base value to calculate score
     */
    public getBase(): number {
        return this.data.rotations / 100 + 1;
    }
    /**
     * Get the exponent to calculate score
     */
    public getExp(): number {
        return this.data.ascensions / 100 + 1;
    }
    /**
     * Rotate this wheel. Returns the number of complete rotations this past interval.
     */
    public rotate(dt: number): number {
        this.data.angle += this.currentSpeedHz() * dt / 1e3 * Wheel.TAU;
        const rotations: number = Math.floor(this.data.angle / Wheel.TAU);
        this.data.rotations += rotations;
        this.data.angle %= Wheel.TAU;
        return rotations;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Skip drawing if it hasn't begun rotating yet
        if (this.data.speedLevel <= 0) {
            return;
        }
        // Center the wheel on the canvas
        const centerX: number = graphics.canvas.width / 2;
        const centerY: number = graphics.canvas.height / 2;
        const zoomFactor: number = 1.3 ** (player.getNumWheels() - zoom.getZoom());
        const angle: number = this.currentSpeedHz() > 10 ? Wheel.TAU : this.data.angle;
        graphics.strokeStyle = this.color.toString();
        graphics.lineWidth = this.thickness / zoomFactor;
        graphics.lineCap = 'round';
        graphics.beginPath();
        graphics.arc(centerX, centerY, this.radius / zoomFactor, 0, angle, false);
        graphics.stroke();
    }
}

/**
 * Volatile wheel data, used for saving and loading game state
 */
export interface WheelData {
    /**
     * The current angle of the wheel
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
     * The current rotation speed of this wheel
     */
    speedLevel: number;
}

const defaultData: WheelData = {
    angle: 0,
    rotations: 0,
    ascensions: 0,
    speedLevel: 0,
};
