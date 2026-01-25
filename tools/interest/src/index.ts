import { Input } from './input';
import { Button } from './button';
import { Dropdown, DropdownItem } from './dropdown';
import { lib } from './lib';

window.addEventListener('load', main);

const calculationTypes: Array<DropdownItem> = [
    { key: 'Final value (How much will I have?)', value: 'F' },
    { key: 'Initial value (How much do I need right now?)', value: 'P' },
    { key: 'Annual interest rate (What\'s my average growth?)', value: 'i' },
    { key: 'Duration (How long do I need to wait?)', value: 'n' },
];

let calculationType: Dropdown;

function main(): void {
    console.log('Loaded!');
    const selectorContainer = document.getElementById('selector')!;
    calculationType = new Dropdown(selectorContainer, 'Calculation Type', calculationTypes);
    calculationType.onChange(() => setupForm());
    setupForm();
}

function removeChildren(element: Element): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function setupForm(): void {
    console.log('Setting up form.');
    const form = document.getElementById('form')!,
        output = document.getElementById('output')!;
    removeChildren(form);
    removeChildren(output);
    const F = new Input(calculationType.getValue() === 'F' ? output : form, 'Final Value [$]', calculationType.getValue() !== 'F', { min: 0, step: 0.01 }),
        P = new Input(calculationType.getValue() === 'P' ? output : form, 'Initial Value [$]', calculationType.getValue() !== 'P', { min: 0, step: 0.01 }),
        i = new Input(calculationType.getValue() === 'i' ? output : form, 'Annual Interest Rate [%]', calculationType.getValue() !== 'i', { step: 0.01 }),
        n = new Input(calculationType.getValue() === 'n' ? output : form, 'Duration [yr]', calculationType.getValue() !== 'n', { min: 0, step: 1 / 12 }),
        w = new Input(form, 'Compound Frequency [#/yr]', true, { min: 1 }),
        btnClear = new Button(output, 'Clear');
    F.onChange(calculate);
    P.onChange(calculate);
    i.onChange(calculate);
    n.onChange(calculate);
    w.onChange(calculate);
    btnClear.onClick(() => {
        F.clear();
        P.clear();
        i.clear();
        n.clear();
        w.clear();
    });

    function calculate(): void {
        console.log('Calculating...');
        switch (calculationType.getValue()) {
            case ('F'): {
                F.setValue(lib.F(P.getValue(), i.getValue(), n.getValue(), w.getValue()));
                break;
            }
            case ('P'): {
                P.setValue(lib.P(F.getValue(), i.getValue(), n.getValue(), w.getValue()));
                break;
            }
            case ('i'): {
                i.setValue(lib.i(F.getValue(), P.getValue(), n.getValue(), w.getValue()));
                break;
            }
            case ('n'): {
                n.setValue(lib.n(F.getValue(), P.getValue(), i.getValue(), w.getValue()));
                break;
            }
            default: {
                throw new Error('The value "' + calculationType.getValue() + '" is not a valid selection.');
            }
        }
    }
}