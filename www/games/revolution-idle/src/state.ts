import { BuyType } from './buy-type';
import { Income } from './income';
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