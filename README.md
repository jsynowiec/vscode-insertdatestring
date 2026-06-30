# Insert Date String for VS Code

[![Sponsor][sponsor-badge]][sponsor]
[![Version][version-badge]][marketplace]
[![Ratings][ratings-badge]][marketplace-ratings]
[![Installs][installs-badge]][marketplace]
[![License][license-badge]][license]

Insert the current date, time, ISO 8601 string, Unix timestamp, or a custom-formatted date directly into the VS Code editor.

Use it for notes, changelogs, Markdown front matter, logs, comments, templates, and any workflow where you need a fast, consistent timestamp.

## Features

- Insert date and time with a keyboard shortcut
- Insert date only, time only, or Unix timestamp
- Prompt for a one-off custom format
- Configure default formats with Day.js-style tokens
- Use a fixed IANA timezone such as `UTC`, `Europe/Warsaw`, or `America/New_York`
- Works at the cursor position or replaces the current selection

## Examples

| Command                                | Example output              |
| -------------------------------------- | --------------------------- |
| `Insert DateTime`                      | `2026-06-30 14:05:09`       |
| `Insert Date`                          | `2026-06-30`                |
| `Insert Time`                          | `14:05:09`                  |
| `Insert Timestamp`                     | `1782821109000`             |
| `Insert Formatted DateTime` with `iso` | `2026-06-30T12:05:09Z`      |
| Custom format `YYYY-MM-DDTHH:mm:ssZ`   | `2026-06-30T14:05:09+02:00` |

## Installation

Install from the [Visual Studio Marketplace][marketplace], or open the Command Palette and run:

```sh
ext install jsynowiec.vscode-insertdatestring
```

## Usage

Open the Command Palette and run one of these commands:

