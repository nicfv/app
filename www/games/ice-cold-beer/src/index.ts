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
        canv.clear();
        rod.move(dt,
            canv.isKeyDown('w') ? 'Up' : canv.isKeyDown('s') ? 'Down' : 'None',
            canv.isKeyDown('i') ? 'Up' : canv.isKeyDown('k') ? 'Down' : 'None');
        ball.move(dt, rod);
        canv.draw(ball);
        canv.draw(rod);
    },
});
