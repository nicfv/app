import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';
import { NUM_WHEELS } from './globals';
import { BuyButton } from './buy-button';
import { Player } from './player';
import { Zoom } from './zoom';
import { Income } from './income';
import { BuyType } from './buy-type';

const player: Player = new Player(1);
const zoom: Zoom = new Zoom(700, 150);
const btype: BuyType = new BuyType(690, 250);

const wheels: Wheel[] = [];
const buttons: BuyButton[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i, zoom));
    buttons.push(new BuyButton(wheels[i], player, zoom, btype));
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
            player.money += income.getIncomePerRotation() * wheel.rotate(dt);
            canv.draw(wheel);
        }
        for (const bbtn of buttons) {
            bbtn.setText();
            canv.draw(bbtn);
        }
        canv.draw(player);
        canv.draw(zoom);
        canv.draw(income);
        canv.draw(btype);
    },
    mousemove(x, y) {
        for (const bbtn of buttons) {
            bbtn.checkHover(x, y);
        }
        zoom.checkHover(x, y);
        btype.checkHover(x, y);
    },
    mousedown(button) {
        for (const bbtn of buttons) {
            bbtn.click(button);
        }
        zoom.click(button);
        btype.click(button);
    },
});
