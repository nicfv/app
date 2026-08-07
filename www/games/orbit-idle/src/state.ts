import { FullAscendButton } from './button-full';
import { BuyType } from './buy-type';
import { Cursor } from './cursor';
import { Income } from './income';
import { Menu } from './menu';
import { Pause } from './pause';
import { Player } from './player';
import { Shop } from './shop';
import { SolarSystem } from './solar-system';
import { Statistics } from './stats';
import { Tutorial } from './tutorial';
import { Zoom } from './zoom';

// Global constants
export const version = 'v1.2.1-alpha';

// UI elements
export const cursor: Cursor = new Cursor();
export const player: Player = new Player();
export const zoom: Zoom = new Zoom(725, 175);
export const buyType: BuyType = new BuyType(725, 250);
export const ascBtn: FullAscendButton = new FullAscendButton(675, 300, 100, 50);
export const stats: Statistics = new Statistics();

// Game elements
export const system: SolarSystem = new SolarSystem();
export const income: Income = new Income();
export const shop: Shop = new Shop(10, 120);

// Additional popups
export const tutorial: Tutorial = new Tutorial();
export const menu: Menu = new Menu(725, 400, 100);
export const paused: Pause = new Pause('Orbit Idle has lost focus!\nThe game is NOT paused, but has\nstopped rendering to save resources.\nThe game is still running in the background.');
