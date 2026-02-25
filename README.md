# PrattPuzzle

PrattPuzzle is a puzzle game where you solve arithmetic expressions by changing operator precedence.

## Live demo

https://prattpuzzle.onrender.com/

## Overview

- Math expressions are usually evaluated by order of "PEMDAS" or "BEDMAS"
- In PrattPuzzle, you control the order of evaluation
- Drag operators (`+`, `-`, `*`, `/`) to set custom precedence
- Instant result updates as you reorder operators
- A variety of puzzles with unique targets

## Gameplay

1. Open the game and click `Start`
2. Choose a puzzle from the list
3. Drag operator chips to reorder precedence
4. Pay to attention to `Current`, indicating your current result
5. Match the `Target` to solve

## Screenshots

```md
![Home](<screenshots/home.png>)
![Puzzle Select](<screenshots/puzzle_select.png>)
![Puzzle Screen](<screenshots/puzzle.png>)
```

## Install

Prerequisites:
- Node.js 20+
- npm
- CMake 3.16+
- C++17 compiler

From repository root:

```bash
cmake -S engine -B engine/build
cmake --build engine/build
cd web
npm install
npm run dev
```

Open `http://localhost:5173`.

## Tech Stack

- React + TypeScript + Vite
- Express API (Node.js)
- C++ Pratt parser/evaluator engine
- `@dnd-kit` drag-and-drop

## Project Structure

```text
engine/        C++ parsing/evaluation engine
web/src/       React frontend
web/server/    API server + puzzle data
```
