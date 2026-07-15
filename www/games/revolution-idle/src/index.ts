import './close-info-handler';
import { Canvas } from 'graphico';
import { Wheel } from './wheel';
import { NUM_WHEELS } from './globals';
import { Income } from './income';
import { Store } from './store';
import { buyType, player, zoom } from './state';


const wheels: Wheel[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i));
}

const income: Income = new Income(wheels);
const store: Store = new Store(10, 120, wheels);

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
        canv.draw(player);
        canv.draw(zoom);
        canv.draw(income);
        canv.draw(store);
        canv.draw(buyType);
    },
    mousemove(x, y) {
        zoom.checkHover(x, y);
        buyType.checkHover(x, y);
        store.checkHover(x, y);
    },
    mousedown(button) {
        zoom.click(button);
        buyType.click(button);
        store.click(button);
    },
});
