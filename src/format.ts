// ABOUTME: Format string tokenizer for dayjs with ISO-week extensions.
// ABOUTME: Pre-substitutes custom tokens (w, o) while preserving all dayjs tokens.
import dayjs from "dayjs";
import "dayjs/plugin/isoWeek";

// Longest-match-first alternation. Note: `wo` and `ww` are omitted because
// they require the weekOfYear plugin, which this extension does not load.
const FORMAT_TOKEN_RE =
  /\[([^\]]*)\]|GGGG|YYYY|MMMM|dddd|MMM|ddd|zzz|SSS|YY|MM|DD|Do|dd|HH|hh|mm|ss|WW|ZZ|kk|SS|Q|M|D|d|H|h|m|s|A|a|W|X|x|Z|z|k|S|w|o/g;

export function processFormat(format: string, now: dayjs.Dayjs): string {
  return format.replace(FORMAT_TOKEN_RE, (match) => {
    if (match[0] === "[") return match;
    if (match === "w") return String(now.isoWeekday());
    if (match === "o") return String(now.isoWeekYear());
    return match;
  });
}
