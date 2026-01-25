import { Canvas } from 'graphico';
import { Mountain } from './mount';
import * as SMath from 'smath';

const layers = 6;
const mounts: Mountain[] = [];

export const game: Canvas = new Canvas({
    background: '#221144',
    border: 'black',
    borderBlur: 'gray',
    width: 1280,
    height: 720,
    numLayers: layers,
    loop(dt) {
        game.clear();
        for (let i = 0; i < mounts.length; i++) {
            mounts[i].step(100, dt);
            game.draw(mounts[i], i);
        }
    },
});

for (let i = 0; i < layers; i++) {
    mounts.push(new Mountain(SMath.normalize(i, layers - 1, 0)));
}
