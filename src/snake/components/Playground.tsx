import { useEffect, useRef } from "react";
import { useEngine, useKeydown, useRenderer } from "../hooks";
import { SNAKE_SETTINGS } from "../settings";
import { Status } from "../constants";
import { Direction } from "../hooks/useEngine";

export function Playground() {
  const { ref, drawFrame } = useRenderer();
  const { game, advanceSnake, setDirection } = useEngine();
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    drawFrame(game.snake, game.food);
  }, [game.snake, game.food, drawFrame]);

  useEffect(() => {
    if (game.status !== Status.Playing) {
      return;
    }

    let lastMove: number | null = null;

    function frame(timestamp: number) {
      if (lastMove === null) {
        lastMove = timestamp;
      } else if (timestamp - lastMove >= SNAKE_SETTINGS.cooldown) {
        advanceSnake();
        lastMove = timestamp;
      }

      frameIdRef.current = requestAnimationFrame(frame);
    }

    frameIdRef.current = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(frameIdRef.current);
  }, [advanceSnake, game.status]);

  useKeydown({
    ArrowUp: () => setDirection(Direction.Up),
    ArrowDown: () => setDirection(Direction.Down),
    ArrowLeft: () => setDirection(Direction.Left),
    ArrowRight: () => setDirection(Direction.Right),
  });

  return (
    <div>
      <canvas ref={ref} className="bg-zinc-600"></canvas>
    </div>
  );
}
