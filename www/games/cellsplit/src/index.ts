import { Canvas } from 'graphico';
import { Cell } from './cell';
import { Grid } from './grid';

const grid = new Grid({ x: 10, y: 10 });
const cell = new Cell({ x: 1, y: 1 }, grid, 5);

const canv = new Canvas({
    background: 'lightgray',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    loop() {
        if (canv.isKeyDown('d') || canv.isKeyDown('arrowright')) {
            grid.pan('Right');
        }
        if (canv.isKeyDown('a') || canv.isKeyDown('arrowleft')) {
            grid.pan('Left');
        }
        if (canv.isKeyDown('s') || canv.isKeyDown('arrowdown')) {
            grid.pan('Down');
        }
        if (canv.isKeyDown('w') || canv.isKeyDown('arrowup')) {
            grid.pan('Up');
        }
        canv.clear();
        canv.draw(cell);
    },
    mousemove(x, y) {
        cell.checkHover({ x: x, y: y });
    },
});