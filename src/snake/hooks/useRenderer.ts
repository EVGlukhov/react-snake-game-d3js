import { range, scaleBand } from "d3";
import { useCallback, useEffect, useRef } from "react";
import { SNAKE_SETTINGS } from "../settings";
import type { Position } from "./useEngine";

type Theme = {
  backgroundColor: string;
  foodColor: string;
  snakeColor: string;
}

const {
  rows,
  columns,
  cellSize,
  cellMargin,
  gamePadding
} = SNAKE_SETTINGS;
const cellGap = cellMargin / (cellSize + cellMargin)

const xScale = scaleBand<number>()
  .domain(range(columns))
  .range([
    gamePadding,
    gamePadding + columns * cellSize + (columns - 1) * cellMargin
  ])
  .paddingInner(cellGap);

const yScale = scaleBand<number>()
  .domain(range(rows))
  .range([
    gamePadding,
    gamePadding + rows * cellSize + (rows - 1) * cellMargin
  ])
  .paddingInner(cellGap)

export function useRenderer() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<Theme | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.width =
      SNAKE_SETTINGS.cellSize * SNAKE_SETTINGS.columns +
      (SNAKE_SETTINGS.columns - 1) * SNAKE_SETTINGS.cellMargin +
      2 * SNAKE_SETTINGS.gamePadding;

    ref.current.height =
      SNAKE_SETTINGS.cellSize * SNAKE_SETTINGS.rows +
      (SNAKE_SETTINGS.rows - 1) * SNAKE_SETTINGS.cellMargin +
      2 * SNAKE_SETTINGS.gamePadding;

    const getColor = (prop: string) => 
      getComputedStyle(document.documentElement)
        .getPropertyValue(prop)
        .trim();

    themeRef.current = {
      backgroundColor: getColor("--background-color"),
      foodColor: getColor("--food-color"),
      snakeColor: getColor("--snake-color"),
    }
  }, [])

  const drawFrame = useCallback((snake: Position[], food: Position | null) => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || !themeRef.current) return;

    const {
      backgroundColor,
      foodColor,
      snakeColor
    } = themeRef.current;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const drawCell = (position: Position, color: string) => {
      const x = xScale(position.x);
      const y = yScale(position.y);

      if (x === undefined || 
          y === undefined) return;

      context.fillStyle = color;
      context.fillRect(x, y, xScale.bandwidth(), yScale.bandwidth());
    }

    if (food)
      drawCell(food, foodColor);

    snake.forEach((segment) => drawCell(segment, snakeColor))
  }, [ref.current, themeRef.current]);

  return { ref, drawFrame };
}