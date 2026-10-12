export const Status = {
  Playing: 'playing',
  GameOver: 'gameOver',
  Won: 'won'
} as const;

export type Status = typeof Status[keyof typeof Status];