import * as dim from 'dimensional';
import * as cm from 'codemirror';
import * as cmjs from '@codemirror/lang-javascript';
/**
 * Represents an object that can be converted to string
 */
interface Stringable { toString(): string };
/**
 * The MathJax object
 */
declare const MathJax: any;
/**
 * Variables passed into the user's code
 */
const argumentVars: Array<string> = ['LaTeX', 'log', 'Dimension', 'Prefix', 'Quantity', 'Unit', 'config', 'dimensions', 'prefixes', 'units'];
/**
 * Initial sample program
 */
const initExample: string = `// Available variables & methods:
// ${argumentVars.join(', ')}
const distance = new Quantity(5, units.meter);
LaTeX(distance, '=', distance.as(units.foot));
log('Input quantity =', distance.quantity);`;
/**
 * The codemirror editor
 */
const view: cm.EditorView = new cm.EditorView({
    parent: document.getElementById('js')!,
    doc: initExample,
    extensions: [cm.basicSetup, cmjs.javascript()],
});
view.dom.addEventListener('keyup', executeJSFunction);
executeJSFunction();
/**
 * Execute the user-inputted JavaScript code
 */
function executeJSFunction(): void {
    console.log('Running...');
    const input = view.state.doc.toString();
    const output = document.getElementById('out')!;
    const debug = document.getElementById('log')!;
    output.textContent = '';
    debug.textContent = '';
    try {
        const result = new Function(...argumentVars, input);
        result(LaTeX, log, dim.Dimension, dim.Prefix, dim.Quantity, dim.Unit, dim.config, dim.dimensions, dim.prefixes, dim.units);
    } catch (e: any) {
        log(e);
    }
    MathJax.typesetPromise();
}
/**
 * Render a mathematical expression
 */
function LaTeX(...LaTeX: Stringable[]): void {
    console.log('Printing...');
    const output = document.getElementById('out')!;
    output.textContent += `\$\$${LaTeX.map(line => line.toString()).join(' ')}\$\$`;
}
/**
 * Log a message to the visible console
 */
function log(...text: Stringable[]): void {
    console.log('Logging...');
    const output = document.getElementById('log')!;
    output.textContent += `${text.map(line => line.toString()).join(' ')}\r\n`;
}