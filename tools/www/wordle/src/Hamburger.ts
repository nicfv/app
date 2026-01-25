/**
 * Represents a responsive hamburger style menu button.
 */
export class Hamburger {
    private readonly strokeWidth: number;
    private readonly el: SVGSVGElement;
    private readonly ham: SVGPathElement;
    private open: boolean;
    private onclick: Function = () => { };
    /**
     * Initialize a new hamburger control element.
     */
    constructor(private readonly size: number, private readonly openColor: string, private readonly closeColor: string, transition: number, parent: HTMLElement) {
        const NS = 'http://www.w3.org/2000/svg';
        this.strokeWidth = size / 4;
        this.open = false;
        this.el = document.createElementNS(NS, 'svg');
        this.ham = document.createElementNS(NS, 'path');
        this.el.appendChild(this.ham);
        this.el.setAttribute('width', this.size + 'px');
        this.el.setAttribute('height', this.size + 'px');
        this.ham.setAttribute('d', this.dOpen());
        this.ham.setAttribute('stroke-linecap', 'round');
        this.el.style.cursor = 'pointer';
        this.ham.style.stroke = this.openColor;
        this.ham.style.strokeWidth = this.strokeWidth + 'px';
        this.ham.style.transition = 'd ' + transition + 's, stroke ' + transition + 's';
        this.el.addEventListener('click', () => this.click());
        parent.appendChild(this.el);
    }
    /**
     * Display 3 horizontal lines
     */
    private dOpen(): string {
        return 'M ' + this.top() + ',' + this.top() + ' ' + this.bot() + ',' + this.top() +
            ' M ' + this.top() + ',' + this.mid() + ' ' + this.bot() + ',' + this.mid() +
            ' M ' + this.top() + ',' + this.bot() + ' ' + this.bot() + ',' + this.bot();
    }
    /**
     * Display an X
     */
    private dClose(): string {
        return 'M ' + this.top() + ',' + this.top() + ' ' + this.bot() + ',' + this.bot() +
            ' M ' + this.mid() + ',' + this.mid() + ' ' + this.mid() + ',' + this.mid() +
            ' M ' + this.top() + ',' + this.bot() + ' ' + this.bot() + ',' + this.top();
    }
    /**
     * Top reference point
     */
    private top(): number {
        return this.strokeWidth / 2;
    }
    /**
     * Middle reference point
     */
    private mid(): number {
        return this.size / 2;
    }
    /**
     * Bottom reference point
     */
    private bot(): number {
        return this.size - this.strokeWidth / 2;
    }
    /**
     * Assign an absolute position for this menu control. Negative coordinates are relative to the right and bottom sides of the page.
     */
    public setPosition(x: number, y: number) {
        this.el.style.position = 'fixed';
        if (x >= 0) {
            this.el.style.left = x + 'px';
        } else {
            this.el.style.right = -x + 'px';
        }
        if (y >= 0) {
            this.el.style.top = y + 'px';
        } else {
            this.el.style.bottom = -y + 'px';
        }
    }
    /**
     * Call this to simulate a click event on this object.
     */
    public click(): void {
        this.open = !this.open;
        if (this.open) {
            this.ham.setAttribute('d', this.dClose());
            this.ham.style.stroke = this.closeColor;
        } else {
            this.ham.setAttribute('d', this.dOpen());
            this.ham.style.stroke = this.openColor;
        }
        this.onclick();
    }
    /**
     * Determine if the menu is currently open.
     */
    public isOpen(): boolean {
        return this.open;
    }
    /**
     * Set the onclick event handler.
     */
    public setOnclick(onclick: Function): void {
        this.onclick = onclick;
    }
}