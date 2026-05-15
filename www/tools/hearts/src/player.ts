import { Card } from './card';
import { Deck } from './deck';

/**
 * Represents a player in the game.
 */
export class Player {
    /**
     * The player's score for the current round.
     */
    public score = 0;
    public hasTakenPoints = false;
    /**
     * Create a new player.
     */
    constructor(public readonly id: number) { }
    /**
     * This player plays a card.
     */
    public play(card: Card, leadSuit: number, deck: Deck, roundsLeft: number): void {
        card.play();
        if (card.suit !== leadSuit) {
            deck.playerOutOfSuit(this.id, leadSuit);
            const myPossibleHand: Card[] = deck.hand(this.id);
            if (myPossibleHand.length <= roundsLeft) {
                myPossibleHand.forEach(card => card.mustBeOwnedBy(this.id));
            }
        }
    }
    /**
     * This player takes the trick.
     */
    public take(trick: Card[]): void {
        trick.forEach(card => {
            this.score += card.pointValue;
            if (card.pointValue > 0) {
                this.hasTakenPoints = true;
            }
        });
    }
}