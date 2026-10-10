import {
    useReducer,
    type ReactNode
} from "react"
import {
    initialState,
    SnakeContext,
    type SnakeAction,
    type SnakeState
} from "./SnakeContext"

function snakeReducer(state: SnakeState, action: SnakeAction): SnakeState {
    switch(action.type) {
        case 'PAUSE': {
            return {
                ...state,
                isPlaying: false,
                isPause: true
            }
        }
        case 'RESUME': {
            return {
                ...state,
                isPlaying: true,
                isPause: false
            }
        }
        case 'RESET': 
            return { ...initialState };
        default:
            return state
    }
}

type Props = {
    children: ReactNode
}
export function SnakeProvider({ children }: Props) {
    const [state, dispatch] = useReducer(snakeReducer, initialState)

    return (
        <SnakeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SnakeContext.Provider>
    )
}