| Command                                    | Shortcut                                                                                                                                   | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Insert DateTime`                          | <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>I</kbd> (OS X)<br><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows/Linux)                             | Inserts current date and/or time according to configured format (`format`) at the cursor position.                                                                                                                                                                                                 |
| `Insert Date`                              | —                                                                                                                                          | Inserts current date according to configured format (`formatDate`) at the cursor position.                                                                                                                                                                                                         |
| `Insert Time`                              | —                                                                                                                                          | Inserts current time according to configured format (`formatTime`) at the cursor position.                                                                                                                                                                                                         |
| `Insert Timestamp`                         | —                                                                                                                                          | Inserts current timestamp in milliseconds at the cursor position.                                                                                                                                                                                                                                  |
| `Insert Formatted DateTime`                | <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⌥</kbd>+<kbd>I</kbd> (OS X)<br><kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows/Linux) | Prompt user for format and insert formatted date and/or time at the cursor position. The last custom format entered is remembered per workspace using VS Code's workspace context which is separate from the `insertDateString.format` setting and is not visible in your workspace settings file. |
| `Reset Workspace DateTime Format Override` | —                                                                                                                                          | Clears the workspace-stored format override, restoring the `insertDateString.format` setting as the default for `Insert Formatted DateTime`.                                                                                                                                                       |

## Available settings

- Date and time format string (_this affects `Insert DateTime` output_):
- Date format string (_this affects `Insert Date` output_):
- Time format string (_this affects `Insert Time` output_):
- Timezone (_applies to all format-based commands; leave empty for local system time_):

Configure the default output in your user or workspace settings:

```json
{
  "insertDateString.format": "YYYY-MM-DD HH:mm:ss",
  "insertDateString.formatDate": "YYYY-MM-DD",
  "insertDateString.formatTime": "HH:mm:ss",
  "insertDateString.timezone": ""
}
```

## Timezone

Set `insertDateString.timezone` to an [IANA timezone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to produce timestamps in a consistent timezone regardless of the local system clock. This is useful for distributed teams that need to agree on a shared reference timezone.

```json
"insertDateString.timezone": "America/New_York"
```

**Supported values:** Any IANA timezone name (e.g. `UTC`, `America/New_York`, `Europe/Warsaw`, `Asia/Tokyo`). Leave empty to use local system time.

**Affected commands:** `Insert DateTime`, `Insert Date`, `Insert Time`, `Insert Formatted DateTime`.

**Unaffected commands:** `Insert Timestamp` always produces a Unix timestamp in milliseconds (UTC by definition). The `iso` format token always outputs UTC regardless of this setting.

If the configured value is not a valid IANA timezone, a warning is shown and local system time is used as a fallback.

## Syntax

Format strings use [dayjs](https://day.js.org/docs/en/display/format) token conventions.

### Year

- **YY** - Two-digit year. Examples: 99 or 03
- **YYYY** - Four-digit year. Examples: 1999 or 2003

### Month

- **M** - Month, without leading zeros. 1 through 12
- **MM** - Month, with leading zeros. 01 through 12
- **MMM** - Abbreviated month name. Jan through Dec
- **MMMM** - Full month name. January through December

### Day

- **D** - Day of the month, without leading zeros. 1 to 31
- **DD** - Day of the month, with leading zeros. 01 to 31
- **d** - Day of the week. 0 (Sunday) through 6 (Saturday)
- **ddd** - Abbreviated day name. Sun through Sat
- **dddd** - Full day name. Sunday through Saturday

### Hour

- **H** - 24-hour format, without leading zeros. 0 through 23
- **HH** - 24-hour format, with leading zeros. 00 through 23
- **h** - 12-hour format, without leading zeros. 1 through 12
- **hh** - 12-hour format, with leading zeros. 01 through 12

### Minute, second, millisecond

- **m** - Minutes, without leading zeros. 0 through 59
- **mm** - Minutes, with leading zeros. 00 to 59
- **s** - Seconds, without leading zeros. 0 through 59
- **ss** - Seconds, with leading zeros. 00 to 59
- **SSS** - Milliseconds, with leading zeros. 000 to 999

### AM/PM and timezone

- **A** - AM or PM
- **a** - am or pm
- **Z** - UTC offset. Examples: +05:30, -07:00
- **ZZ** - UTC offset without colon. Examples: +0530, -0700

### Unix timestamps

- **X** - Unix timestamp in seconds
- **x** - Unix timestamp in milliseconds

### ISO week tokens

- **w** - ISO weekday. 1 (Monday) through 7 (Sunday)
- **W** - ISO week number of year. First week is the week containing 4 January
- **WW** - ISO week number of year, zero-padded. Examples: 01, 22
- **o** - ISO week-year (same as `GGGG`, provided for compatibility)
- **GGGG** - ISO week-year (standard dayjs token). Same as `YYYY` except at year boundaries where the ISO week belongs to the adjacent year
- **iso** - Special value: outputs a simplified ISO 8601 string in UTC (e.g. `2013-07-16T20:13:31Z`)

### Ordinal tokens

- **Do** - Ordinal day of the month. Examples: 1st, 2nd, 31st

### Examples

- Year and month: `YYYY-MM` (2013-07)
- Complete date: `YYYY-MM-DD` (2013-07-16)
- Complete date and time: `YYYY-MM-DD HH:mm:ss` (2013-07-16 20:13:31)
- Complete date plus hours, minutes, seconds and UTC offset: `YYYY-MM-DDTHH:mm:ssZ` (2013-07-16T20:13:31+01:00)

## Breaking Changes

- Version 3.0 switched from `date-format-lite` to [dayjs](https://day.js.org/) for date formatting:
  - Token semantics for `h`/`hh`/`H`/`HH` have changed — `HH` is now 24-hour (was 12-hour) and `hh` is now 12-hour (was 24-hour). The default format has been updated. If you use a custom format with `hh` or `HH`, please review and update your settings.
  - Literal-text escape syntax changed: `date-format-lite` used `"text"` or `'text'` (e.g. `'T'`); dayjs uses `[text]` (e.g. `[T]`). If you use literal escaping in your format, update to the bracket syntax. If you want literal square brackets in the output, you need to escape the bracket characters using the same mechanism. For example, `[[]` produces a literal `[`.

## License

Released under the [MIT License][license].

[version-badge]: https://badgen.net/vs-marketplace/v/jsynowiec.vscode-insertdatestring
[marketplace]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring
[installs-badge]: https://badgen.net/vs-marketplace/i/jsynowiec.vscode-insertdatestring
[ratings-badge]: https://badgen.net/vs-marketplace/rating/jsynowiec.vscode-insertdatestring
[marketplace-ratings]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring#review-details
[license-badge]: https://img.shields.io/github/license/jsynowiec/vscode-insertdatestring.svg
[license]: https://github.com/jsynowiec/vscode-insertdatestring/blob/master/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/jsynowiec
