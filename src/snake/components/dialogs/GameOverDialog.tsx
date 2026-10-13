import { useGame } from "@/snake/contexts/GameContext";
import { GameDialog } from "../GameDialog";

export function GameOverDialog() {
  const { game } = useGame();

  return (
    <GameDialog>
      <p className="text-3xl font-bold text-rose-800">Game Over</p>
      <p className="text-xl font-bold text-mist-100">
        Your score is: {game.score}
      </p>
      <p className="font-bold text-mist-100">Please press enter to restart</p>
    </GameDialog>
  );
}
