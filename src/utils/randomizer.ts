export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const nextRandomIndex = (indices: number[], previous?: number) => {
  if (indices.length === 0) return 0;
  if (indices.length === 1) return indices[0];

  let pick = indices[Math.floor(Math.random() * indices.length)];
  while (pick === previous) {
    pick = indices[Math.floor(Math.random() * indices.length)];
  }
  return pick;
};

export const buildRandomSpinPath = (
  available: number[],
  finalRoll: number,
  baseLoops: number
) => {
  const hops = Math.max(baseLoops * available.length, 12);
  const path: number[] = [];
  let prev: number | undefined;

  for (let i = 0; i < hops; i++) {
    const jump = nextRandomIndex(available, prev);
    path.push(jump);
    prev = jump;
  }

  if (path[path.length - 1] === finalRoll) {
    path.push(nextRandomIndex(available, finalRoll));
  }

  path.push(finalRoll);
  return path;
};

export const buildStepDurations = (
  length: number,
  minStep: number,
  maxStep: number
) =>
  Array.from({ length }).map((_, idx) => {
    const t = length === 1 ? 1 : idx / (length - 1);
    const eased = easeInOutCubic(t);
    return minStep + (maxStep - minStep) * eased;
  });

export const pickFinalRoll = (indices: number[]) =>
  indices[Math.floor(Math.random() * indices.length)];
