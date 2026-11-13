export function isObjEmpty(
  obj: object | null | undefined
): boolean {
  return obj != null &&  Object.keys(obj).length === 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function round(num: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}

export function selectRandomItem<T>(itemPool: T[]): T {
  return itemPool[Math.floor(Math.random() * itemPool.length)];
}

export function rollChance(chance?: number): boolean {
  return chance !== undefined && Math.random() <= chance;
}

export function removeFromArray<T>(array: T[], value: T): T[] {
  const index = array.indexOf(value);
  if (index !== -1) {array.splice(index, 1) }
  return array;
}