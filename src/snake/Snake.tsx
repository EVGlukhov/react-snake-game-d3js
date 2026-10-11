
import {
  Playground,
  GameOverDialog,
  PouseDialog
} from './components';

import {
  useKeydown,
  useSnakeState
} from '@/snake/hooks'
import { GameHeader } from './components/GameHeader';

export function Snake() {
  const {
    score,
    isPlaying,
    isGameOver,
    isPause,
    dispatch
  } = useSnakeState();

  useKeydown({ 
    Enter: () => isGameOver && dispatch({ type: 'RESET' })
  })

  return (
    <div className="min-h-screen bg-sky-500 font-mono p-4">
      <div className="flex flex-col gap-3 items-center">
        <GameHeader />
        <Playground />
      </div>    
      {isGameOver && <GameOverDialog />}
      {isPause && <PouseDialog />}
    </div>
  )
}