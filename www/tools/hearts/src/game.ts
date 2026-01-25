import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

export class Game {
    private readonly numPlayers: number = 3;
    private readonly passCount: number = 3;
    private readonly cardsPerHand: number = 13;
    private instruction: HTMLDivElement;
    private playerData: HTMLDivElement;
    private table: HTMLDivElement;
    private hand: HTMLDivElement;
    private passTo: number = 0;
    private twoClubsPassed: boolean = false;
    private deck: Deck = new Deck();
    private trickNum: number = 1;
    private playerId: number = 0;
    private suitLead: number = 0;
    private onTable: Array<Card> = [];
    private players: Array<Player> = [];
    constructor(parent: HTMLElement) {
        this.instruction = document.createElement('div');
        this.instruction.title = 'Current instructions';
        this.playerData = document.createElement('div');
        this.playerData.title = 'Known player information';
        this.table = document.createElement('div');
        this.table.title = 'Cards currently on the table';
        this.hand = document.createElement('div');
        this.hand.title = 'Make selections here';
        parent.append(this.instruction, this.playerData, this.table, this.hand);
        this.choose();
    }
    private choose(): void {
        this.clearAll();
        this.setInstruction('Which player will you pass to?');
        for (let i = 1; i <= this.numPlayers; i++) {
            const newButton = document.createElement('button');
            newButton.textContent = 'P' + i;
            newButton.addEventListener('click', () => {
                console.log('Passing to P' + i);
                this.passTo = i;
                this.join();
            });
            this.hand.append(newButton);
        }
    }
    private join(): void {
        this.clearAll();
        this.setInstruction('Setting up players...');
        this.players = [];
        for (let i = 0; i <= this.numPlayers; i++) {
            // Player ID = 0 is you
            this.players.push(new Player(i));
        }
        this.deal();
    }
    private deal(): void {
        this.clearAll();
        let cardsLeft: number = this.cardsPerHand;
        this.deck = new Deck();
        this.setInstruction('You were dealt ' + cardsLeft + ' cards. Select them below.');
        this.hand.append(...this.deck.couldReceive().map(card => card.getButton(me => {
            me.mustBeOwnedBy(0);
            cardsLeft--;
            this.setInstruction('Select ' + cardsLeft + ' more card(s).');
            if (cardsLeft <= 0) {
                this.pass();
            }
        })));
    }
    private pass(): void {
        this.clearAll();
        let passLeft: number = this.passCount;
        this.setInstruction('Pass ' + passLeft + ' cards to player ' + this.passTo + '.');
        this.hand.append(...this.deck.hand().map(card => card.getButton(me => {
            me.mustBeOwnedBy(this.passTo);
            if (me.twoClubs) {
                this.twoClubsPassed = true;
            }
            passLeft--;
            this.setInstruction('Select ' + passLeft + ' more card(s).');
            if (passLeft <= 0) {
                this.receive();
            }
        })));
    }
    private receive(): void {
        this.clearAll();
        let receiveLeft: number = this.passCount;
        this.setInstruction('You received ' + receiveLeft + ' cards. Select them below.');
        this.hand.append(...this.deck.couldReceive().map(card => card.getButton(me => {
            me.mustBeOwnedBy(0);
            receiveLeft--;
            this.setInstruction('Select ' + receiveLeft + ' more cards.');
            if (receiveLeft <= 0) {
                this.start();
            }
        })));
    }
    private start(): void {
        this.clearAll();
        const twoClubs: Card = this.deck.getTwoClubs();
        if (twoClubs.hand[0]) {
            this.setInstruction('Play the 2 of clubs.');
            this.playerId = 0;
            this.hand.append(twoClubs.getButton(me => {
                this.playACard(me);
                this.play();
            }));
        } else if (this.twoClubsPassed) {
            this.setInstruction('You passed the 2 of clubs to player ' + this.passTo);
            this.playerId = this.passTo;
            this.hand.append(twoClubs.getButton(me => {
                this.playACard(me);
                this.play();
            }));
        } else {
            this.setInstruction('Select which player has the 2 of clubs.');
            for (let i = 1; i <= this.numPlayers; i++) {
                const newButton = document.createElement('button');
                newButton.textContent = 'P' + i;
                newButton.addEventListener('click', () => {
                    console.log('Started with P' + i);
                    this.playerId = i;
                    this.playACard(twoClubs);
                    this.play();
                });
                this.hand.append(newButton);
            }
        }
    }
    private play(): void {
        this.clearChildren(this.hand);
        this.showPlayerData();
        if (this.trickNum > this.cardsPerHand) {
            this.endGame();
            return;
        }
        if (this.playerId === 0) {
            this.setInstruction('Trick #' + this.trickNum + ': Play a card.');
            this.hand.append(...this.deck.hand(0, this.suitLead).map(card => card.getButton(me => {
                this.playACard(me);
            })));
        } else {
            this.setInstruction('Trick #' + this.trickNum + ': Which card did player ' + this.playerId + ' play?');
            this.hand.append(...this.deck.hand(this.playerId).map(card => card.getButton(me => {
                this.playACard(me);
            })));
        }
    }
    private playACard(card: Card): void {
        if (this.suitLead === 0) {
            this.suitLead = card.suit;
        }
        this.players[this.playerId].play(card, this.suitLead, this.deck, this.cardsPerHand - this.trickNum);
        this.onTable[this.playerId] = card;
        this.table.append(card.getDiv());
        // Count the number of cards that have been played
        let cardsPlayed: number = 0;
        for (const card of this.onTable) {
            if (card) { cardsPlayed++; }
        }
        if (cardsPlayed >= 4) {
            // Determine which player takes the trick
            const highCard: Card = this.onTable.filter(card => card.suit === this.suitLead).sort((a, b) => b.value - a.value)[0];
            this.playerId = this.onTable.findIndex(card => card === highCard);
            if (this.playerId === 0) {
                this.setInstruction('You won trick #' + this.trickNum + ' with ' + highCard.toString());
            } else {
                this.setInstruction('Player ' + this.playerId + ' won trick #' + this.trickNum + ' with ' + highCard.toString());
            }
            this.players[this.playerId].take(this.onTable);
            this.clearChildren(this.hand);
            const nextButton: HTMLButtonElement = document.createElement('button');
            nextButton.textContent = 'Take';
            this.hand.append(nextButton);
            nextButton.addEventListener('click', () => {
                // Advance to the next trick
                this.trickNum++;
                this.suitLead = 0;
                this.onTable = [];
                this.clearChildren(this.table);
                this.play();
            });
        } else {
            // Increment playerId by 1, wrapping around if necessary.
            this.playerId = (this.playerId + 1) % (this.numPlayers + 1);
            this.play();
        }
    }
    private endGame(): void {
        const takenPoints: Array<Player> = this.players.filter(player => player.hasTakenPoints);
        if (takenPoints.length === 1) {
            if (takenPoints[0].id === 0) {
                this.setInstruction('Congratulations, you shot the moon!');
            } else {
                this.setInstruction('Player ' + takenPoints[0].id + ' shot the moon.');
            }
            return;
        }
        const winningScore: number = Math.min(...this.players.map(player => player.score)),
            winners: Array<string> = this.players.filter(player => player.score <= winningScore).map(player => {
                if (player.id === 0) {
                    return 'You'
                } else {
                    return 'P' + player.id;
                }
            });
        if (winners.length === 1) {
            this.setInstruction('Winner: ' + winners[0] + ' (' + winningScore + ')');
        } else {
            this.setInstruction('Winners: ' + winners.join(',') + ' (' + winningScore + ')');
        }
    }
    private setInstruction(text: string): void {
        this.instruction.textContent = text;
    }
    private showPlayerData(): void {
        this.clearChildren(this.playerData);
        const allDiv: HTMLDivElement = document.createElement('div');
        for (const player of this.players) {
            const playerDiv: HTMLDivElement = document.createElement('div');
            playerDiv.style.display = 'flex';
            playerDiv.style.flexWrap = 'wrap';
            const playerName: string = (player.id === 0 ? 'You' : ('P' + player.id));
            playerDiv.append(playerName + ' (' + player.score + '):', ...this.deck.hand(player.id).map(card => card.getDiv()));
            if (player.id > 0) {
                allDiv.append(document.createElement('hr'));
            }
            allDiv.append(playerDiv);
        }
        this.playerData.append(allDiv);
    }
    private clearChildren(node: Node): void {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    private clearAll(): void {
        this.clearChildren(this.instruction);
        this.clearChildren(this.playerData);
        this.clearChildren(this.table);
        this.clearChildren(this.hand);
    }
}