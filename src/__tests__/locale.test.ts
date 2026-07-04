// ABOUTME: Unit tests for configured Day.js locale rendering.
// ABOUTME: Verifies locale loading, normalization, fallback, and English isolation.
import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import dayjs from "dayjs";

import { formatDateString } from "../dateString.js";
import { resolveConfiguredLocale } from "../locales.js";

describe("locale formatting", () => {
  const fixedDate = dayjs("2026-07-03");

  it("renders English output when locale is empty", async () => {
    const localeResolution = await resolveConfiguredLocale("");

    assert.equal(localeResolution.locale, undefined);
    assert.equal(
      formatDateString("dddd MMMM", fixedDate, undefined),
      "Friday July",
    );
  });

  it("renders Spanish weekday output for es", async () => {
    const localeResolution = await resolveConfiguredLocale("es");

    assert.equal(localeResolution.locale, "es");
    assert.equal(
      formatDateString("dddd", fixedDate, localeResolution.locale),
      "viernes",
    );
  });

  it("localizes abbreviated and full month-name tokens", async () => {
    const localeResolution = await resolveConfiguredLocale("es");

    assert.equal(
      formatDateString("MMM MMMM", fixedDate, localeResolution.locale),
      "jul julio",
    );
  });

  it("does not let a loaded locale affect later default formatting", async () => {
    const localeResolution = await resolveConfiguredLocale("es");

    assert.equal(
      formatDateString("dddd", fixedDate, localeResolution.locale),
      "viernes",
    );
    assert.equal(
      formatDateString("dddd MMMM", fixedDate, undefined),
      "Friday July",
    );
  });

  it("normalizes uppercase and whitespace in configured locale", async () => {
    const localeResolution = await resolveConfiguredLocale(" ES ");

    assert.equal(localeResolution.locale, "es");
    assert.equal(formatDateString("MMMM", fixedDate, localeResolution.locale), "julio");
  });

  it("falls back to English for unsupported locales", async () => {
    const localeResolution = await resolveConfiguredLocale("not-a-locale");

    assert.equal(localeResolution.locale, undefined);
    assert.equal(localeResolution.invalidLocale, "not-a-locale");
    assert.equal(
      formatDateString("dddd MMMM", fixedDate, localeResolution.locale),
      "Friday July",
    );
  });
});
