import { Canvas } from 'graphico';
import { Game } from './game';

const game = new Game(400, 600, 'Easy');

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: game.height,
    width: game.width,
    loop(dt) {
        canv.clear();
        // rod.move(dt,
        //     canv.isKeyDown('w') ? 'Up' : canv.isKeyDown('s') ? 'Down' : 'None',
        //     canv.isKeyDown('i') ? 'Up' : canv.isKeyDown('k') ? 'Down' : 'None');
        // ball.move(dt, rod, holes);
        canv.draw(game);
    },
});
