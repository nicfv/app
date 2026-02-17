import { Canvas } from 'graphico';
import { Star } from './Star';

export const stars: Star[] = [];

export const game: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 1280,
    height: 720,
    loop(dt) {
        game.clear();
        const left: boolean = game.isKeyDown('arrowleft');
        const right: boolean = game.isKeyDown('arrowright');
        const up: boolean = game.isKeyDown('arrowup');
        const down: boolean = game.isKeyDown('arrowdown');
        for (const star of stars) {
            star.move((left ? -1 : 0) + (right ? 1 : 0), (up ? -1 : 0) + (down ? 1 : 0), dt);
            game.draw(star);
        }
    },
});
