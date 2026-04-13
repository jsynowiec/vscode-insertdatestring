// ABOUTME: VS Code extension entry point — registers date/time insertion commands.
// ABOUTME: Inserts formatted date strings into the active editor using dayjs.
import {
  commands,
  workspace,
  window,
  ExtensionContext,
  SnippetString,
} from "vscode";
import dayjs from "dayjs";
import isoWeekPlugin from "dayjs/plugin/isoWeek";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(advancedFormatPlugin);
dayjs.extend(isoWeekPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

let lastWarnedTimezone: string | undefined;

const INPUT_PROMPT = "Date and Time format";
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";
const LAST_FORMAT_KEY = "lastCustomFormat";

function getConfiguredFormat(format = "format"): string {
  const insertDateStringConfiguration =
    workspace.getConfiguration("insertDateString");
  return insertDateStringConfiguration.get(format, DEFAULT_FORMAT);
}

function isValidTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function getConfiguredTimezone(): string | undefined {
  const tz = workspace
    .getConfiguration("insertDateString")
    .get<string>("timezone", "");
  return tz || undefined;
}

function getFormattedDateString(userFormat = getConfiguredFormat()): string {
  const timezone = getConfiguredTimezone();
  let now: dayjs.Dayjs;

  if (timezone) {
    if (isValidTimezone(timezone)) {
      now = dayjs().tz(timezone);
    } else {
      if (timezone !== lastWarnedTimezone) {
        lastWarnedTimezone = timezone;
        void window
          .showWarningMessage(
            `Insert Date String: "${timezone}" is not a valid IANA timezone. Using local time.`,
            "Open Settings",
          )
          .then((selection) => {
            if (selection === "Open Settings") {
              void commands.executeCommand(
                "workbench.action.openSettings",
                "insertDateString.timezone",
              );
            }
          });
      }
      now = dayjs();
    }
  } else {
    now = dayjs();
  }

  // Special-case: "iso" outputs a simplified ISO 8601 string.
  // toISOString() always returns UTC regardless of any configured timezone — by design.
  if (userFormat === "iso") {
    return now.toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  // Pre-substitute tokens that dayjs does not support natively:
  //   w  = ISO weekday, 1 (Monday) through 7 (Sunday)
  //   W  = ISO week number of year
  //   o  = ISO week-year (same as year except at week boundaries)
  // The regex matches bracket escapes first (preserving them intact) so
  // that w/W/o inside [literal text] are not replaced.
  const processedFormat = userFormat.replace(
    /\[([^\]]*)\]|W|w|o/g,
    (match) => {
      if (match[0] === "[") return match;
      if (match === "W") return String(now.isoWeek());
      if (match === "w") return String(now.isoWeekday());
      return String(now.isoWeekYear());
    },
  );

  return now.format(processedFormat);
}

async function replaceEditorSelection(text: string): Promise<void> {
  const snippet = new SnippetString(text + "$0");
  const editor = window.activeTextEditor;
  if (!editor) return;

  const success = await editor.insertSnippet(snippet);
  if (!success) {
    void window.showWarningMessage(
      "Could not insert date string into a read-only document.",
    );
  }
}

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDateTime", () =>
      replaceEditorSelection(getFormattedDateString()),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDate", () =>
      replaceEditorSelection(
        getFormattedDateString(getConfiguredFormat("formatDate")),
      ),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTime", () =>
      replaceEditorSelection(
        getFormattedDateString(getConfiguredFormat("formatTime")),
      ),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTimestamp", () =>
      replaceEditorSelection(new Date().getTime().toString()),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand(
      "insertDateString.insertOwnFormatDateTime",
      async () => {
        const lastFormat = context.workspaceState.get<string>(LAST_FORMAT_KEY);
        const format = await window.showInputBox({
          value: lastFormat ?? getConfiguredFormat(),
          prompt: INPUT_PROMPT,
        });
        if (format === undefined) return;
        try {
          await replaceEditorSelection(getFormattedDateString(format));
        } catch {
          void window.showWarningMessage("Could not format date string.");
          return;
        }
        if (format !== getConfiguredFormat()) {
          void context.workspaceState.update(LAST_FORMAT_KEY, format);
        }
      },
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.resetWorkspaceFormat", () => {
      void context.workspaceState.update(LAST_FORMAT_KEY, undefined);
      void window.showInformationMessage("Workspace format override cleared.");
    }),
  );
}
