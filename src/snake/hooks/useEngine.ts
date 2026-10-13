import { useCallback, useRef, useState } from "react";
import { SNAKE_SETTINGS } from "../settings";
import {
  Direction,
  movement,
  opposite,
  Status,
  type Position,
} from "../constants";

export type GameState = {
  snake: Position[];
  direction: Direction;
  food: Position | null;
  score: number;
  status: Status;
};

export function useEngine(initialGame: () => GameState = createGame) {
  const [game, setGame] = useState(initialGame);
  const gameRef = useRef(game);

  const advanceSnake = useCallback(() => {
    const currentGame = gameRef.current;
    if (!currentGame) return;

    const nextGame = advanceGame(gameRef.current);
    gameRef.current = nextGame;
    setGame(nextGame);
  }, []);

  const restartGame = useCallback(() => {
    const nextGame = createGame();
    gameRef.current = nextGame;
    setGame(nextGame);
  }, []);

  const pauseGame = useCallback(() => {
    const currentGame = gameRef.current;
    if (
      currentGame.status !== Status.Playing &&
      currentGame.status !== Status.Paused
    ) {
      return;
    }

    const nextGame = {
      ...currentGame,
      status:
        currentGame.status === Status.Playing ? Status.Paused : Status.Playing,
    };
    gameRef.current = nextGame;
    setGame(nextGame);
  }, []);

  const setDirection = useCallback((direction: Direction) => {
    const currentGame = gameRef.current;
    if (!currentGame) return;

    if (
      currentGame.status !== Status.Playing ||
      direction === opposite[currentGame.direction]
    ) {
      return;
    }

    const nextGame = { ...currentGame, direction };
    gameRef.current = nextGame;
    setGame(nextGame);
  }, []);

  return { game, advanceSnake, setDirection, restartGame, pauseGame };
}

function createFood(snake: Position[]): Position | null {
  const occupiedCells = new Set(
    snake.map(({ x, y }) => y * SNAKE_SETTINGS.columns + x),
  );

  const emptyCells = Array.from(
    { length: SNAKE_SETTINGS.rows * SNAKE_SETTINGS.columns },
    (_, index) => index,
  ).reduce<Position[]>((available, index) => {
    if (!occupiedCells.has(index)) {
      available.push({
        x: index % SNAKE_SETTINGS.columns,
        y: Math.floor(index / SNAKE_SETTINGS.columns),
      });
    }

    return available;
  }, []);

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export function createGame(): GameState {
  const x = Math.floor(SNAKE_SETTINGS.columns / 2);
  const y = Math.floor(SNAKE_SETTINGS.rows / 2);

  const snake = [
    { x, y },
    { x: x - 1, y },
    { x: x - 2, y },
  ];

  return {
    snake,
    direction: Direction.Right,
    food: createFood(snake),
    score: 0,
    status: Status.Playing,
  };
}

function advanceGame(game: GameState): GameState {
  if (game.status !== Status.Playing) return game;

  const head = game.snake[0];

  const nextMove = movement[game.direction];

  const nextHead = {
    x: head.x + nextMove.x,
    y: head.y + nextMove.y,
  };

  const ateFood =
    game.food !== null &&
    nextHead.x === game.food.x &&
    nextHead.y === game.food.y;

  const nextBody = ateFood ? game.snake : game.snake.slice(0, -1);

  const hitSelf = nextBody.some(
    (part) => part.x === nextHead.x && part.y === nextHead.y,
  );

  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= SNAKE_SETTINGS.columns ||
    nextHead.y < 0 ||
    nextHead.y >= SNAKE_SETTINGS.rows;

  if (hitSelf || hitWall) {
    return { ...game, status: Status.GameOver };
  }

  const snake = [nextHead, ...nextBody];

  const food = ateFood ? createFood(snake) : game.food;

  return {
    ...game,
    snake,
    food,
    score: game.score + (ateFood ? 1 : 0),
    status: ateFood && food === null ? Status.Won : Status.Playing,
  };
}
