export type SnakeSettings = {
    rows: number;
    columns: number;
    cellSize: number;
    cellMargin: number;
    gamePadding: number;
};

export const SNAKE_SETTINGS = {
    rows: 15,
    columns: 20,
    cellSize: 20,
    cellMargin: 2,
    gamePadding: 10,
} as const satisfies SnakeSettings;