import './close-info-handler';
import { Canvas } from 'graphico';
import { buyType, income, menu, paused, player, shop, tutorial, orbits, zoom } from './state';

const canv: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    parent: document.getElementById('game') as HTMLElement,
    loop(dt) {
        canv.clear();
        for (const orbit of orbits) {
            player.earn(income.getIncomePerRotation() * orbit.rotate(dt));
            canv.draw(orbit);
        }
        canv.draw(player);
        canv.draw(zoom);
        canv.draw(income);
        canv.draw(shop);
        canv.draw(buyType);
        canv.draw(menu);
        if (menu.showHelp()) {
            tutorial.tick(dt);
            canv.draw(tutorial);
        }
    },
    mousemove(x, y) {
        tutorial.checkHover(x, y);
        zoom.checkHover(x, y);
        buyType.checkHover(x, y);
        shop.checkHover(x, y);
        menu.checkHover(x, y);
    },
    mousedown(button) {
        tutorial.click(button);
        zoom.click(button);
        buyType.click(button);
        shop.click(button);
        menu.click(button);
    },
    focus(dt) {
        for (const orbit of orbits) {
            player.earn(income.getIncomePerRotation() * orbit.rotate(dt));
        }
    },
    blur() {
        canv.draw(paused);
    },
});

menu.setCallbacks(() => {
    canv.saveData({});
}, () => canv.mute(), () => canv.unmute(), () => canv.clearData());
