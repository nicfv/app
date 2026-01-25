import { WordGen } from './WordGen';
import { StateColors, TriSwitch } from './TriSwitch';
import { Hamburger } from './Hamburger';
import { ALPH_TYPES } from './types';

/**
 * Global
 */
let WG: WordGen;

// Define default values
const DEFAULT_GUESSES = 5,
    DEFAULT_CHARS = 5;

/**
 * Return an HTML element given an `id`
 */
const el = (id: string) => document.getElementById(id) as HTMLInputElement;

// Hide the main user panel
el('main').style.display = 'none';

// Build the setup menu
const ALPH_SWITCH = new TriSwitch(55, 25, [
    new StateColors('#999', '#333', '#999', 'Classic Wordle'),
    new StateColors('#999', '#333', '#999', 'Math Wordle'),
    new StateColors('#999', '#333', '#999', 'Alphabet (A-Z) Only'),
    new StateColors('#999', '#333', '#999', 'Custom Charset'),
], 1.5, 3.5, 0.5, true, el('alphtype'));

const updateSetup = () => {
    el('p_alphtype').textContent = ALPH_SWITCH.getStateDescription();
    el('txt_cust').hidden = ALPH_SWITCH.getState() !== ALPH_TYPES.CUST_ONLY;
    el('go').disabled = (ALPH_SWITCH.getState() === ALPH_TYPES.CUST_ONLY && !el('txt_cust').value);
    el('num_chars').disabled = (ALPH_SWITCH.getState() === ALPH_TYPES.WORD_DICT);
    if (ALPH_SWITCH.getState() === ALPH_TYPES.WORD_DICT) {
        el('num_chars').value = '';
    }
};

ALPH_SWITCH.setOnclick(updateSetup);
el('txt_cust').addEventListener('input', updateSetup);
updateSetup();

el('go').addEventListener('click', () => {
    WG = new WordGen(+el('num_guesses').value || DEFAULT_GUESSES, +el('num_chars').value || DEFAULT_CHARS, ALPH_SWITCH.getState(), el('txt_cust').value, el('input'));
    document.body.removeChild(el('setup'));
    el('charset').textContent = WG.getCharset().split('').join(' ');
    el('main').style.display = 'flex';
});

// Add event listeners to show help menu
const HAM = new Hamburger(16, '#080', '#880', 0.5, document.body)
HAM.setPosition(-4, 4);
HAM.setOnclick(() => el('help').style.right = (HAM.isOpen() ? '0' : ''));

// Add control panel user input actions
el('clear').addEventListener('click', () => {
    WG instanceof WordGen && WG.clearInput();
    el('words').textContent = '';
    el('numwords').textContent = '';
    el('copy').disabled = true;
    el('clear').disabled = true;
});

el('copy').addEventListener('click', () => navigator.clipboard.writeText(el('words').textContent));

el('gen').addEventListener('click', () => {
    const list: Array<string> = WG.generate();
    let wordString = '';
    for (let i: number = 0; i < list.length; i++) {
        if (i % 5) {
            wordString += ' ';
        } else if (i > 0) {
            wordString += '\n';
        }
        wordString += list[i];
    }
    el('words').textContent = wordString;
    el('numwords').textContent = list.length + ' possible letter combinations';
    el('copy').disabled = false;
    el('clear').disabled = false;
});