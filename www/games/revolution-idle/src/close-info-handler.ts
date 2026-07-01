const closeInfoButton: HTMLButtonElement = document.getElementById('close-info') as HTMLButtonElement;
const gameInfoDiv: HTMLDivElement = document.getElementById('game-info') as HTMLDivElement;
closeInfoButton.addEventListener('click', () => gameInfoDiv.parentElement!.removeChild(gameInfoDiv));
