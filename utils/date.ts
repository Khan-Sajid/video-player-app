export function formateTime(value: number) {
  return new Date(value * 1000).toISOString().slice(11, 19);
}
