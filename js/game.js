function initializeGame() {
    gameData.gameState = "StartMenu";
    gameData.aiDeck = [];
    gameData.playerDeck = [];
    gameData.playerWarPile = [];
    gameData.aiWarPile = [];
    gameData.score = { player: 0, ai: 0 };
    gameData.winner = null;

    const styleSheet = document.getElementById("styles");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    const rulesButton = document.getElementById("rules-button");

    startButton.addEventListener("click", () => {
        gameData.gameState = "Playing";
        styleSheet.href = "css/game.css";
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        startGame();
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
            styleSheet.href = "css/menu.css";
            gameContainer.classList.add("hidden");
            menu.classList.remove("hidden");
            gameContainer.innerHTML = "";
        });
    });
}

function startGame() {
    createDeck();
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = `
        <div id="ai-deck" class="deck">AI Deck: ${gameData.aiDeck.length} cards</div>
        <div id="ai-war-pile" class="war-pile hidden"></div>
        <div id="ai-card" class="card"></div>
        <div id="player-card" class="card"></div>
        <div id="player-war-pile" class="war-pile hidden"></div>
        <div id="player-deck" class="deck">Player Deck: ${gameData.playerDeck.length} cards</div>
        <div id="game-status"></div>
    `;

    const aiDeckEl = document.getElementById("ai-deck");
    const playerDeckEl = document.getElementById("player-deck");
    const aiCardEl = document.getElementById("ai-card");
    const playerCardEl = document.getElementById("player-card");
    const aiWarPileEl = document.getElementById("ai-war-pile");
    const playerWarPileEl = document.getElementById("player-war-pile");
    const gameStatusEl = document.getElementById("game-status");

    function updateDeckDisplay() {
        aiDeckEl.textContent = `AI Deck: ${gameData.aiDeck.length} cards`;
        playerDeckEl.textContent = `Player Deck: ${gameData.playerDeck.length} cards`;
        aiWarPileEl.textContent = gameData.aiWarPile.length ? `AI War Pile: ${gameData.aiWarPile.length} cards` : "";
        playerWarPileEl.textContent = gameData.playerWarPile.length ? `Player War Pile: ${gameData.playerWarPile.length} cards` : "";
        aiWarPileEl.classList.toggle("hidden", !gameData.aiWarPile.length);
        playerWarPileEl.classList.toggle("hidden", !gameData.playerWarPile.length);
    }

    function playRound() {
        if (gameData.winner) return;

        const playerCard = gameData.playerDeck.shift();
        const aiCard = gameData.aiDeck.shift();

        if (!playerCard || !aiCard) {
            endGame();
            return;
        }

        playerCardEl.textContent = `${playerCard.name}${playerCard.suit ? " of " + playerCard.suit : ""}`;
        aiCardEl.textContent = `${aiCard.name}${aiCard.suit ? " of " + aiCard.suit : ""}`;

        gameData.playerWarPile.push(playerCard);
        gameData.aiWarPile.push(aiCard);
        updateDeckDisplay();

        if (playerCard.value > aiCard.value) {
            gameData.playerDeck.push(...gameData.playerWarPile, ...gameData.aiWarPile);
            gameData.score.player += gameData.playerWarPile.length + gameData.aiWarPile.length;
            gameData.playerWarPile = [];
            gameData.aiWarPile = [];
            gameStatusEl.textContent = "Player wins the round!";
        } else if (aiCard.value > playerCard.value) {
            gameData.aiDeck.push(...gameData.aiWarPile, ...gameData.playerWarPile);
            gameData.score.ai += gameData.playerWarPile.length + gameData.aiWarPile.length;
            gameData.playerWarPile = [];
            gameData.aiWarPile = [];
            gameStatusEl.textContent = "AI wins the round!";
        } else {
            gameStatusEl.textContent = "War!";
            initiateWar();
        }

        updateDeckDisplay();
        checkGameEnd();
    }

    function initiateWar() {
        if (gameData.playerDeck.length < 4 || gameData.aiDeck.length < 4) {
            endGame();
            return;
        }

        for (let i = 0; i < 3; i++) {
            const playerCard = gameData.playerDeck.shift();
            const aiCard = gameData.aiDeck.shift();
            if (playerCard) gameData.playerWarPile.push(playerCard);
            if (aiCard) gameData.aiWarPile.push(aiCard);
        }

        updateDeckDisplay();
        setTimeout(playRound, 1000);
    }

    function checkGameEnd() {
        if (gameData.playerDeck.length === 0 || gameData.aiDeck.length === 0) {
            endGame();
        }
    }

    function endGame() {
        gameData.winner = gameData.playerDeck.length > 0 ? "Player" : "AI";
        gameContainer.innerHTML = `
            <h2>${gameData.winner} Wins!</h2>
            <p>Player Score: ${gameData.score.player}, AI Score: ${gameData.score.ai}</p>
            <button id="restart-button">Restart Game</button>
        `;
        document.getElementById("restart-button").addEventListener("click", () => {
            gameData.gameState = "StartMenu";
            styleSheet.href = "css/menu.css";
            gameContainer.classList.add("hidden");
            menu.classList.remove("hidden");
            initializeGame();
        });
    }

    playerDeckEl.addEventListener("click", playRound);
}

document.addEventListener("DOMContentLoaded", initializeGame);