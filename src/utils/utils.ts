export function isObjEmpty(
  obj: object | null | undefined
): boolean {
  return obj != null &&  Object.keys(obj).length === 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}