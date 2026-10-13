import { createContext, useContext, useEffect, type ReactNode } from "react";
import { Direction, Status, type Position } from "./constants";
import { createGame, useEngine, type GameState } from "./hooks/useEngine";

const STORAGE_KEY = "snake-game";

function isPosition(value: unknown): value is Position {
  if (typeof value !== "object" || value === null) return false;
  if (!("x" in value) || !("y" in value)) return false;

  return Number.isInteger(value.x) && Number.isInteger(value.y);
}

function isGameState(value: unknown): value is GameState {
  if (typeof value !== "object" || value === null) return false;
  if (
    !("snake" in value) ||
    !("direction" in value) ||
    !("food" in value) ||
    !("score" in value) ||
    !("status" in value)
  ) {
    return false;
  }

  return (
    Array.isArray(value.snake) &&
    value.snake.every(isPosition) &&
    (value.food === null || isPosition(value.food)) &&
    Object.values(Direction).some(
      (direction) => direction === value.direction,
    ) &&
    Number.isInteger(value.score) &&
    Object.values(Status).some((status) => status === value.status)
  );
}

function loadGame(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createGame();

    const parsed: unknown = JSON.parse(saved);
    if (isGameState(parsed)) return parsed;

    console.warn("Ignoring invalid saved Snake game.");
  } catch (error) {
    console.error("Could not load the saved Snake game.", error);
  }

  return createGame();
}

const GameContext = createContext<ReturnType<typeof useEngine> | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useEngine(loadGame);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState.game));
    } catch (error) {
      console.error("Could not save the Snake game.", error);
    }
  }, [gameState.game]);

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return context;
}
