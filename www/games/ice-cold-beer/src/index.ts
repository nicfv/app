import { Canvas } from 'graphico';

const canv = new Canvas({
    background: 'sandybrown',
    border: 'black',
    borderBlur: 'white',
    showMouse: false,
    height: 600,
    width: 400,
    loop(dt) {
        // console.log(dt);
    },
});
