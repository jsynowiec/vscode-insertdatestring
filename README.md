[![Version][version-badge]][marketplace]
[![Installs][installs-badge]][marketplace]
[![Ratings][ratings-badge]][marketplace-ratings]

[![Dependencies][dependencies-badge]][dependencies]
[![Dev dependencies][devdependencies-badge]][devdependencies]

[![MIT License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Visual Studio Code Extension - Insert Date String

A plugin for Visual Studio Code that inserts the current date and/or time according to configured format. Available in [VisualStudio Marketplace][marketplace].

## Installation

Open [Command Palette](https://code.visualstudio.com/docs/editor/codebasics) by pressing `F1`, type `ext install` and then look for **Insert Date String** extension.

## Usage

Following commands are available:

* `Insert DateTime` (`⇧⌘I` on OS X, `Ctrl+Shift+I` on Windows and Linux) - Inserts current date and/or time according to configured format at the cursor position, 
* `Insert Timestamp` - Inserts current timestamp in milliseconds at the cursor position.

## Available settings

* Date and time format string (*this affects `Insert DateTime` output*):

        // Date format to be used.
        "insertdatestring.format": "YYYY-MM-DD hh:mm:ss",

## Date and Time Formats

For a brief introduction about the accepted formatting syntax, see [ISO 8601 date and time formats](https://www.w3.org/TR/NOTE-datetime).

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

MIT License. See the [LICENSE][license] file.

[dependencies-badge]: https://david-dm.org/jsynowiec/vscode-insertdatestring/status.svg
[dependencies]: https://david-dm.org/jsynowiec/vscode-insertdatestring
[devdependencies-badge]: https://david-dm.org/jsynowiec/vscode-insertdatestring/dev-status.svg
[devdependencies]: https://david-dm.org/jsynowiec/vscode-insertdatestring?type=dev
[version-badge]: http://vsmarketplacebadge.apphb.com/version/jsynowiec.vscode-insertdatestring.svg
[marketplace]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring
[installs-badge]: http://vsmarketplacebadge.apphb.com/installs/jsynowiec.vscode-insertdatestring.svg
[ratings-badge]: https://vsmarketplacebadge.apphb.com/rating/jsynowiec.vscode-insertdatestring.svg
[marketplace-ratings]: https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring#review-details
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/jsynowiec/vscode-insertdatestring/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg
[donate]: http://bit.ly/donate-js
[github-watch-badge]: https://img.shields.io/github/watchers/jsynowiec/vscode-insertdatestring.svg?style=social
[github-watch]: https://github.com/jsynowiec/vscode-insertdatestring/watchers
[github-star-badge]: https://img.shields.io/github/stars/jsynowiec/vscode-insertdatestring.svg?style=social
[github-star]: https://github.com/jsynowiec/vscode-insertdatestring/stargazers
[twitter-badge]: https://img.shields.io/twitter/url/https/jsynowiec/vscode-insertdatestring.svg?style=social
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20VS%20%40code%20extension!%20https%3A%2F%2Fgithub.com%2Fjsynowiec%2Fvscode-insertdatestring%20%F0%9F%91%8D