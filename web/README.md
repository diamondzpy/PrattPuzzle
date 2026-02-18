# PrattPuzzle Frontend (React)

## Prerequisites

- Node.js 20+
- Built engine executable at `engine/build/pratt_eval`

Build the engine first:

```bash
cmake -S engine -B engine/build
cmake --build engine/build
```

## Run

```bash
cd web
npm install
npm run dev
```

- React app: `http://localhost:5173`
- API server: `http://localhost:3001`

## Screens

- Home
- How to play
- Puzzle selection with 30 puzzles per page and arrow page controls
- Puzzle gameplay with drag/drop precedence and solved modal

Solved puzzle state is stored in browser `localStorage`.
