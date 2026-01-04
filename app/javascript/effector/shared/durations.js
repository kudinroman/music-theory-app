export const DURATIONS = [
  "1", // четверть
  "2", // половинная
  "1/2", // восьмая
  "3/2", // пунктир
];

export function randomDuration() {
  return DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
}
