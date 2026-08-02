import './close-info-handler';
import { Canvas } from 'graphico';
import { ascBtn, buyType, income, menu, paused, player, shop, system, tutorial, zoom } from './state';
import { GameData } from './gamedata';

const canv: Canvas = new Canvas({
    background: 'white',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    numLayers: 2,
    parent: document.getElementById('game') as HTMLElement,
    loop(dt) {
        canv.clear(1);
        system.step(dt);
        menu.autosave(dt);
        canv.draw(system, 0);
        canv.draw(player, 1);
        canv.draw(zoom, 1);
        canv.draw(income, 1);
        canv.draw(shop, 1);
        canv.draw(buyType, 1);
        canv.draw(ascBtn, 1);
        canv.draw(menu, 1);
        if (menu.showHelp()) {
            tutorial.tick(dt);
            canv.draw(tutorial, 1);
        }
    },
    mousemove(x, y) {
        tutorial.checkHover(x, y);
        zoom.checkHover(x, y);
        buyType.checkHover(x, y);
        shop.checkHover(x, y);
        ascBtn.checkHover(x, y);
        menu.checkHover(x, y);
    },
    mousedown(button) {
        tutorial.click(button);
        zoom.click(button);
        buyType.click(button);
        shop.click(button);
        ascBtn.click(button);
        menu.click(button);
    },
    focus(dt) {
        system.step(dt);
    },
    blur() {
        canv.draw(paused, 1);
    },
});

menu.setCallbacks(() => {
    canv.saveData<GameData>({
        timestamp: Date.now(),
        playerData: player.save(),
        solarData: system.save(),
    });
}, () => canv.mute(), () => canv.unmute(), () => canv.clearData());

const data: Partial<GameData> | undefined = canv.loadData<GameData>();
if (data) {
    // Load and parse saved data
    player.load(data.playerData);
    system.load(data.solarData);
    const dt: number = Date.now() - (data.timestamp ?? Date.now());
    system.step(dt);
    // Reset zoom and regenerate UI
    zoom.reset();
    income.regenerate();
    shop.regenerate();
} else {
    // Start with a clean system
    ascBtn.ascend();
}
