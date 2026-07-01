import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';
import { NUM_WHEELS } from './globals';
import { Button } from './button';
import { Color } from 'viridis';

const wheels: Wheel[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i));
    wheels[i].data.speedLevel++;
}

const button1: Button = new Button('Hello\nworld', new Color(50, 100, 150), 20, 30, 40, 50, () => console.log('test'));

const canv: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    parent: document.getElementById('game') as HTMLElement,
    loop(dt) {
        canv.clear();
        for (const wheel of wheels) {
            wheel.rotate(dt);
            canv.draw(wheel);
        }
        canv.draw(button1);
    },
    mousemove(x, y) {
        button1.checkHover(x, y);
    },
    mousedown(button) {
        button1.click(button);
    },
});

console.log(canv);
