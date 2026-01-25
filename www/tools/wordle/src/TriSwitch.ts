/**
 * Represents a visual switch with any number of states.
 */
export class TriSwitch {
    /**
     * Radius [px]
     */
    private readonly r: number;
    /**
     * Main SVG element
     */
    private readonly el: SVGSVGElement;
    /**
     * Slot
     */
    private readonly sl: SVGRectElement;
    /**
     * Switch
     */
    private readonly sw: SVGCircleElement;
    /**
     * Current switch state
     */
    private state: number;
    /**
     * Total number of switch states
     */
    private readonly states: number;
    /**
     * The onclick event listener
     */
    private onclick: Function = () => { };
    /**
     * Create a new instance of a `TriSwitch`
     */
    constructor(private readonly width: number, private readonly height: number, private readonly stateColorScheme = [new StateColors('#666', '#000', '#f00'), new StateColors('#666', '#000', '#0f0'), new StateColors('#666', '#000', '#00f')], borderWidth: number, switchPadding: number, transition: number, canClickSlot: boolean = false, parent: HTMLElement = document.body) {
        const NS = 'http://www.w3.org/2000/svg';
        this.r = (width < height ? width : height) / 2;
        this.el = document.createElementNS(NS, 'svg');
        this.sl = document.createElementNS(NS, 'rect');
        this.sw = document.createElementNS(NS, 'circle');
        this.el.appendChild(this.sl);
        this.el.appendChild(this.sw);
        this.el.setAttribute('width', width + 'px');
        this.el.setAttribute('height', height + 'px');
        this.sl.setAttribute('x', (borderWidth / 2) + 'px');
        this.sl.setAttribute('y', (borderWidth / 2) + 'px');
        this.sl.setAttribute('width', (width - borderWidth) + 'px');
        this.sl.setAttribute('height', (height - borderWidth) + 'px');
        this.sl.setAttribute('rx', this.r + 'px');
        this.sl.setAttribute('fill', this.stateColorScheme[0].backgroundColor);
        this.sl.setAttribute('stroke', this.stateColorScheme[0].borderColor);
        this.sl.setAttribute('stroke-width', borderWidth + 'px');
        this.sw.setAttribute('cx', this.r + 'px');
        this.sw.setAttribute('cy', this.r + 'px');
        this.sw.setAttribute('r', (this.r - borderWidth - switchPadding) + 'px');
        this.sw.setAttribute('fill', this.stateColorScheme[0].switchColor);
        this.sl.style.transition = 'fill ' + transition + 's, stroke ' + transition + 's';
        this.sw.style.transition = 'fill ' + transition + 's, cx ' + transition + 's, cy ' + transition + 's';
        if (canClickSlot) {
            this.sl.addEventListener('click', () => this.click());
            this.sl.style.cursor = 'pointer';
        }
        this.sw.addEventListener('click', () => this.click());
        this.sw.style.cursor = 'pointer';
        this.state = 0;
        this.states = stateColorScheme.length;
        parent.appendChild(this.el);
        if (this.states < 2) {
            throw 'Not enough states.';
        }
    }
    /**
     * This function is called when the switch is clicked.
     */
    public click(): void {
        this.state = (this.state + 1) % this.states;
        this.sw.setAttribute('cx', (this.width - 2 * this.r) * (this.state / (this.states - 1)) + this.r + 'px');
        this.sw.setAttribute('cy', (this.height - 2 * this.r) * (this.state / (this.states - 1)) + this.r + 'px');
        this.sw.setAttribute('fill', this.stateColorScheme[this.state].switchColor);
        this.sl.setAttribute('fill', this.stateColorScheme[this.state].backgroundColor);
        this.sl.setAttribute('stroke', this.stateColorScheme[this.state].borderColor);
        this.onclick();
    }
    /**
     * Return the current state of the `TriSwitch`
     */
    public getState(): number {
        return this.state;
    }
    /**
     * Return the current state description of the `TriSwitch`
     */
    public getStateDescription(): string {
        return this.stateColorScheme[this.state].optionalDescription;
    }
    /**
     * Set the onclick event listener.
     */
    public setOnclick(onclick: Function): void {
        this.onclick = onclick;
    }
}

/**
 * Represents a group of colors that represent a state of a `TriSwitch`
 */
export class StateColors {
    constructor(public readonly borderColor: string, public readonly backgroundColor: string, public readonly switchColor: string, public readonly optionalDescription: string = '') {
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
        this.switchColor = switchColor;
        this.optionalDescription = optionalDescription;
    }
}