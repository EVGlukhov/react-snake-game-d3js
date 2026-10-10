import { useEffect, useRef } from "react";
import { SNAKE_SETTINGS } from "../settings";

export function useRenderer() {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        ref.current.width =
            SNAKE_SETTINGS.cellSize * SNAKE_SETTINGS.columns +
            (SNAKE_SETTINGS.columns - 1) * SNAKE_SETTINGS.cellMargin +
            2 * SNAKE_SETTINGS.gamePadding;

        ref.current.height =
            SNAKE_SETTINGS.cellSize * SNAKE_SETTINGS.rows +
            (SNAKE_SETTINGS.rows - 1) * SNAKE_SETTINGS.cellMargin +
            2 * SNAKE_SETTINGS.gamePadding;
    }, [])

    return { ref };
}