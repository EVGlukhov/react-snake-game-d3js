import { useSnakeState } from "../hooks"

export function GameHeader() {
  const { score } = useSnakeState();

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-full bg-amber-500 drop-shadow-xl p-4 rounded-md">
        <h1 className="text-gray-700 text-4xl text-center">Snake</h1>
      </div>
      <div className="bg-mist-100 drop-shadow-xl p-2 rounded-md">
        <p className="text-2xl text-slate-900 font-medium">Score: {score}</p>
      </div>
    </div>
  )
}