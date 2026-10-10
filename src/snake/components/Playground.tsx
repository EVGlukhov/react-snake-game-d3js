import { useEngine } from '../hooks/useEngine';
import { useRenderer } from '../hooks/useRenderer';

export function Playground() {
    const { ref } = useRenderer();
    const engine = useEngine();


    return (
        <canvas ref={ref}></canvas>
    );
}