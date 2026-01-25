import { Game } from './game';

function main(): void {
    new Game(document.body);
}

window.addEventListener('load', main);