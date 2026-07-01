const closeInfo: HTMLElement = document.getElementById('close-info') as HTMLElement;
const gameInfo: HTMLElement = document.getElementById('game-info') as HTMLElement;
closeInfo.addEventListener('click', () => gameInfo.parentElement?.removeChild(gameInfo));
