export {
  FIT_THRESHOLDS,
  computeFitConfidence,
  computeBadgesForWishlist,
} from "./fitConfidence";
export {
  FIT_SCENARIO_EXPECTATIONS,
  assertFitScenarios,
  logFitScenarioAsserts,
} from "./fitConfidence.scenarios";
export { logAnalytics } from "./analytics";
export {
  TRIGGER_THRESHOLDS,
  evaluateTriggers,
  simulateTriggerOnProduct,
  mergeNudge,
} from "./triggers";
export { buildNudgeCopy, TRIGGER_LABELS } from "./nudgeCopy";
export { completeTheLook } from "./completeTheLook";
export {
  assertNoIncentiveCopy,
  findIncentiveCopy,
  auditCopy,
} from "./copyLint";
export { UI_COPY_CORPUS, runCopyLintSweep, logCopyLintSweep } from "./copySweep";
