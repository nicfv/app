import { expand } from 'smath';
import { Color, Gradient } from 'viridis';

/**
 * Red-Yellow-Green gradient
 */
const ryg: Gradient = new Gradient([
    new Color(255, 0, 0),
    new Color(255, 255, 0),
    new Color(0, 220, 0),
]);
/**
 * Represents a Pokemon catch ring
 */
export class Ring {
    private readonly svg: SVGSVGElement;
    private readonly ring: SVGCircleElement;
    constructor(private readonly size: number, private readonly strokeWidth: number, parent: HTMLElement) {
        const NS = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(NS, 'svg');
        const outer = document.createElementNS(NS, 'circle');
        this.ring = document.createElementNS(NS, 'circle');
        this.svg.append(outer, this.ring);
        this.svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        this.svg.setAttribute('width', `${size}`);
        this.svg.setAttribute('height', `${size}`);
        outer.setAttribute('cx', `${size / 2}`);
        outer.setAttribute('cy', `${size / 2}`);
        outer.setAttribute('r', `${size / 2 - strokeWidth}`);
        outer.setAttribute('fill', 'none');
        outer.setAttribute('stroke', '#eee');
        outer.setAttribute('stroke-width', `${strokeWidth}`);
        this.ring.setAttribute('cx', `${size / 2}`);
        this.ring.setAttribute('cy', `${size / 2}`);
        this.ring.setAttribute('fill', 'none');
        this.ring.setAttribute('stroke-width', `${strokeWidth}`);
        parent.appendChild(this.svg);
        this.setSize(0.5);
        this.setColor(0.5);
    }
    /**
     * Set the size of the inner ring, using a value [0-1]
     */
    public setSize(normalized: number): void {
        this.ring.setAttribute('r', `${expand(normalized, this.strokeWidth / 2, this.size / 2 - this.strokeWidth)}`);
    }
    /**
     * Set the color of the inner ring, using a value [0-1]
     */
    public setColor(normalized: number): void {
        this.ring.setAttribute('stroke', ryg.getColor(normalized).toString('hex'));
    }
}