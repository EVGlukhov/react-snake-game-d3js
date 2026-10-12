import { useEffect, useRef } from "react";

export function useKeydown(
  keyBindings: Record<string, (event: KeyboardEvent) => void>,
) {
  const keyBindingsRef = useRef(keyBindings);

  useEffect(() => {
    keyBindingsRef.current = keyBindings;
  }, [keyBindings]);

  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (!keyBindingsRef.current) {
        return;
      }

      const handler = keyBindingsRef.current[evt.key];
      if (handler) {
        evt.preventDefault();
        handler(evt);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
}
