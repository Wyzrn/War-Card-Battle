function initializeGame() {
    gameData.gameState = "StartMenu";
    gameData.aiDeck = [];
    gameData.playerDeck = [];
    gameData.playerWarPile = [];
    gameData.aiWarPile = [];
    gameData.score = { player: 0, ai: 0 };
    gameData.winner = null;

    const startButton = document.getElementById("start-button");
    const rulesButton = document.getElementById("rules-button");
    const gameContainer = document.getElementById("game-container");
    const menu = document.getElementById("menu");

    startButton.addEventListener("click", () => {
        gameData.gameState = "Playing";
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        // game start logic
    });

    rulesButton.addEventListener("click", () => {
        gameData.gameState = "Rules";
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        gameContainer.innerHTML = `
            <h2>Rules of War</h2>
            <p>Players take turns placing one card from their deck. The higher card wins both cards, which go to the winner's deck.</p>
            <p>If cards are equal, a "War" occurs: each player places 3 cards face down and 1 face up. The higher face-up card wins all cards.</p>
            <p>2 beats a Joker. The game ends when one player has all cards.</p>
            <button id="back-button">Back to Menu</button>
        `;
        document.getElementById("back-button").addEventListener("click", () => {
            gameData.gameState = "StartMenu";
            gameContainer.classList.add("hidden");
            menu.classList.remove("hidden");
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeGame);