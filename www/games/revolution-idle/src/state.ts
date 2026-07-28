import { BuyType } from './buy-type';
import { Income } from './income';
import { Player } from './player';
import { Shop } from './shop';
import { Wheel } from './wheel';
import { Zoom } from './zoom';

export const player: Player = new Player(1e14, 10, Date.now());
export const zoom: Zoom = new Zoom(700, 150);
export const buyType: BuyType = new BuyType(690, 250);

export const wheels: Wheel[] = [];
for (let i = 0; i < player.getNumWheels(); i++) {
    wheels.push(new Wheel(i));
}

export const income: Income = new Income();
export const shop: Shop = new Shop(10, 120);