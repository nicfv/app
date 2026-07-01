import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';

const w1: Wheel = new Wheel(0);
w1.data.speedLevel++;
const w2: Wheel = new Wheel(1);
w2.data.speedLevel++;

const canv: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    parent: document.getElementById('game') as HTMLElement,
    loop(dt) {
        w1.rotate(dt);
        w2.rotate(dt);
        canv.clear();
        canv.draw(w1);
        canv.draw(w2);
    },
});

console.log(canv);
