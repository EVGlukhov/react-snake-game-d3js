
import {
    Playground,
    GameOverDialog,
    PouseDialog
} from './components';

import {
    useKeydown,
    useSnakeState
} from '@/snake/hooks'

import styles from './styles.module.css';

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
        <div className={styles.container}>
            <h1 className={styles.title}>Snake</h1>
            <p className={styles.highScore}>Press Enter to start!</p>
            {isPlaying && 
                <>
                    <p className={styles.score}><span>Score:</span> <span>{score}</span></p>
                    <p className={styles.pouseHint}>Use arrow keys to control the snake</p>
                </>
            }
            <Playground />
            {isGameOver && <GameOverDialog />}
            {isPause && <PouseDialog />}
        </div>
    )
}