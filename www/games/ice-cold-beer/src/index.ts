import { Canvas } from 'graphico';
import { Game } from './game';
import { Menu } from './menu';

const game = new Game(400, 600, 'Easy');
const menu = new Menu('Ballistic', 'Select a difficulty and\npress Enter to start:', ['Easy', 'Medium', 'Hard']);

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
        canv.clear();
        canv.draw(menu);
    },
    keydown(key) {
        if (key === 'w' || key === 'arrowup') {
            menu.scrollUp();
        } else if (key === 's' || key === 'arrowdown') {
            menu.scrollDown();
        }
    },
});
