import './close-info-handler';
import { Canvas } from 'graphico';
import { buyType, income, player, store, wheels, zoom } from './state';

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
