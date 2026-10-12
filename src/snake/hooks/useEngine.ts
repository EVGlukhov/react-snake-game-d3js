import { useCallback, useRef, useState } from "react";
import { SNAKE_SETTINGS } from "../settings";
import { Status } from "../constants";

export type Position = {
  x: number;
  y: number
};

export const Direction = {
  Up: 'up',
  Right: 'right',
  Down: 'down',
  Left: 'left'
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export type GameState = {
  snake: Position[];
  direction: Direction;
  food: Position | null;
  score: number;
  status: Status;
};

export const movement: Record<Direction, Position> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Right]: { x: 1, y: 0 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
};

export const opposite: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Right]: Direction.Left,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
};

function createFood(snake: Position[]): Position | null {
  const emptyCells: Position[] = []

  for (let y = 0; y < SNAKE_SETTINGS.rows; y++) {
    for (let x = 0; x < SNAKE_SETTINGS.columns; x++) {
      if(!snake.some((part: Position) => part.x === x && part.y === y)) {
        emptyCells.push({ x, y })
      }
    }
  }

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function createGame(): GameState {
  const x = Math.floor(SNAKE_SETTINGS.columns / 2);
  const y = Math.floor(SNAKE_SETTINGS.rows / 2);

  const snake = [{x, y}, {x: x - 1, y,}, {x: x - 2, y}];

  return {
    snake,
    direction: Direction.Right,
    food: createFood(snake),
    score: 0,
    status: Status.Playing
  }
}

function advanceGame(game: GameState): GameState {
  if (game.status !== Status.Playing) return game;

  const head = game.snake[0];

  const nextMove = movement[game.direction];
  
  const nextHead = {
    x: head.x + nextMove.x,
    y: head.y + nextMove.y
  };
  
  const ateFood = game.food !== null &&
    nextHead.x === game.food.x && nextHead.y === game.food.y;
  
  const nextBody = ateFood ? game.snake : game.snake.slice(0, -1);

  const hitSelf = nextBody.some(
    (part) => part.x === nextHead.x && part.y === nextHead.y
  )

  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= SNAKE_SETTINGS.columns ||
    nextHead.y < 0 ||
    nextHead.y >= SNAKE_SETTINGS.rows;

  if (hitSelf || hitWall) {
    return { ...game, status: 'gameOver' };
  }

  const snake = [ nextHead, ...nextBody];

  const food = ateFood ? createFood(snake) : game.food;

  return {
    ...game,
    snake,
    food,
    score: game.score + (ateFood ? 1 : 0),
    status: ateFood && food === null ? Status.Won : Status.Playing
  }
}

export function useEngine() {
  const [game, setGame] = useState(createGame())
  const gameRef = useRef(game);

  const advanceSnake = useCallback(() => {
    const nextGame = advanceGame(gameRef.current);
    gameRef.current = nextGame;
    setGame(nextGame);
  }, [])

  const setDirection = useCallback((direction: Direction) => {
    const currentGame = gameRef.current;

    if (currentGame.status !== Status.Playing || 
        direction === opposite[currentGame.direction]) {
      return
    }

    const nextGame = { ...currentGame, direction };
    gameRef.current = nextGame;
    setGame(nextGame);
  }, [])

  return { game, advanceSnake, setDirection };
}