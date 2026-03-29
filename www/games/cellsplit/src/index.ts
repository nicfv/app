import { Canvas } from 'graphico';
import { Cell } from './cell';

const cell = new Cell({ x: 1, y: 1 });

const canv = new Canvas({
    background: 'lightgray',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    loop(dt) {
        if (canv.isMouseButtonDown(dt)) {
            console.log('Life is meaningless.');
        }
        canv.draw(cell);
    },
});