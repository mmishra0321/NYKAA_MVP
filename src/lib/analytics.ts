import type { AnalyticsEvent, AnalyticsEventName } from "../types";

/** Dev-friendly logger; also pair with LOG_EVENT into app state. */
export function logAnalytics(
  name: AnalyticsEventName,
  payload: AnalyticsEvent["payload"],
): void {
  if (import.meta.env.DEV) {
    console.info(`[analytics] ${name}`, payload);
  }
}
