import { Canvas } from 'graphico';
import { Cell } from './cell';
import { Grid } from './grid';

const grid: Grid = new Grid({ x: 20, y: 20 }, { x: 100, y: 100 });
const cells: Cell[] = [new Cell({ x: 1, y: 1 }, grid, 10)];

const canv = new Canvas({
    background: 'lightgray',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    parent: document.getElementById('canv') ?? document.body,
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
        canv.draw(grid);
        for (const cell of cells) {
            canv.draw(cell);
        }
    },
    mousemove(x, y) {
        for (const cell of cells) {
            cell.checkHover({ x: x, y: y });
        }
    },
    mousedown(button) {
        if (button === 0) {
            for (const cell of cells) {
                cell.split(cells);
            }
        }
    },
    keydown(key) {
        if (key === 'r') {
            grid.pan('Reset');
        }
        if (key === 'x') {
            cells.splice(0);
            cells.push(new Cell({ x: 1, y: 1 }, grid, 5));
        }
    },
});
