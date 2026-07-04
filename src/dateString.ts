// ABOUTME: Pure date-string rendering helper shared by extension commands and tests.
// ABOUTME: Applies configured Day.js locale per instance without changing global locale.
import dayjs from "dayjs";
import { processFormat } from "./format";

export function formatDateString(
  userFormat: string,
  now: dayjs.Dayjs,
  locale: string | undefined,
): string {
  // Special-case: "iso" outputs a simplified ISO 8601 string.
  // toISOString() always returns UTC regardless of any configured timezone - by design.
  if (userFormat === "iso") {
    return now.toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  const localizedNow = now.locale(locale ?? "en");
  const processedFormat = processFormat(userFormat, localizedNow);

  return localizedNow.format(processedFormat);
}
