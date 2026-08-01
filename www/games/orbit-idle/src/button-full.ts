import { Color } from 'viridis';
import { Button } from './button';

export class FullAscendButton extends Button {
    constructor() {
        super('', new Color(200, 200, 200), false, 0, 0, 0, 0, () => { return });
    }
}
