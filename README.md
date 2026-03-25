# VSCode extension - Insert Date String

[![Sponsor][sponsor-badge]][sponsor]
[![Version][version-badge]][marketplace]
[![Ratings][ratings-badge]][marketplace-ratings]
[![Installs][installs-badge]][marketplace]
[![License][license-badge]][license]

A plugin for Visual Studio Code that inserts the current date and/or time according to configured format. Available in [VisualStudio Marketplace][marketplace].

**Notice** Version 2.0 changed settings namespace from `insertdatestring` to `insertDateString`. Please update your userspace and workspace settings.

**Notice** Version 3.0 switched from `date-format-lite` to [dayjs](https://day.js.org/) for date formatting. Token semantics for `h`/`hh`/`H`/`HH` have changed to align with dayjs/moment.js conventions — `HH` is now 24-hour (was 12-hour) and `hh` is now 12-hour (was 24-hour). The default format has been updated. If you use a custom format with `hh` or `HH`, please review and update your settings.

## Installation

Open [Command Palette](https://code.visualstudio.com/docs/editor/codebasics) by pressing `F1`, type `ext install` and then look for **Insert Date String** extension.

## Usage

Following commands are available:

- `Insert DateTime` (<kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>I</kbd> on OS X, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> on Windows and Linux) - Inserts current date and/or time according to configured format (`format`) at the cursor position.
- `Insert Date` - Inserts current date according to configured format (`formatDate`) at the cursor position.
- `Insert Time` - Inserts current time according to configured format (`formatTime`) at the cursor position.
- `Insert Timestamp` - Inserts current timestamp in milliseconds at the cursor position.
- `Insert Formatted DateTime` (<kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⌥</kbd>+<kbd>I</kbd> on OS X, <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> on Windows and Linux) - Prompt user for format and insert formatted date and/or time at the cursor position.

## Available settings

- Date and time format string (_this affects `Insert DateTime` output_):
- Date format string (_this affects `Insert Date` output_):
- Time format string (_this affects `Insert Time` output_):

```
// Date format to be used.
"insertDateString.format": "YYYY-MM-DD HH:mm:ss",
"insertDateString.formatDate": "YYYY-MM-DD",
"insertDateString.formatTime": "HH:mm:ss",
```

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
- **o** - ISO week-year. Same as `YYYY` except at year boundaries where the ISO week belongs to the adjacent year
- **iso** - Special value: outputs a simplified ISO 8601 string in UTC (e.g. `2013-07-16T20:13:31Z`)

### Examples

- Year and month: `YYYY-MM` (2013-07)
- Complete date: `YYYY-MM-DD` (2013-07-16)
- Complete date and time: `YYYY-MM-DD HH:mm:ss` (2013-07-16 20:13:31)
- Complete date plus hours, minutes, seconds and UTC offset: `YYYY-MM-DDTHH:mm:ssZ` (2013-07-16T20:13:31+01:00)

## License

Released under the [MIT License][license].

[version-badge]: https://vsmarketplacebadge.apphb.com/version/jsynowiec.vscode-insertdatestring.svg
[marketplace]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring
[installs-badge]: https://vsmarketplacebadge.apphb.com/installs/jsynowiec.vscode-insertdatestring.svg
[ratings-badge]: https://vsmarketplacebadge.apphb.com/rating/jsynowiec.vscode-insertdatestring.svg
[marketplace-ratings]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring#review-details
[license-badge]: https://img.shields.io/github/license/jsynowiec/vscode-insertdatestring.svg
[license]: https://github.com/jsynowiec/vscode-insertdatestring/blob/master/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/jsynowiec
