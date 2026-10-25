// ABOUTME: VS Code extension entry point — registers date/time insertion commands.
// ABOUTME: Inserts formatted date strings into the active editor using dayjs.
import { commands, workspace, window, ExtensionContext, SnippetString } from "vscode";
import dayjs from "dayjs";
import isoWeekPlugin from "dayjs/plugin/isoWeek";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import { formatDateString } from "./dateString";
import { resolveConfiguredLocale } from "./locales";

dayjs.extend(advancedFormatPlugin);
dayjs.extend(isoWeekPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

let lastWarnedTimezone: string | undefined;
let lastWarnedLocale: string | undefined;

const INPUT_PROMPT = "Date and Time format";
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";
const LAST_FORMAT_KEY = "lastCustomFormat";

function getConfiguredFormat(format = "format"): string {
  const insertDateStringConfiguration = workspace.getConfiguration("insertDateString");
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
  const tz = workspace.getConfiguration("insertDateString").get<string>("timezone", "");
  return tz || undefined;
}

function getConfiguredLocale(): string {
  return workspace.getConfiguration("insertDateString").get<string>("locale", "");
}

function warnInvalidLocale(locale: string): void {
  if (locale === lastWarnedLocale) return;

  lastWarnedLocale = locale;
  void window
    .showWarningMessage(
      `Insert Date String: "${locale}" is not a supported locale. Using English.`,
      "Open Settings",
    )
    .then((selection) => {
      if (selection === "Open Settings") {
        void commands.executeCommand("workbench.action.openSettings", "insertDateString.locale");
      }
    });
}

async function getFormattedDateString(userFormat = getConfiguredFormat()): Promise<string> {
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

  if (userFormat === "iso") {
    return formatDateString(userFormat, now, undefined);
  }

  const localeResolution = await resolveConfiguredLocale(getConfiguredLocale());
  if (localeResolution.invalidLocale) {
    warnInvalidLocale(localeResolution.invalidLocale);
  }

  return formatDateString(userFormat, now, localeResolution.locale);
}

async function replaceEditorSelection(text: string): Promise<void> {
  const snippet = new SnippetString().appendText(text).appendTabstop(0);
  const editor = window.activeTextEditor;
  if (!editor) return;

  const success = await editor.insertSnippet(snippet);
  if (!success) {
    void window.showWarningMessage("Could not insert date string into a read-only document.");
  }
}

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDateTime", async () =>
      replaceEditorSelection(await getFormattedDateString()),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDate", async () =>
      replaceEditorSelection(await getFormattedDateString(getConfiguredFormat("formatDate"))),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTime", async () =>
      replaceEditorSelection(await getFormattedDateString(getConfiguredFormat("formatTime"))),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTimestamp", () =>
      replaceEditorSelection(new Date().getTime().toString()),
    ),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertOwnFormatDateTime", async () => {
      const lastFormat = context.workspaceState.get<string>(LAST_FORMAT_KEY);
      const format = await window.showInputBox({
        value: lastFormat ?? getConfiguredFormat(),
        prompt: INPUT_PROMPT,
      });
      if (format === undefined) return;
      try {
        await replaceEditorSelection(await getFormattedDateString(format));
      } catch {
        void window.showWarningMessage("Could not format date string.");
        return;
      }
      const configuredFormat = getConfiguredFormat();
      void context.workspaceState.update(
        LAST_FORMAT_KEY,
        format === configuredFormat ? undefined : format,
      );
    }),
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.resetWorkspaceFormat", () => {
      void context.workspaceState.update(LAST_FORMAT_KEY, undefined);
      void window.showInformationMessage("Workspace format override cleared.");
    }),
  );
}
