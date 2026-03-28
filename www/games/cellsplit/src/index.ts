import { Canvas } from 'graphico';

const canv = new Canvas({
    background: 'lightgray',
    border: 'black',
    borderBlur: 'gray',
    width: 800,
    height: 600,
    loop(dt) {
        if (canv.isMouseButtonDown(dt)) {
            console.log('Life is meaningless.');
        }
    },
});