import { config, Quantity, Unit, units } from 'dimensional';
import * as SMath from 'smath';
import { Pair } from './types';
import * as Program from './program';

/**
 * https://www.mathjax.org/
 */
declare const MathJax: any;

window.addEventListener('load', main);

function main(): void {
    console.log('Loaded!');
    setUnitOptions('unit-select');
    setupListeners();
}

/**
 * Shorthand for document.getElementById(...)
 */
function el<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

function setUnitOptions(elementId: string): void {
    console.log('Adding units to ' + elementId + '...');
    const unitSelect: HTMLSelectElement = el(elementId);
    for (const namedUnit of Program.getUnitNames()) {
        const unitOption: HTMLOptionElement = document.createElement('option');
        unitOption.textContent = namedUnit;
        unitSelect.appendChild(unitOption);
    }
    unitSelect.value = 'Unitless';
}

function displayMath(quantityContainer: HTMLElement, dimensionContainer: HTMLElement): void {
    const sameDims: boolean = Program.currentUnits.input.dimensions.is(Program.currentUnits.output.dimensions);
    const compare: string = sameDims ? ' = ' : ' \\ne ';
    quantityContainer.textContent = '$$' + Program.quantities.input.toString() + compare + Program.quantities.output.toString() + '$$';
    dimensionContainer.textContent = '$$' + Program.currentUnits.input.dimensions.toString() + compare + Program.currentUnits.output.dimensions.toString() + '$$';
    if (sameDims) {
        dimensionContainer.title = `Dimension: ${Program.getDimensionName(Program.currentUnits.input.dimensions)}`;
    } else {
        dimensionContainer.title = 'Dimensions not equal';
    }
}

function formatConversion(conv: number): string {
    const invert: boolean = conv < 1;
    const operator: string = invert ? '\\div' : '\\times';
    if (invert) {
        conv = 1 / conv;
    }
    const convQuant: Quantity = new Quantity(conv, units.Unitless);
    config.showUnitless = false;
    const convStr: string = `$$${operator} ${convQuant.toString()} =$$`;
    config.showUnitless = true;
    return convStr;
}

function setupListeners(): void {
    console.log('Setting up listeners...');
    // Get all elevant HTML elements
    const instructionsHideShow: HTMLElement = el('instructions-hide-show');
    const instructions: HTMLElement = el('instructions');
    const unitSelectedHeading: HTMLElement = el('unit-select-heading');
    const setOther: HTMLElement = el('set-other');
    const swap: HTMLElement = el('swap');
    const clear: HTMLElement = el('clear');
    const unitSelect: HTMLSelectElement = el('unit-select');
    const exponent: HTMLInputElement = el('exponent');
    const mult: HTMLElement = el('multiply');
    const quantity: HTMLElement = el('quantity');
    const dimensions: HTMLElement = el('dimensions');
    const quantities: Pair<HTMLInputElement> = {
        input: el('input-quantity'),
        output: el('output-quantity'),
    };
    const conversion: HTMLElement = el('conversion');
    function refresh(): void {
        if (Program.settings.showInstructions) {
            instructionsHideShow.textContent = '-';
            instructionsHideShow.title = 'Hide the instructions';
            instructions.style.display = 'block';
        } else {
            instructionsHideShow.textContent = '+';
            instructionsHideShow.title = 'Show the instructions';
            instructions.style.display = 'none';
        }
        unitSelectedHeading.textContent = `Set ${Program.settings.currentEdit} Units`;
        if (Program.settings.currentEdit === 'Input') {
            setOther.textContent = '\u2192';
            setOther.title = 'Set output units';
        } else {
            setOther.textContent = '\u2190';
            setOther.title = 'Set input units';
        }
        Program.quantities.input = new Quantity(+quantities.input.value, Program.currentUnits.input);
        try {
            Program.quantities.output = Program.quantities.input.as(Program.currentUnits.output);
            quantities.output.value = Program.quantities.output.quantity.toString();
            const conversionFactor: number = Program.currentUnits.input.to(Program.currentUnits.output);
            conversion.textContent = formatConversion(conversionFactor);
        } catch {
            Program.quantities.output = new Quantity(0, Program.currentUnits.output);
            quantities.output.value = '';
            conversion.textContent = '$$\\ne$$';
        }
        displayMath(quantity, dimensions);
        MathJax.typesetPromise();
    }
    instructionsHideShow.addEventListener('click', () => {
        Program.settings.showInstructions = !Program.settings.showInstructions;
        refresh();
    });
    setOther.addEventListener('click', () => {
        if (Program.settings.currentEdit === 'Input') {
            Program.settings.currentEdit = 'Output';
        } else {
            Program.settings.currentEdit = 'Input';
        }
        refresh();
    });
    swap.addEventListener('click', () => {
        Program.swapPair(Program.currentUnits);
        refresh();
    });
    clear.addEventListener('click', () => {
        if (Program.settings.currentEdit === 'Input') {
            Program.currentUnits.input = units.Unitless;
        } else {
            Program.currentUnits.output = units.Unitless;
        }
        refresh();
    });
    mult.addEventListener('click', () => {
        const selectedUnitName: string = unitSelect.value;
        const exponentNum: number = +exponent.value;
        const unitFactor: Unit = Program.getUnitByName(selectedUnitName).pow(exponentNum);
        if (Program.settings.currentEdit === 'Input') {
            Program.currentUnits.input = Program.currentUnits.input.times(unitFactor);
        } else {
            Program.currentUnits.output = Program.currentUnits.output.times(unitFactor);
        }
        refresh();
    });
    quantities.input.addEventListener('input', refresh);
    refresh();
}