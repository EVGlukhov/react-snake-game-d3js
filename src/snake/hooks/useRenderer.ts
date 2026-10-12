import { useEffect, useRef } from "react";
import { SNAKE_SETTINGS } from "../settings";
import type { Position } from "./useEngine";

type Theme = {
  backgroundColor: string;
  foodColor: string;
  snakeColor: string;
}

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

  const drawFrame = (snake: Position[], food: Position | null) => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || !themeRef.current) return;

    const {
      cellSize,
      cellMargin,
      gamePadding
    } = SNAKE_SETTINGS;

    const {
      backgroundColor,
      foodColor,
      snakeColor
    } = themeRef.current;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const drawCell = (position: Position, color: string) => {
      const x = gamePadding + position.x * (cellSize + cellMargin);
      const y = gamePadding + position.y * (cellSize + cellMargin);

      context.fillStyle = color;
      context.fillRect(x, y, cellSize, cellSize);
    }

    if (food)
      drawCell(food, foodColor);

    snake.forEach((segment) => drawCell(segment, snakeColor))
  };

  return { ref, drawFrame };
}