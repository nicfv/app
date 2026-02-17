import { layers, mounts } from './game';
import { Mountain } from './mount';
import * as SMath from 'smath';

for (let i = 0; i < layers; i++) {
    mounts.push(new Mountain(SMath.normalize(i, layers - 1, 0)));
}
