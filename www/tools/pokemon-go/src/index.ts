import { clamp, round2 } from 'smath';
import { Range } from './range';
import { Ring } from './ring';

console.log('Loaded!');
const form = document.getElementById('form')!;
const output = document.getElementById('output')!;
const throwType = document.getElementById('throwtype')!;
const color = new Range(form, 'Ring Color', { min: 0, max: 100, step: 1, val: 50 });
const size = new Range(form, 'Ring Size', { min: 0, max: 100, step: 1, val: 50 });
const curve = new Range(form, 'Throw was a curveball?', { min: 1, max: 2, step: 1, val: 1 });
const ring = new Ring(100, 5, document.getElementById('ring')!);
color.onChange(calculate);
size.onChange(calculate);
curve.onChange(calculate);
function calculate(): void {
    console.log(`Calculating with parameters: color=${color.getValue()}, size=${size.getValue()}, curve=${curve.getValue()}...`);
    ring.setColor(color.getValue() / 100);
    ring.setSize(size.getValue() / 100);
    if (size.getValue() < 30) {
        throwType.textContent = 'Excellent!';
    } else if (size.getValue() < 70) {
        throwType.textContent = 'Great!';
    } else if (size.getValue() < 100) {
        throwType.textContent = 'Nice!';
    } else {
        throwType.textContent = 'Good';
    }
    /**
     * Initial probability without factoring throw or curve modifiers.
     */
    const prob0: number = color.getValue() / 100;
    /**
     * Throw bonus modifier
     */
    const throwMod: number = 2 - size.getValue() / 100;
    /**
     * Curveball modifier
     */
    const curveMod: number = clamp(curve.getValue(), 1, 1.7);
    /**
     * Total bonus modifier not accounted for by `prob0`
     */
    const modifier: number = throwMod * curveMod;
    /**
     * Probability after modifier is applied
     */
    const prob1: number = 1 - (1 - prob0) ** modifier;
    // Display the final probability
    output.textContent = round2(prob1 * 100, 0.1).toString();
}
calculate();
