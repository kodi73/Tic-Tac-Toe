# Tic Tac Toe — Unbeatable AI (Minimax)

A browser-based **Tic Tac Toe** game built using **HTML, CSS, and JavaScript**, featuring an **unbeatable single-player AI** powered by the **Minimax algorithm** and styled with a **dark arcade / neon aesthetic**.

This project follows the principles taught in **The Odin Project**, with an emphasis on:
- minimal global state
- modular design
- separation of concerns
- algorithmic correctness over heuristics

---

## 🎯 Features

- Single-player Tic Tac Toe (Human vs Computer)
- **Unbeatable AI** using depth-aware Minimax
- Dark arcade UI with neon visuals
  - **X** → Neon Yellow
  - **O** → Neon Orange
- Responsive, interactive grid
- Clean restart functionality
- No external libraries or frameworks

---

## 🧠 AI Logic (Minimax)

The AI uses the **Minimax algorithm** with the following properties:

- **Maximizing player:** Computer (`O`)
- **Minimizing player:** Human (`X`)
- Full game-tree exploration (no randomness)
- Depth-aware scoring:
  - Faster wins are preferred
  - Slower losses are preferred
- Guarantees:
  - AI never loses
  - Best possible outcome is always chosen

This makes the game **mathematically unbeatable**.  
At best, the human player can force a draw.

---

## 🗂️ Project Structure

.
├── index.html
├── styles/
│ └── style.css
└── scripts/
└── script.js


---

## 🧩 Architecture Overview

The JavaScript logic is organized into modules and factories:

### `Gameboard` (Module)
- Maintains board state
- Prevents illegal moves
- Handles board reset

### `Player` (Factory)
- Represents a player (name + mark)
- Used for both human and AI

### `GameController` (Module)
- Controls game flow
- Switches turns
- Detects win / tie conditions
- Invokes AI moves when required

### AI Helpers
- `evaluateBoard`
- `getAvailableMoves`
- `minimax`
- `getBestMove`

These functions are **pure** and operate on board copies.

### `DisplayController` (Module)
- Handles all DOM updates
- Renders board state
- Displays game status
- Handles user interactions

---

## 🎮 How to Play

1. Open `index.html` in a browser
2. You play as **X**
3. Click any empty square to make a move
4. The AI (`O`) responds immediately
5. Game ends when:
   - A player wins, or
   - The board is full (tie)
6. Use the **Restart** button to reset the game

---

## 🎨 Visual Theme

- Navy blue gradient background
- Black arcade-style gameboard
- Dark pixel-like tiles
- Neon glow text for player marks
- Subtle hover feedback for interaction

The design is intentionally minimal and focused on readability.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

No frameworks. No dependencies.

---

## 📚 Concepts Applied

- Module Pattern (IIFE)
- Factory Functions
- Immutable state for AI simulation
- Recursion
- Game tree search
- Zero-sum game theory
- Separation of concerns

---

## 🚀 Possible Extensions

- Difficulty levels (limit Minimax depth)
- Alpha–beta pruning for performance
- Multiplayer mode
- Sound effects
- Retro pixel fonts or CRT scanlines
- Mobile responsiveness

---

## 📝 Notes

This project prioritizes **correctness and clarity** over premature optimization.  
The Minimax implementation is intentionally explicit to aid understanding.

---

## 📄 License

This project is for educational purposes.