import { useEngine } from '../hooks/useEngine';
import { useRenderer } from '../hooks/useRenderer';

export function Playground() {
  const { ref } = useRenderer();
  const engine = useEngine();


  return (
    <div>
      <canvas ref={ref} className="bg-teal-700"></canvas> 
    </div>
  );
}