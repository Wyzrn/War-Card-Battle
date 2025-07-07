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
        { name: "Joker", value: 1 }
    ],
    aiDeck: [],
    playerDeck: [],
    playerWarPile: [],
    aiWarPile: [],
    score: { player: 0, ai: 0 },
    winner: null
};