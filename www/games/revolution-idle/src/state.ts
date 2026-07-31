import { BuyType } from './buy-type';
import { Help } from './help';
import { Income } from './income';
import { Menu } from './menu';
import { Pause } from './pause';
import { Player } from './player';
import { Shop } from './shop';
import { Wheel } from './wheel';
import { Zoom } from './zoom';

export const player: Player = new Player(1, 10);
export const zoom: Zoom = new Zoom(700, 175);
export const buyType: BuyType = new BuyType(685, 250);

export const wheels: Wheel[] = [];
for (let i = 0; i < player.getNumWheels(); i++) {
    wheels.push(new Wheel(i));
}

export const income: Income = new Income();
export const shop: Shop = new Shop(10, 120);

export const menu: Menu = new Menu(725, 400, 100);
export const paused: Pause = new Pause('Revolution Idle 4 has lost focus!\nThe game is NOT paused, but has\nstopped rendering to save resources.\nThe game is still running in the background.');
export const help: Help[] = [
    new Help('This is your in-game money\n(click to continue)', 50, 550, 700, 45),
];
