import { Canvas } from 'graphico';
import { Cell } from './cell';
import { pan } from './globals';

const cell = new Cell({ x: 1, y: 1 });

const canv = new Canvas({
    background: 'lightgray',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    loop(dt) {
        if (canv.isKeyDown('d') || canv.isKeyDown('arrowright')) {
            pan.x--;
        }
        if (canv.isKeyDown('a') || canv.isKeyDown('arrowleft')) {
            pan.x++;
        }
        if (canv.isKeyDown('s') || canv.isKeyDown('arrowdown')) {
            pan.y--;
        }
        if (canv.isKeyDown('w') || canv.isKeyDown('arrowup')) {
            pan.y++;
        }
        canv.clear();
        canv.draw(cell);
    },
    mousemove(x, y) {
        cell.checkHover({ x: x, y: y });
    },
});