# Changelog

## [3.1.6] - 2026-06-01

### Fixed

- Cleaned up extension bundle to reduce published size

## [3.1.5] - 2026-05-31

### Added

- Unit tests for format tokenizer using `tsx` and `node:test` runner

### Changed

- Refactored: Extracted `processFormat` tokenizer into `format.ts` module

### Fixed

- Excluded test files from published extension package
- Added `ZZ` token to format regex (UTC offset without colon)
- Self-contained the `isoWeek` plugin in `format.ts` to avoid missing dependency errors
- Added explicit `isoWeek` import for proper week-number token resolution
- Cleared default format override to prevent stale workspace state
- Escaped inserted snippet text to prevent injection issues
- Updated linting and formatting scripts

## [3.1.4] - 2026-05-22

### Added

- Updated `.gitignore` and `.vscodeignore` for cleaner project and publish hygiene

### Changed

- Replaced Volta with mise for toolchain management

### Fixed

- Updated dependencies

## [3.1.3] - 2026-04-13

### Added

- Snippet insertion now clears any active text selection after inserting date string

### Changed

- Switched badge links from shields.io to badgen.net

## [3.1.2] - 2026-04-09

### Fixed

- Bracket-escape-aware token substitution; re-enabled `X` (Unix seconds) and `x` (Unix milliseconds) tokens
- Used `async/await` pattern for command handlers
- Handled read-only editors gracefully (no-ops instead of throwing)
- Modernized tooling configuration

### Changed

- Documented literal-text escape syntax change from `date-format-lite` quoting to dayjs bracket syntax

## [3.1.0] - 2026-03-26

### Added

- `insertDateString.timezone` setting — supports any IANA timezone name (e.g. `America/New_York`, `Europe/Warsaw`) for all format-based commands
- `Insert Formatted DateTime` now remembers the last custom format per workspace via VS Code workspace context

### Fixed

- Input box cancellation via <kbd>Esc</kbd> no longer inserts the date string
- Replaced broken marketplace badge URLs with shields.io

## [3.0.0] - 2026-03-25

### Changed

- **BREAKING:** Replaced `date-format-lite` with [dayjs](https://day.js.org/) for date formatting
  - Token semantics for `h`/`hh` (12-hour) and `H`/`HH` (24-hour) have swapped
  - Literal-text escape syntax changed from `"text"`/`'text'` to `[text]`
- **BREAKING:** Bumped VS Code engine requirement to 1.96
- Upgraded to TypeScript 5.8 and Node 22
- Added esbuild bundler; TypeScript compiler used for type-checking only
- Migrated from deprecated TSLint to ESLint 9 flat config
- Upgraded Prettier to v3

### Removed

- **BREAKING:** Removed `activationEvents` — extension activates on command invocation (VS Code 1.96+)

## [2.3.1] - 2022-02-10

### Changed

- Switched to VS Code tasks v2
- Updated `.gitignore`

### Fixed

- Updated dependencies

## [2.3.0] - 2020-07-20

### Added

- GitHub Sponsors support (`FUNDING.yml`)

### Changed

- Migrated from deprecated TSLint to ESLint
- Added Prettier for code formatting

### Security

- Bumped `https-proxy-agent` from 2.2.1 to 2.2.4

### Fixed

- Updated dependencies

## [2.2.4] - 2019-05-09

### Fixed

- Updated dependencies
- Updated README documentation

## [2.2.3] - 2018-07-30

### Fixed

- Updated dependencies
- Updated README documentation

## [2.2.2] - 2018-02-08

### Fixed

- Updated README documentation

## [2.2.0] - 2017-11-07

### Fixed

- Updated dependencies

## [2.1.0] - 2017-07-14

### Added

- `Insert Date` command — inserts current date according to `formatDate` setting
- `Insert Time` command — inserts current time according to `formatTime` setting
- VS Code tasks configuration for development

### Fixed

- Punctuation fix in default command description

## [2.0.1] - 2017-07-03

### Fixed

- Updated README documentation

## [2.0.0] - 2017-03-31

### Changed

- **BREAKING:** Changed configuration namespace from `insertdatestring` to `insertDateString` (camelCase)
- **BREAKING:** Renamed commands to camelCase convention
- Migrated extension from JavaScript to TypeScript

## [1.2.0] - 2017-02-03

### Added

- `Insert Formatted DateTime` command — prompts user for custom format string
- Documented available date/time format syntax in README

### Changed

- Capitalized command names in UI
- Updated LICENSE

## [1.1.2] - 2016-08-31

### Added

- Badges to README (version, installs, ratings, license)

### Fixed

- Updated dependencies

## [1.1.1] - 2016-08-10

### Fixed

- Typos and spelling in README

## [1.1.0] - 2016-08-10

### Added

- `Insert Timestamp` command — inserts current timestamp in milliseconds
- ESLint for code quality

### Changed

- Changed extension namespace from default
- Refactored code: extracted functions, replaced `for` loop with `forEach`

## [1.0.2] - 2016-08-09

### Added

- Extension icon

## [1.0.1] - 2016-08-09

### Changed

- Extension display name

## [1.0.0] - 2016-08-09

### Added

- Initial release
- `Insert DateTime` command with configurable ISO 8601 format
- Keyboard shortcut: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows/Linux) / <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>I</kbd> (macOS)
- `insertdatestring.format` setting for custom format strings

[Unreleased]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.6...HEAD
[3.1.6]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.5...v3.1.6
[3.1.5]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.4...v3.1.5
[3.1.4]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.3...v3.1.4
[3.1.3]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.2...v3.1.3
[3.1.2]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.1.0...v3.1.2
[3.1.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.3.1...v3.0.0
[2.3.1]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.2.4...v2.3.0
[2.2.4]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.2.0...v2.2.2
[2.2.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/jsynowiec/vscode-insertdatestring/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/jsynowiec/vscode-insertdatestring/releases/tag/v1.0.0
