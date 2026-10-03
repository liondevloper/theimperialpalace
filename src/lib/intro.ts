// The logo intro lives in index.html so it appears instantly, before any JavaScript loads.
// main.tsx records when it finishes so hero animations start right as it fades away.
let endsAt = 0;

export const setIntroEnd = (ms: number) => {
  endsAt = ms;
};

/** Seconds left until the intro is gone (0 once it has finished). */
export const introDelay = () => Math.max(0, (endsAt - performance.now()) / 1000);
