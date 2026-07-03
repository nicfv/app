import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';
import { NUM_WHEELS } from './globals';
import { BuyButton } from './buy-button';
import { Player } from './player';
import { Zoom } from './zoom';
import { Income } from './income';

const player: Player = new Player(0);
const zoom: Zoom = new Zoom(700, 150);

const wheels: Wheel[] = [];
const buttons: BuyButton[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i, zoom));
    wheels[i].increaseSpeed();
    buttons.push(new BuyButton(wheels[i], zoom));
}

const income: Income = new Income(zoom, wheels);

const canv: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    parent: document.getElementById('game') as HTMLElement,
    loop(dt) {
        canv.clear();
        for (const wheel of wheels) {
            wheel.rotate(dt);
            canv.draw(wheel);
        }
        for (const bbtn of buttons) {
            canv.draw(bbtn);
        }
        canv.draw(player);
        canv.draw(zoom);
        canv.draw(income);
    },
    mousemove(x, y) {
        for (const bbtn of buttons) {
            bbtn.checkHover(x, y);
        }
        zoom.checkHover(x, y);
    },
    mousedown(button) {
        for (const bbtn of buttons) {
            bbtn.click(button);
        }
        zoom.click(button);
    },
});
