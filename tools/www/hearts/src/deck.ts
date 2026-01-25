import { Card } from './card';

/**
 * Represents a standard deck of 52 cards.
 */
export class Deck {
    private readonly cards: Array<Card>;
    /**
     * Re-deal the deck.
     */
    constructor() {
        this.cards = [];
        for (let suit = 1; suit <= 4; suit++) {
            for (let value = 2; value <= 14; value++) {
                this.cards.push(new Card(suit, value));
            }
        }
    }
    /**
     * Get the possible cards currently in a player's hand, optionally filtering by suit.
     */
    public hand(playerID: number = 0, suit: number = 0): Array<Card> {
        const allMyCards: Array<Card> = this.cards.filter(card => card.hand[playerID]),
            filteredBySuit: Array<Card> = allMyCards.filter(card => card.suit === suit);
        if (filteredBySuit.length) {
            return filteredBySuit;
        } else {
            return allMyCards;
        }
    }
    /**
     * Get the cards that you could be passed.
     */
    public couldReceive(): Array<Card> {
        return this.cards.filter(card => !card.hand[0] && card.hand[1] && card.hand[2] && card.hand[3]);
    }
    /**
     * Mark that a certain player is out of a suit.
     */
    public playerOutOfSuit(playerID: number, suit: number): void {
        this.cards.filter(card => card.suit === suit).forEach(card => card.hand[playerID] = false);
    }
    /**
     * Get the two of clubs.
     */
    public getTwoClubs(): Card {
        return this.cards.find(card => card.twoClubs)!;
    }
}