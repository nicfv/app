import { Canvas } from 'graphico';
import { Star } from './Star';

// const G = 9.81; // [m/s^2]
// const px_per_m = 100;

// class Player implements Drawable {
//     private y = 0;
//     private dy = 0;
//     constructor(private readonly color: string, private readonly width: number, private readonly height: number) { }
//     public draw(graphics: CanvasRenderingContext2D): void {
//         graphics.fillStyle = this.color;
//         graphics.fillRect((game.width - this.width) / 2, this.y, this.width, this.height);
//     }
//     public step(dt: number): void {
//         this.dy += G * px_per_m * dt / 1000;
//         this.y += this.dy * dt / 1000;
//         if (this.y + this.height >= game.height) {
//             this.y = game.height - this.height;
//             this.dy = 0;
//         }
//     }
//     public jump(force: number): void {
//         if (this.dy === 0) {
//             this.dy = -force;
//         }
//     }
// }

// const me: Player = new Player('red', 50, 50);

export const game: Canvas = new Canvas({
    background: 'black',
    border: 'black',
    borderBlur: 'gray',
    width: 1280,
    height: 720,
    loop(dt) {
        game.clear();
        const left: boolean = game.isKeyDown('arrowleft');
        const right: boolean = game.isKeyDown('arrowright');
        const up: boolean = game.isKeyDown('arrowup');
        const down: boolean = game.isKeyDown('arrowdown');
        for (const star of stars) {
            star.move((left ? -1 : 0) + (right ? 1 : 0), (up ? -1 : 0) + (down ? 1 : 0), dt);
            game.draw(star);
        }
    },
});

const stars: Star[] = [];
for (let i = 0; i < 1000; i++) {
    stars.push(Star.rand());
}
