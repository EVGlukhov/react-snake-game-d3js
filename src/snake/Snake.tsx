
import { Playground, GameHeader } from './components';

export function Snake() {
  return (
    <div className="min-h-screen bg-sky-500 font-mono p-4">
      <div className="flex flex-col gap-8 items-center">
        <GameHeader />
        <Playground />
      </div>    
    </div>
  )
}