import { useCallback } from "react";
import {
  buildRandomSpinPath,
  buildStepDurations,
  pickFinalRoll,
} from "../utils/randomizer";

type RunHighlightSequence = (
  availableIndices: number[],
  finalIndexOverride?: number
) => Promise<number>;

type Options = {
  minStep?: number;
  maxStep?: number;
};

export const useHighlightSequence = (
  setHighlightedIndex: (idx: number) => void,
  setIsFinalResult: (isFinal: boolean) => void,
  options: Options = {}
): RunHighlightSequence => {
  const { minStep = 45, maxStep = 260 } = options;

  return useCallback(
    async (availableIndices: number[], finalIndexOverride?: number) => {
      if (!availableIndices.length) return -1;

      setIsFinalResult(false);

      const baseLoops = Math.max(3, Math.ceil(availableIndices.length / 2));
      const finalRoll = finalIndexOverride ?? pickFinalRoll(availableIndices);
      const spinPath = buildRandomSpinPath(
        availableIndices,
        finalRoll,
        baseLoops
      );
      const stepDurations = buildStepDurations(
        spinPath.length,
        minStep,
        maxStep
      );

      // Heavier ease-out at the end to “clinch” the result
      const tailPortion = Math.max(1, Math.floor(stepDurations.length * 0.25));
      const tailBoost = 2.5;
      for (
        let i = stepDurations.length - tailPortion;
        i < stepDurations.length;
        i++
      ) {
        stepDurations[i] *= tailBoost;
      }

      return new Promise<number>((resolve) => {
        let step = 0;
        let lastChange = 0;

        const tick = (timestamp: number) => {
          if (step >= spinPath.length) {
            setIsFinalResult(true);
            resolve(finalRoll);
            return;
          }

          if (timestamp - lastChange >= stepDurations[step]) {
            setHighlightedIndex(spinPath[step]);
            lastChange = timestamp;
            step += 1;
          }

          window.requestAnimationFrame(tick);
        };

        window.requestAnimationFrame(tick);
      });
    },
    [setHighlightedIndex, setIsFinalResult, minStep, maxStep]
  );
};
