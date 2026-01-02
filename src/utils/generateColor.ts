function getHash(input: string): number {
  let hash = 0;
  for (const char of input) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash;
}

export default function generateColor(
  input: string,
  saturation: number,
  lightness: number
): string {
  const hash: number = Math.abs(getHash(input)) % 361;
  return `hsl(${hash}, ${saturation}%, ${lightness}%)`;
}
