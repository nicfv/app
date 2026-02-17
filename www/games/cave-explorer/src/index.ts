import { Canvas } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';
import { Collectibles, CompletionBar } from './collectible';
import { Minimap } from './minimap';
import { DrawText } from './text';

const map: GameMap = new GameMap({ x: 101, y: 101 });
const completionBar: CompletionBar = new CompletionBar({ x: 1, y: 1 }, { x: 48, y: 1 }, 'lime', 'horiz');
const collectibles: Collectibles = new Collectibles(map, completionBar);
const player: Player = new Player(map, collectibles);
const minimap: Minimap = new Minimap({ x: 40, y: 40 }, { x: 8, y: 8 }, map, player, collectibles);

let titleScreen = true;
const lg = 10;
const sm = 7;
const title: DrawText = new DrawText('  CAVE\nEXPLORER', { x: 1, y: 10 }, `bold ${lg}px monospace`, 'black', lg);
const line1: DrawText = new DrawText('EXPLORE\nRANDOM\n CAVES', { x: 10, y: 32 }, `bold ${sm}px monospace`, 'black', sm);
const line2: DrawText = new DrawText('COLLECT\n GREEN\n TILES', { x: 10, y: 32 }, `bold ${sm}px monospace`, 'black', sm);
const line3: DrawText = new DrawText('  USE  \nARROWS\nOR WASD', { x: 10, y: 32 }, `bold ${sm}px monospace`, 'black', sm);

const max_input_dt = 100;
let input_dt = 0;

const canv: Canvas = new Canvas({
    width: 50,
    height: 50,
    scale: 10,
    background: 'dimgray',
    border: 'black',
    borderBlur: 'gray',
    keepFocused: true,
    showMouse: false,
    keydown() {
        titleScreen = false;
    },
    loop(dt) {
        input_dt += dt;
        canv.clear();
        if (titleScreen) {
            canv.draw(title);
            if (input_dt % 6000 < 2000) {
                canv.draw(line1);
            } else if (input_dt % 6000 < 4000) {
                canv.draw(line2);
            } else {
                canv.draw(line3);
            }
            return;
        }
        if (input_dt > max_input_dt) {
            input_dt %= max_input_dt;
            if (canv.isKeyDown('arrowleft') || canv.isKeyDown('a')) {
                player.movePlayer('left');
            }
            if (canv.isKeyDown('arrowright') || canv.isKeyDown('d')) {
                player.movePlayer('right');
            }
            if (canv.isKeyDown('arrowup') || canv.isKeyDown('w')) {
                player.movePlayer('up');
            }
            if (canv.isKeyDown('arrowdown') || canv.isKeyDown('s')) {
                player.movePlayer('down');
            }
        }
        canv.draw(player);
        canv.draw(completionBar);
        canv.draw(minimap);
    },
});
