import { CharInput } from './CharInput';
import { DICT } from './dictionary';
import { isValid } from './IsValid';
import { ALPH_TYPES, CHAR_INPUT_STATUS } from './types';

/**
 * Represents a class that manages the character input elements and can generate a list of possible words.
 */
export class WordGen {
    private readonly charInputs: Array<Array<CharInput>> = [];
    private readonly alph: string = '';
    private prefiltered: string;
    private words: Array<string> = [];
    private readonly checkDict: boolean = false;
    private readonly solve: boolean = false;
    /**
     * Create a new `CharManager`
     */
    constructor(words: number, chars: number, alphType: ALPH_TYPES, customCharset: string, parent: HTMLElement) {
        switch (alphType) {
            case (ALPH_TYPES.WORD_DICT): {
                this.checkDict = true;
            }
            case (ALPH_TYPES.ALPH_ONLY): {
                this.alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            }
            case (ALPH_TYPES.MATH_SOLV): {
                this.solve = true;
                this.alph = '1234567890+-*/=';
                break;
            }
            case (ALPH_TYPES.CUST_ONLY): {
                this.alph = this.removeDuplicateChars(customCharset);
                break;
            }
            default: {
                throw 'Invalid alphabet type.';
            }
        }
        this.prefiltered = this.alph;
        for (let w: number = 0; w < words; w++) {
            const WORD_DIV = document.createElement('div');
            WORD_DIV.setAttribute('class', 'word');
            this.charInputs[w] = [];
            for (let c: number = 0; c < chars; c++) {
                this.charInputs[w][c] = new CharInput(this.alph, WORD_DIV);
            }
            parent.appendChild(WORD_DIV);
        }
    }
    /**
     * Return the allowable character set.
     */
    public getCharset(): string {
        return this.alph;
    }
    /**
     * Remove duplicate characters in the custom charset.
     */
    private removeDuplicateChars(str: string): string {
        return Array.from(new Set(str.toUpperCase())).sort().join('');
    }
    /**
     * Generate an array of characters that are valid for a certain position in the word.
     */
    private generateValidCharsForPosition(c: number): string {
        let alph = this.prefiltered;
        for (let w in this.charInputs) {
            const input = this.charInputs[w][c];
            if (input instanceof CharInput) {
                if (input.hasValue()) {
                    if (input.getStatus() === CHAR_INPUT_STATUS.CORRECT) {
                        return input.getChar();
                    } else if (input.getStatus() === CHAR_INPUT_STATUS.INCORRECT_PLACEMENT) {
                        alph = alph.replace(input.getChar(), '');
                    }
                }
            } else {
                return '';
            }
        }
        return alph;
    }
    /**
     * Apply a pre-filter to the alphabet to get rid of characters that do not appear in the word.
     */
    private prefilter(): void {
        this.prefiltered = this.alph;
        for (let w in this.charInputs) {
            for (let c in this.charInputs[w]) {
                const input = this.charInputs[w][c];
                if (input instanceof CharInput && input.hasValue() && input.getStatus() === CHAR_INPUT_STATUS.INCORRECT) {
                    this.prefiltered = this.prefiltered.replace(input.getChar(), '');
                }
            }
        }
    }
    /**
     * Generate an array of characters that are required in the word but are not in the correct position.
     */
    private getRequiredCharacters(): Array<string> {
        const req = [];
        for (let w in this.charInputs) {
            for (let c in this.charInputs[w]) {
                const input = this.charInputs[w][c];
                if (input instanceof CharInput && input.hasValue() && input.getStatus() === CHAR_INPUT_STATUS.INCORRECT_PLACEMENT) {
                    req.push(input.getChar());
                }
            }
        }
        return req;
    }
    /**
     * Clear all user input.
     */
    public clearInput(): void {
        for (let w in this.charInputs) {
            for (let c in this.charInputs[w]) {
                this.charInputs[w][c].clear();
            }
        }
    }
    /**
     * Return a list of all possible character combinations for the input specified.
     */
    public generate(): Array<string> {
        this.words = [];
        this.prefilter();
        if (this.checkDict) {
            DICT.forEach(word => {
                for (let i: number = 0; i < word.length; i++) {
                    if (!this.generateValidCharsForPosition(+i).includes(word[i])) {
                        return;
                    }
                }
                this.words.push(word);
            });
        } else {
            this.buildWords();
        }
        const requiredChars = this.getRequiredCharacters();
        requiredChars.forEach(char => {
            this.words = this.words.filter(x => x.includes(char));
        });
        return this.words;
    }
    /**
     * Generate the complete list of possible character combinations.
     */
    private buildWords(word: string = '', char: number = 0): void {
        const chars = this.generateValidCharsForPosition(char);
        if (!chars.length) {
            if (word) {
                if (this.solve) {
                    if (isValid(word)) {
                        this.words.push(word);
                    }
                } else {
                    this.words.push(word);
                }
            }
            return;
        }
        for (let c of chars) {
            this.buildWords(word + c, char + 1);
        }
    }
}