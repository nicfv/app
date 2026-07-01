import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';
import { NUM_WHEELS } from './globals';

const wheels: Wheel[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i));
    wheels[i].data.speedLevel++;
}

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
    },
});

console.log(canv);
