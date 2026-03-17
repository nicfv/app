import { Canvas } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';
import { rint } from 'smath';

const gameWidth = 400,
    gameHeight = 600,
    ballSize = 10,
    padding = 2;

const ball = new Ball(0, 0, ballSize, gameWidth);
const rod = new Rod(gameHeight - 50, gameHeight - 50, gameWidth, gameHeight);
const holes: Hole[] = [];

const holeR = ballSize * 1.1;
for (let y = gameHeight - 100; y > holeR * 2; y -= rint(1, holeR)) {
    const hole = new Hole(rint(holeR * 2, gameWidth - holeR * 2), y, holeR, padding);
    let intersects = false;
    for (const existingHole of holes) {
        if (hole.intersects(existingHole)) {
            intersects = true;
            break;
        }
    }
    if (!intersects) {
        holes.push(hole);
    }
}
holes[0].select();

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: gameHeight,
    width: gameWidth,
    loop(dt) {
        canv.clear();
        rod.move(dt,
            canv.isKeyDown('w') ? 'Up' : canv.isKeyDown('s') ? 'Down' : 'None',
            canv.isKeyDown('i') ? 'Up' : canv.isKeyDown('k') ? 'Down' : 'None');
        ball.move(dt, rod);
        for (const hole of holes) {
            canv.draw(hole);
        }
        canv.draw(ball);
        canv.draw(rod);
    },
});
