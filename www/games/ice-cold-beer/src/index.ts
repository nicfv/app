import { Canvas } from 'graphico';
import { Game } from './game';

const game = new Game(400, 600, 'Medium');

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: game.height,
    width: game.width,
    loop(dt) {
        canv.clear();
        game.input(canv.isKeyDown('w'), canv.isKeyDown('s'), canv.isKeyDown('i'), canv.isKeyDown('k'));
        game.tick(dt);
        canv.draw(game);
    },
});
