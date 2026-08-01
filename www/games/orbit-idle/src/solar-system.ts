import { Drawable } from 'graphico';
import { Orbit, OrbitData } from './orbit';
import { income, player } from './state';

export class SolarSystem implements Drawable {
    public readonly orbits: Orbit[];
    constructor(solarData?: SolarData) {
        this.orbits = [];
        for (let i = 0; i < player.getNumOrbits(); i++) {
            this.orbits.push(new Orbit(i, solarData?.[i]));
        }
    }
    public step(dt: number): void {
        for (const orbit of this.orbits) {
            player.earn(income.getIncomePerRotation() * orbit.rotate(dt));
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const orbit of this.orbits) {
            orbit.draw(graphics);
        }
    }
}

export type SolarData = OrbitData[];
