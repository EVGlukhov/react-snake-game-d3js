import { GameDialog } from "../GameDialog";

export function WinDialog() {
  return (
    <GameDialog>
      <p className="text-3xl font-bold text-green-600">You won!</p>
    </GameDialog>
  );
}
