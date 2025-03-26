
export function formatTimer(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateProgress(seconds: number, totalDuration = 180): number {
  return Math.min(seconds / totalDuration * 100, 100);
}
