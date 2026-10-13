import {
  Playground,
  GameHeader,
  GameOverDialog,
  PauseDialog,
  WinDialog,
} from "./components";
import { Status } from "./constants";
import { useGame } from "./contexts";

export function Snake() {
  const { game } = useGame();
  return (
    <div className="min-h-screen bg-sky-500 font-mono p-4 relative">
      <div className="flex flex-col gap-8 items-center">
        <GameHeader />
        <Playground />
      </div>
      {game.status === Status.Paused && <PauseDialog />}
      {game.status === Status.GameOver && <GameOverDialog />}
      {game.status === Status.Won && <WinDialog />}
    </div>
  );
}
