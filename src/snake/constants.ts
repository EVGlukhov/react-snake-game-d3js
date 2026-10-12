export type Position = {
  x: number;
  y: number;
};

export const Status = {
  Playing: "playing",
  GameOver: "gameOver",
  Won: "won",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Direction = {
  Up: "up",
  Right: "right",
  Down: "down",
  Left: "left",
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

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
