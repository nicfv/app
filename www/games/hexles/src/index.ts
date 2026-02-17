import { Canvas } from 'graphico';
import { Hexles } from './Game';

const CANV: Canvas = new Canvas({
    width: 600,
    height: 400,
    background: 'cornflowerblue',
    showMouse: false,
    keepFocused: true,
    keydown(key) { onkeydown(key) },
    loop(dt) { tick(dt) },
});

const tick = (dt: number) => {
    CANV.clear();
    Hexles.advance(dt);
    CANV.draw(Hexles.handle());
};

const onkeydown = (key: string) => {
    switch (key.toLowerCase()) {
        case ('arrowup'):
        case ('w'): {
            Hexles.receiveInput('up');
            break;
        }
        case ('arrowdown'):
        case ('s'): {
            Hexles.receiveInput('down');
            break;
        }
        case ('arrowleft'):
        case ('a'): {
            Hexles.receiveInput('CCW');
            break;
        }
        case ('arrowright'):
        case ('d'): {
            Hexles.receiveInput('CW');
            break;
        }
        case ('enter'):
        case (' '): {
            Hexles.receiveInput('select');
            break;
        }
        case ('backspace'):
        case ('escape'): {
            Hexles.receiveInput('back');
            break;
        }
    }
};
