function initializeGame() {
    gameData.gameState = "StartMenu";
    gameData.aiDeck = [];
    gameData.playerDeck = [];
    gameData.playerWarPile = [];
    gameData.aiWarPile = [];
    gameData.score = { player: 0, ai: 0 };
    gameData.winner = null;
    let soundsEnabled = true; 

    const styleSheet = document.getElementById("styles");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    const rulesButton = document.getElementById("rules-button");
    const soundToggle = document.getElementById("sound-toggle");
    const buttonClickSound = document.getElementById("button-click-sound");
    const cardFlipSound = document.getElementById("card-flip-sound");

    function toggleSound(buttonElement) {
        soundsEnabled = !soundsEnabled;
        buttonElement.textContent = `Sound: ${soundsEnabled ? "On" : "Off"}`;
        buttonElement.setAttribute("aria-label", `Toggle sound effects: ${soundsEnabled ? "On" : "Off"}`);
        return soundsEnabled;
    }

    
    function playSound(audioElement) {
        if (soundsEnabled && audioElement) {
            audioElement.currentTime = 0; 
            audioElement.play().catch(error => console.error("Sound play error:", error));
        }
    }

    soundToggle.addEventListener("click", () => {
        playSound(buttonClickSound);
        toggleSound(soundToggle);
    });

    startButton.addEventListener("click", () => {
        playSound(buttonClickSound);
        gameData.gameState = "Playing";
        styleSheet.href = "css/game.css";
        menu.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    rulesButton.addEventListener("click", () => {
        playSound(buttonClickSound);
        gameData.gameState = "Rules";
        styleSheet.href = "css/game.css";
        menu.style.display = "none";
        gameContainer.classList.remove("hidden");
        gameContainer.innerHTML = `
            <h2>Rules of War</h2>
            <p>Players take turns placing one card from their deck. The higher card wins both cards, which go to the winner's deck.</p>
            <p>A Joker beats all cards except a 2. If cards are equal (except Joker vs. 2s), a "War" occurs: each player places 3 cards face down and 1 face up. The higher face-up card wins all cards.</p>
            <p>The game ends when one player has all cards.</p>
            <button id="back-button">Back to Menu</button>
        `;
        document.getElementById("back-button").addEventListener("click", () => {
            playSound(buttonClickSound);
            gameData.gameState = "StartMenu";
            styleSheet.href = "css/menu.css";
            gameContainer.classList.add("hidden");
            menu.style.display = "flex";
            gameContainer.innerHTML = "";
        });
        document.getElementById("sound-toggle").addEventListener("click", () => {
            playSound(buttonClickSound);
            toggleSound(document.getElementById("sound-toggle"));
        });
    });

    function startGame() {
        createDeck();
        gameContainer.innerHTML = `
            <div id="ai-deck-area">
                <img src="Image/back.png" alt="AI Deck Card Back" class="deck-image">
                <div id="ai-deck" class="deck">AI Deck: ${gameData.aiDeck.length} cards</div>
            </div>
            <div id="ai-war-pile" class="war-pile hidden"></div>
            <div id="ai-card" class="card"><img src="Image/empty.png" alt="Empty card slot" class="deck-image"></div>
            <div id="player-card" class="card"><img src="Image/empty.png" alt="Empty card slot" class="deck-image"></div>
            <div id="player-war-pile" class="war-pile hidden"></div>
            <div id="player-deck-area">
                <div id="player-deck" class="deck">Player Deck: ${gameData.playerDeck.length} cards</div>
                <img src="Image/back.png" alt="Player Deck Card Back" class="deck-image">
            </div>
            <div id="game-status"></div>
            
        `;

        const aiDeckEl = document.getElementById("ai-deck");
        const playerDeckEl = document.getElementById("player-deck");
        const aiCardEl = document.getElementById("ai-card");
        const playerCardEl = document.getElementById("player-card");
        const aiWarPileEl = document.getElementById("ai-war-pile");
        const playerWarPileEl = document.getElementById("player-war-pile");
        const gameStatusEl = document.getElementById("game-status");
        const gameSoundToggle = document.getElementById("sound-toggle");

        gameSoundToggle.addEventListener("click", () => {
            playSound(buttonClickSound);
            soundsEnabled = toggleSound(gameSoundToggle); // Update shared soundsEnabled
        });

        function updateDeckDisplay() {
            aiDeckEl.textContent = `AI Deck: ${gameData.aiDeck.length} cards`;
            playerDeckEl.textContent = `Player Deck: ${gameData.playerDeck.length} cards`;
            aiWarPileEl.innerHTML = gameData.aiWarPile.length ? `<img src="Image/back.png" alt="Face-down card" class="deck-image">` : "";
            playerWarPileEl.innerHTML = gameData.playerWarPile.length ? `<img src="Image/back.png" alt="Face-down card" class="deck-image">` : "";
            aiWarPileEl.classList.toggle("hidden", !gameData.aiWarPile.length);
            playerWarPileEl.classList.toggle("hidden", !gameData.playerWarPile.length);
        }

        function compareCards(playerCard, aiCard) {
            if (playerCard.name === "Joker" && aiCard.name !== "2") return true;
            if (aiCard.name === "Joker" && playerCard.name !== "2") return false;
            if (playerCard.name === "2" && aiCard.name === "Joker") return true;
            if (aiCard.name === "2" && playerCard.name === "Joker") return false;
            return playerCard.value > aiCard.value;
        }

        function playRound() {
            if (gameData.winner) return;

            const playerCard = gameData.playerDeck.shift();
            const aiCard = gameData.aiDeck.shift();

            if (!playerCard || !aiCard) {
                playerCardEl.innerHTML = `<img src="Image/empty.png" alt="Empty card slot" class="deck-image">`;
                aiCardEl.innerHTML = `<img src="Image/empty.png" alt="Empty card slot" class="deck-image">`;
                endGame();
                return;
            }

            playSound(cardFlipSound);
            const playerCardPath = `Image/cards/${playerCard.name.toLowerCase()}${playerCard.suit ? "_" + playerCard.suit.toLowerCase() : ""}.png`;
            const aiCardPath = `Image/cards/${aiCard.name.toLowerCase()}${aiCard.suit ? "_" + aiCard.suit.toLowerCase() : ""}.png`;
            playerCardEl.innerHTML = `<img src="${playerCardPath}" alt="${playerCard.name}${playerCard.suit ? " of " + playerCard.suit : ""}" class="deck-image" onerror="this.outerHTML='<span>${playerCard.name}${playerCard.suit ? " of " + playerCard.suit : ""}</span>'">`;
            aiCardEl.innerHTML = `<img src="${aiCardPath}" alt="${aiCard.name}${aiCard.suit ? " of " + aiCard.suit : ""}" class="deck-image" onerror="this.outerHTML='<span>${aiCard.name}${aiCard.suit ? " of " + aiCard.suit : ""}</span>'">`;

            gameData.playerWarPile.push(playerCard);
            gameData.aiWarPile.push(aiCard);
            updateDeckDisplay();

            if (compareCards(playerCard, aiCard)) {
                gameData.playerDeck.push(...gameData.playerWarPile, ...gameData.aiWarPile);
                gameData.score.player += gameData.playerWarPile.length + gameData.aiWarPile.length;
                gameData.playerWarPile = [];
                gameData.aiWarPile = [];
                gameStatusEl.textContent = "Player wins the round!";
            } else if (compareCards(aiCard, playerCard)) {
                gameData.aiDeck.push(...gameData.aiWarPile, ...gameData.playerWarPile);
                gameData.score.ai += gameData.playerWarPile.length + gameData.aiWarPile.length;
                gameData.playerWarPile = [];
                gameData.aiWarPile = [];
                gameStatusEl.textContent = "AI wins the round!";
            } else {
                gameStatusEl.textContent = "War!";
                initiateWar();
                return;
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
            setTimeout(() => {
                if (!gameData.winner) playRound();
            }, 3000);
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
                <button id="sound-toggle" aria-label="Toggle sound effects">Sound: ${soundsEnabled ? "On" : "Off"}</button>
            `;
            document.getElementById("restart-button").addEventListener("click", () => {
                playSound(buttonClickSound);
                gameData.gameState = "StartMenu";
                document.getElementById("styles").href = "css/menu.css";
                gameContainer.classList.add("hidden");
                menu.style.display = "flex";
                gameContainer.innerHTML = "";
                initializeGame();
            });
            document.getElementById("sound-toggle").addEventListener("click", () => {
                playSound(buttonClickSound);
                toggleSound(document.getElementById("sound-toggle"));
            });
        }

        playerDeckEl.addEventListener("click", playRound);
    }
}

document.addEventListener("DOMContentLoaded", initializeGame);