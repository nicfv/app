/**
 * A playing card.
 */
export class Card {
    /**
     * Determines where this card could be.
     */
    public readonly hand: Array<boolean> = [false, true, true, true];
    /**
     * Whether or not this is the 2 of Clubs.
     */
    public readonly twoClubs: boolean;
    /**
     * The point value of this card.
     */
    public readonly pointValue: number = 0;
    /**
     * Create a new instance of a playing card.
     * @param suit [1-4] Diamonds, Clubs, Hearts, Spades
     * @param value [2-14]
     */
    constructor(public readonly suit: number, public readonly value: number) {
        if (suit < 1 || suit > 4) { throw new Error('Suit (' + suit.toString() + ') is out of bounds [1-4].'); }
        if (value < 2 || value > 14) { throw new Error('Value (' + value.toString() + ') is out of bounds [2-14].'); }
        if (suit === 3) {
            this.pointValue = 1;
        }
        if (suit === 4 && value === 12) {
            this.pointValue = 13;
        }
        if (suit === 1 && value === 11) {
            this.pointValue = -10;
        }
        this.twoClubs = (suit === 2 && value === 2);
    }
    /**
     * Play a card.
     */
    public play(): void {
        for (let i = 0; i < this.hand.length; i++) {
            this.hand[i] = false;
        }
    }
    /**
     * This card must be owned by a certain player.
     */
    public mustBeOwnedBy(playerID: number): void {
        for (let i = 0; i < this.hand.length; i++) {
            this.hand[i] = (playerID === i);
        }
    }
    /**
     * Get the color of this card.
     */
    private getColor(): string {
        if (this.suit === 1 || this.suit === 3) { return '#EE0000'; }
        if (this.suit === 2 || this.suit === 4) { return '#000000'; }
        throw new Error('Invalid suit (' + this.suit.toString() + ').');
    }
    /**
     * Get a string representation of this card.
     */
    public toString(): string {
        let suitStr: string,
            valueStr: string;
        switch (this.suit) {
            case (1): { suitStr = '\u2666'; break; }
            case (2): { suitStr = '\u2663'; break; }
            case (3): { suitStr = '\u2665'; break; }
            case (4): { suitStr = '\u2660'; break; }
            default: { throw new Error('Invalid suit.'); }
        }
        switch (this.value) {
            case (11): { valueStr = 'J'; break; }
            case (12): { valueStr = 'Q'; break; }
            case (13): { valueStr = 'K'; break; }
            case (14): { valueStr = 'A'; break; }
            default: { valueStr = this.value.toString(); }
        }
        return suitStr + valueStr;
    }
    /**
     * Get a visual representation of this card.
     */
    public getDiv(): HTMLDivElement {
        const div: HTMLDivElement = document.createElement('div');
        div.textContent = this.toString();
        div.style.color = this.getColor();
        div.style.background = '#FFFFFF';
        div.style.border = '1px solid black';
        div.style.margin = '2px';
        div.style.padding = '2px';
        div.className = 'Card';
        return div;
    }
    /**
     * Create a button with an event listener.
     */
    public getButton(onClick: (card: Card) => void): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.append(this.getDiv());
        button.className = 'Card';
        button.addEventListener('click', () => {
            console.log('Click: ' + this.toString());
            button.disabled = true;
            onClick(this);
        });
        return button;
    }
}