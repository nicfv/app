import { PlayerData } from "./player";
import { SolarData } from "./solar-system";

/**
 * Represents and interface for saving and loading game data
 */
export interface GameData {
    readonly timestamp: number;
    readonly playerData: PlayerData;
    readonly solarData: SolarData;
};
