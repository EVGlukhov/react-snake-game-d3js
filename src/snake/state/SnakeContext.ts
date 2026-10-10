import { createContext, type ActionDispatch, type Dispatch } from "react"

export type SnakeState = {
    score: number
    isStarting: boolean
    isPlaying: boolean
    isGameOver: boolean
    isPause: boolean
}

export type SnakeAction =
 | { type: 'RESET' }
 | { type: 'PAUSE' }
 | { type: 'RESUME' }


export type SnakeContext = SnakeState & {
    dispatch: Dispatch<SnakeAction>
}

export const initialState: SnakeState = {
    score: 0,
    isStarting: true,
    isPlaying: false,
    isGameOver: false,
    isPause: false
}

export const SnakeContext = createContext<SnakeContext>({
    ...initialState,
    dispatch: () => {}
})