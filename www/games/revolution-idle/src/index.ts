import './close-info-handler';
import { Canvas } from 'graphico';
import { buyType, income, player, shop, wheels, zoom } from './state';

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
            player.earn(income.getIncomePerRotation() * wheel.rotate(dt));
            canv.draw(wheel);
        }
        canv.draw(player);
        canv.draw(zoom);
        canv.draw(income);
        canv.draw(shop);
        canv.draw(buyType);
    },
    mousemove(x, y) {
        zoom.checkHover(x, y);
        buyType.checkHover(x, y);
        shop.checkHover(x, y);
    },
    mousedown(button) {
        zoom.click(button);
        buyType.click(button);
        shop.click(button);
    },
});
