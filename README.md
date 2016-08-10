# Visual Studio Code Extension - Insert Date String

A plugin for Visual Studio Code that inserts the current date and/or time according to the configured ISO 8601 format.

## Installation

Open [Command Palette](https://code.visualstudio.com/docs/editor/codebasics) by pressing `F1`, type `ext install` and then look for Insert Date String extension.

## Usage

To insert current Date and/or time at the cursor position you can:

* Press `⇧⌘I` (OS X) or `Ctrl+Shift+I` (Windows and Linux),

or

* Open [Command Palette](https://code.visualstudio.com/docs/editor/codebasics) by pressing `F1` and type `Insert Date String` then press Enter.

## Available settings

* Date and time format string:

           // Date format to be used.
          "insertdatestring.format": "YYYY-MM-DD hh:mm:ss",

## Date and Time Formats

For a brief introduction about the accepted formatting syntax, see [ISO 8601 Date and Time formats](https://www.w3.org/TR/NOTE-datetime).

### Examples

* Year: `YYYY` (eg 1997)
* Year and month: `YYYY-MM` (eg 1997-07)
* Complete date: `YYYY-MM-DD` (eg 1997-07-16)
* Complete date plus hours and minutes: `YYYY-MM-DDThh:mmTZD` (eg 1997-07-16T19:20+01:00)
* Complete date plus hours, minutes and seconds: `YYYY-MM-DDThh:mm:ssTZD` (eg 1997-07-16T19:20:30+01:00)

where:

* `YYYY` - four-digit year
* `MM` - two-digit month (01=January, etc.)
* `DD` - two-digit day of month (01 through 31)
* `hh` - two digits of hour (00 through 23) (am/pm NOT allowed)
* `mm` - two digits of minute (00 through 59)
* `ss` - two digits of second (00 through 59)
* `TZD` - time zone designator (Z or +hh:mm or -hh:mm)

## License

MIT License. See the [LICENSE](/LICENSE) file.