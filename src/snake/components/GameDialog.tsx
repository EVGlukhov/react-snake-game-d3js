import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function GameDialog({ children }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 flex-col gap-2">
      {children}
    </div>
  );
}
