# VSCode extension - Insert Date String

[![Sponsor][sponsor-badge]][sponsor]
[![Version][version-badge]][marketplace]
[![Ratings][ratings-badge]][marketplace-ratings]
[![Installs][installs-badge]][marketplace]
[![License][license-badge]][license]

A plugin for Visual Studio Code that inserts the current date and/or time according to configured format. Available in [VisualStudio Marketplace][marketplace].

**Notice** Version 2.0 changed settings namespace from `insertdatestring` to `insertDateString`. Please update your userspace and workspace settings.

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
"insertDateString.format": "YYYY-MM-DD hh:mm:ss",
"insertDateString.formatDate": "YYYY-MM-DD",
"insertDateString.formatTime": "hh:mm:ss",
```

## Syntax

- **Y** - A two digit representation of a year without leading zeros. Examples: 99 or 3
- **YY** - A two digit representation of a year. Examples: 99 or 03
- **YYYY** - A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
- **M** - Numeric representation of a month, without leading zeros. 1 through 12
- **MM** - Numeric representation of a month, with leading zeros. 01 through 12
- **MMM** - A short textual representation of a month, three letters. Jan through Dec
- **MMMM** - A full textual representation of a month, such as January or March. January through December
- **D** - Day of the month without leading zeros. 1 to 31
- **DD** - Day of the month, 2 digits with leading zeros. 01 to 31
- **DDD** - A textual representation of a day, three letters. Mon through Sun
- **DDDD** - A full textual representation of the day of the week. Sunday through Saturday
- **H** - 12-hour format of an hour without leading zeros. 1 through 12
- **HH** - 12-hour format of an hour with leading zeros. 01 through 12
- **h** - 24-hour format of an hour without leading zeros. 0 through 23
- **hh** - 24-hour format of an hour with leading zeros. 00 through 23
- **m** - Minutes without leading zeros. 0 through 59
- **mm** - Minutes with leading zeros. 00 to 59
- **s** - Seconds without leading zeros. 0 through 59
- **ss** - Seconds with leading zeros. 00 to 59
- **S** - Milliseconds without leading zeros. 0 through 999
- **SS** - Milliseconds with leading zeros. 000 to 999
- **U** - Milliseconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **u** - Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **A** - Ante meridiem and Post meridiem. AM or PM

### Time zone designators

- **Z** - Time offsets from UTC in the form ±hh[:mm] Examples: +02, +02:30
- **ZZ** - Time offsets from UTC in the form ±hh[mm] Examples: +02, +0230
- **ZZZ** - Time offsets from UTC in the form ±hh:mm Examples: +02:00, +02:30
- **ZZZZ** - Time offsets from UTC in the form ±hhmm Examples: +0200, +0230

### ISO-8601

- **iso** - Simplified extended ISO format (ISO 8601) without miliseconds. The timezone is always zero UTC offset, as denoted by the suffix "Z".
- **w** - Day of the week. 1 (for Monday) through 7 (for Sunday)
- **W** - Week number of year, first week is the week with 4 January in it
- **o** - ISO 8601 year number. This has the same value as YYYY, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead

### Examples

- UTC date and time: `iso` (2013-07-16T20:13:31Z)
- Year and month: `YYYY-MM` (2013-07)
- Complete date: `YYYY-MM-DD` (2013-07-16)
- Complete date plus hours, minutes, seconds and difference to GMT: `YYYY-MM-DDThh:mm:ssZZZ` (2013-07-16T20:13:31+01:00)

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
