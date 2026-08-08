import { FullAscendButton } from '../form-controls/button-full';
import { BuyType } from '../ui/buy-type';
import { Cursor } from '../ui/cursor';
import { Income } from '../game/income';
import { Menu } from '../ui/menu';
import { Pause } from '../ui/pause';
import { Player } from '../game/player';
import { Shop } from '../game/shop';
import { SolarSystem } from '../game/solar-system';
import { Statistics } from './stats';
import { Tutorial } from '../form-controls/tutorial';
import { Zoom } from '../ui/zoom';

// Global constants
export const version = 'v1.3.0-alpha';

// UI elements
export const cursor: Cursor = new Cursor();
export const player: Player = new Player();
export const zoom: Zoom = new Zoom(725, 150);
export const buyType: BuyType = new BuyType(725, 225);
export const ascBtn: FullAscendButton = new FullAscendButton(675, 275, 100, 50);
export const stats: Statistics = new Statistics();

// Game elements
export const system: SolarSystem = new SolarSystem();
export const income: Income = new Income();
export const shop: Shop = new Shop(10, 120);

// Additional popups
export const tutorial: Tutorial = new Tutorial();
export const menu: Menu = new Menu(725, 365, 100);
export const paused: Pause = new Pause('Orbit Idle has lost focus!\nThe game is NOT paused, but has\nstopped rendering to save resources.\nThe game is still running in the background.');
