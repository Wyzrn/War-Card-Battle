War Card Game
Overview
War Card Game is a web-based implementation of the classic card game "War," built with HTML, CSS, and JavaScript. The game features a 3D user interface, a full-screen casino-style felt background, sound effects for button clicks and card plays, and a responsive design. Players compete against an AI, with special rules for Joker cards and a "War" scenario, ensuring an engaging and accessible experience.
Features

Game Mechanics:
Players and AI take turns playing one card from their deck.
Higher card wins both cards, added to the winner's deck.
Joker beats all cards except a 2; 2 beats Joker.
If cards are equal (except Joker vs. 2), a "War" occurs: 3 cards are placed face-down, then 1 face-up, and the higher face-up card wins all.
Game ends when one player has all cards.


UI/UX:
3D card effects with tilted cards (150px width, perspective(600px) rotateY).
Full-screen background with a semi-transparent gradient for readability.
Menu hiding when starting the game or viewing rules.
Sound effects for button clicks (Image/sounds/button-click.mp3) and card plays (Image/sounds/card-flip.mp3), with a toggle button (Sound: On/Off) in the bottom of the menu UI.


Accessibility:
WCAG 2.1 compliant: high contrast (>4.5:1), aria-label for buttons, no auto-playing sounds.
Responsive design for desktop and mobile (card sizes adjust to 120px/100px on smaller screens).


Assets:
Card images in Image/cards/ (e.g., 10_spades.png, joker.png).
Images/back.png and Images/empty.png for deck and empty slots.
Logo (Images/logo.png) with hover effects.



Project Structure
war-card-game/
├── index.html
├── css/
│   ├── menu.css
│   └── game.css
├── js/
│   ├── game.js
│   └── data.js
├── Image/
│   ├── logo.png
│   ├── back.png
│   ├── empty.png
│   ├── cards/
│   │   ├── 2_hearts.png
│   │   ├── 2_diamonds.png
│   │   ├── ...
│   │   ├── ace_spades.png
│   │   ├── joker.png
│   ├── sounds/
│   │   ├── button-click.mp3
│   │   ├── card-flip.mp3
├── README.md

Setup Instructions

Clone the Repository:git clone https://github.com/Wyzrn/war-card-battle.git
cd war-card-game


Serve the Game:
Open index.html in a web browser (e.g., Chrome, Firefox).
Alternatively, use a local server (e.g., VS Code Live Server or python3 -m http.server).


Verify Assets:
Ensure Image/ contains logo.png, back.png, empty.png, and cards/ with all 54 card images.
Ensure sounds/ contains button-click.mp3 and card-flip.mp3.


Test:
Confirm the menu hides when clicking "Start Game" or "Rules."
Verify sound toggle button in the game UI (bottom of the screen) switches between "Sound: On" and "Sound: Off."
Check card images load correctly and sound effects play when enabled.
Test on mobile for responsiveness.



How to Play

Start Menu:
Click "Start Game" to begin or "Rules" to view game instructions.
Toggle sound effects with the "Sound: On/Off" button.


Gameplay:
Click the player deck to play a card against the AI.
Watch for "War" events, with a 3-second delay for face-down cards.
The game ends when one player has all cards, displaying the winner and scores.


Restart:
Click "Restart Game" to return to the menu and start a new game.



Attributions

Card Images: Sourced from OpenGameArt (CC0 license).
Background Image: Sourced from Unsplash (Unsplash License).
Sound Effects: Sourced from Freesound (CC0 or CC-BY license).
Font: Poppins from Google Fonts.

Development Notes

Built with vanilla HTML, CSS, and JavaScript, no external frameworks.
Separate CSS files (menu.css, game.css) for menu and game views.
Sound toggle ensures accessibility by allowing users to disable sounds.
Tested on Chrome, Firefox, and mobile devices for compatibility.

Future Improvements

Add card flip animations for card plays.
Implement a coin system for unlocking card skins.
Add a victory sound for game end.
Support endless mode by reshuffling decks.
