// ABOUTME: VS Code extension entry point — registers date/time insertion commands.
// ABOUTME: Inserts formatted date strings into the active editor using dayjs.
import { commands, workspace, window, ExtensionContext } from "vscode";
import dayjs from "dayjs";
import isoWeekPlugin from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeekPlugin);

const INPUT_PROMPT = "Date and Time format";
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";

function getConfiguredFormat(format = "format"): string {
  const insertDateStringConfiguration =
    workspace.getConfiguration("insertDateString");
  return insertDateStringConfiguration.get(format, DEFAULT_FORMAT);
}

function getFormattedDateString(userFormat = getConfiguredFormat()): string {
  const now = dayjs();

  // Special-case: "iso" outputs a simplified ISO 8601 string (UTC, no milliseconds)
  if (userFormat === "iso") {
    return now.toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  // Pre-substitute tokens that dayjs does not support natively:
  //   w  = ISO weekday, 1 (Monday) through 7 (Sunday)
  //   W  = ISO week number of year
  //   o  = ISO week-year (same as year except at week boundaries)
  // These are replaced with their computed values before dayjs processes
  // the remaining tokens (YYYY, MM, DD, HH, mm, ss, etc.).
  const processedFormat = userFormat
    .replace(/W/g, String(now.isoWeek()))
    .replace(/w/g, String(now.isoWeekday()))
    .replace(/o/g, String(now.isoWeekYear()));

  return now.format(processedFormat);
}

function replaceEditorSelection(text: string) {
  const editor = window.activeTextEditor;
  if (editor) {
    const selections = editor.selections;

    editor.edit((editBuilder) => {
      selections.forEach((selection) => {
        editBuilder.replace(selection, "");
        editBuilder.insert(selection.active, text);
      });
    });
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
    commands.registerCommand("insertDateString.insertOwnFormatDateTime", () => {
      window
        .showInputBox({
          value: getConfiguredFormat(),
          prompt: INPUT_PROMPT,
        })
        .then((format) => {
          replaceEditorSelection(getFormattedDateString(format));
        });
    }),
  );
}
