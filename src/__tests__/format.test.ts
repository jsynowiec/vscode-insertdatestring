import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import dayjs from "dayjs";
import isoWeekPlugin from "dayjs/plugin/isoWeek";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormatPlugin);
dayjs.extend(isoWeekPlugin);

import { processFormat } from "../format.js";

describe("processFormat", () => {
  const jan1 = dayjs("2026-01-01");
  const may31 = dayjs("2026-05-31");
  const dec29_2025 = dayjs("2025-12-29");

  it("preserves Do (ordinal day) — the core bug", () => {
    assert.equal(processFormat("Do", may31), "Do");
    assert.equal(may31.format(processFormat("Do", may31)), "31st");
  });

  it("preserves WW (zero-padded ISO week)", () => {
    assert.equal(processFormat("WW", jan1), "WW");
    assert.equal(jan1.format(processFormat("WW", jan1)), "01");
  });

  it("preserves W (ISO week without padding)", () => {
    assert.equal(processFormat("W", jan1), "W");
    assert.equal(jan1.format(processFormat("W", jan1)), "1");
  });

  it("preserves GGGG (ISO week-year)", () => {
    assert.equal(processFormat("GGGG", dec29_2025), "GGGG");
    assert.equal(dec29_2025.format(processFormat("GGGG", dec29_2025)), "2026");
  });

  it("substitutes w with ISO weekday", () => {
    assert.equal(processFormat("w", may31), "7");
    assert.equal(processFormat("w", jan1), "4");
  });

  it("substitutes o with ISO week-year", () => {
    assert.equal(processFormat("o", may31), "2026");
    assert.equal(processFormat("o", dec29_2025), "2026");
  });

  it("substitutes o correctly when week-year differs from calendar year", () => {
    assert.equal(
      dec29_2025.format(processFormat("o-MM-DD", dec29_2025)),
      "2026-12-29",
    );
  });

  it("handles wo as ISO weekday + week-year (not locale ordinal week)", () => {
    assert.equal(processFormat("wo", may31), "72026");
    assert.equal(may31.format(processFormat("[week] wo", may31)), "week 72026");
  });

  it("preserves bracket-escaped literals", () => {
    assert.equal(processFormat("[Wow]", may31), "[Wow]");
    assert.equal(may31.format(processFormat("[Wow]", may31)), "Wow");
  });

  it("preserves bracket-escaped tokens containing w and o", () => {
    assert.equal(processFormat("[w]", may31), "[w]");
    assert.equal(may31.format(processFormat("[w]", may31)), "w");
  });

  it("handles mixed format with standard and custom tokens", () => {
    const fmt = "YYYY-MM-DD [week] W w o";
    const result = processFormat(fmt, may31);
    assert.equal(result, "YYYY-MM-DD [week] W 7 2026");
  });

  it("handles DDo as DD + o (not D + Do)", () => {
    const result = processFormat("DDo", may31);
    assert.equal(result, "DD2026");
    assert.equal(may31.format(result), "312026");
  });

  it("handles format with only standard dayjs tokens", () => {
    const fmt = "YYYY-MM-DD HH:mm:ss";
    assert.equal(processFormat(fmt, may31), fmt);
  });

  it("handles lowercase s and o token substitution in mixed string", () => {
    assert.equal(processFormat("iso", may31), "is2026");
  });
});
