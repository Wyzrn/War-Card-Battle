const gameData = {
    gameState: "StartMenu",
    deckSize: 54,
    cardSuits: ["Hearts", "Diamonds", "Clubs", "Spades"],
    cardValues: [
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "4", value: 4 },
        { name: "5", value: 5 },
        { name: "6", value: 6 },
        { name: "7", value: 7 },
        { name: "8", value: 8 },
        { name: "9", value: 9 },
        { name: "10", value: 10 },
        { name: "Jack", value: 11 },
        { name: "Queen", value: 12 },
        { name: "King", value: 13 },
        { name: "Ace", value: 14 },
        { name: "Joker", value: 15 } 
    ],
    aiDeck: [],
    playerDeck: [],
    playerWarPile: [],
    aiWarPile: [],
    score: { player: 0, ai: 0 },
    winner: null
};

function createDeck() {
    const deck = [];
    gameData.cardSuits.forEach(suit => {
        gameData.cardValues.slice(0, -1).forEach(card => {
            deck.push({ suit, name: card.name, value: card.value });
        });
    });
    deck.push({ suit: null, name: "Joker", value: 15 });
    deck.push({ suit: null, name: "Joker", value: 15 });

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    gameData.playerDeck = deck.slice(0, 27);
    gameData.aiDeck = deck.slice(27);
}