import { BuyType } from './buy-type';
import { NUM_WHEELS } from './globals';
import { Income } from './income';
import { Player } from './player';
import { Store } from './store';
import { Wheel } from './wheel';
import { Zoom } from './zoom';

export const player: Player = new Player(1);
export const zoom: Zoom = new Zoom(700, 150);
export const buyType: BuyType = new BuyType(690, 250);

export const wheels: Wheel[] = [];
for (let i = 0; i < NUM_WHEELS; i++) {
    wheels.push(new Wheel(i));
}

export const income: Income = new Income();
export const store: Store = new Store(10, 120);