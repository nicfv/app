import { Canvas } from 'graphico';
import { Ballistic } from './ballistic';

const ballistic = new Ballistic(400, 600);

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: ballistic.height,
    width: ballistic.width,
    loop(dt) {
        canv.clear();
        ballistic.gameInput(canv.isKeyDown('w'), canv.isKeyDown('s'), canv.isKeyDown('i'), canv.isKeyDown('k'));
        ballistic.tick(dt);
        canv.draw(ballistic);
    },
    keydown(key) {
        if (key === 'w' || key === 'arrowup') {
            ballistic.scrollUp();
        } else if (key === 's' || key === 'arrowdown') {
            ballistic.scrollDown();
        } else if (key === ' ' || key === 'enter' || key === 'tab') {
            ballistic.select();
        } else if (key === 'escape' || key === 'backspace') {
            ballistic.escape();
        }
    },
});
