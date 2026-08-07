import { PlayerData } from '../game/player';
import { SolarData } from '../game/solar-system';

/**
 * Represents and interface for saving and loading game data
 */
export interface GameData {
    readonly timestamp: number;
    readonly playerData: PlayerData;
    readonly solarData: SolarData;
};
