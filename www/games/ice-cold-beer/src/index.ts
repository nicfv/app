import { Canvas } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';

const ball = new Ball(100, 100, 20);
const rod = new Rod(0, 550, 400, 550);

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: 600,
    width: 400,
    loop(dt) {
        // console.log(canv.isMouseButtonDown(1), dt);
        canv.draw(ball);
        canv.draw(rod);
    },
});
