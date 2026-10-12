export type SnakeSettings = {
  rows: number;
  columns: number;
  cellSize: number;
  cellMargin: number;
  gamePadding: number;
  cooldown: number;
};

export const SNAKE_SETTINGS = {
  rows: 20,
  columns: 20,
  cellSize: 16,
  cellMargin: 2,
  gamePadding: 10,
  cooldown: 400,
} as const satisfies SnakeSettings;