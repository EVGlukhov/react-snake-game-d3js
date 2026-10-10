import type { Direction } from "./constants";

export type Cell = {
    x: number,
    y: number,
    snake: boolean;
    food: boolean;
    danger: boolean;
}

export type Direction = typeof Direction[keyof typeof Direction];