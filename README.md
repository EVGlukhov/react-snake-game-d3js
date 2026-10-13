# Snake

A classic Snake game built with React, TypeScript, and HTML Canvas. Use the
arrow keys to guide the snake, collect food, and grow without hitting the
walls or your own tail.

## Features

- Keyboard controls for moving the snake, pausing, and restarting
- Score tracking and win/game-over states
- Canvas rendering with D3 scales
- Game state shared through React Context
- Automatic game saving in your browser's `localStorage`

## Play

| Key | Action |
| --- | --- |
| Arrow keys | Change the snake's direction |
| Escape | Pause or resume |
| Enter | Restart the game |

You can also use the **Restart** button when the game is paused, won, or over.

The game runs at a fixed board size and movement speed. A saved game is restored
when you reopen or refresh the app in the same browser.

## Run locally

### Requirements

- Node.js
- npm

### Setup

```bash
git clone https://github.com/EVGlukhov/react-snake-game-d3js.git
cd react-snake-game-d3js
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run deploy` | Build and publish `dist/` with `gh-pages` |

## Built with

- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [D3](https://d3js.org/) for canvas grid scales
- [Tailwind CSS](https://tailwindcss.com/)

## Project structure

```text
src/
├── App.tsx
└── snake/    
    ├── Snake.tsx
    ├── components/
    |-- context/
    ├── hooks/
    ├── constants.ts
    └── settings.ts
```

Game board dimensions, cell sizing, and movement timing are configured in
`src/snake/settings.ts`.
