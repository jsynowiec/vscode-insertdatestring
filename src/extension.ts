import { commands, workspace, window, ExtensionContext } from "vscode";

import "date-format-lite";

const INPUT_PROMPT = "Date and Time format";
const DEFAULT_FORMAT = "YYYY-MM-DD hh:mm:ss";

function getConfiguredFormat(format = "format"): string {
  const insertDateStringConfiguration = workspace.getConfiguration(
    "insertDateString"
  );
  return insertDateStringConfiguration.get(format, DEFAULT_FORMAT);
}

function getFormattedDateString(userFormat = getConfiguredFormat()): string {
  const now = new Date();
  return now.format(userFormat);
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
  // User-facing commands (exposed in contributions)
  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDateTime", () =>
      replaceEditorSelection(getFormattedDateString())
    )
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertDate", () =>
      replaceEditorSelection(
        getFormattedDateString(getConfiguredFormat("formatDate"))
      )
    )
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTime", () =>
      replaceEditorSelection(
        getFormattedDateString(getConfiguredFormat("formatTime"))
      )
    )
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertTimestamp", () =>
      replaceEditorSelection(new Date().getTime().toString())
    )
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.insertOwnFormatDateTime", async () => {
      const format = await window.showInputBox({
        value: getConfiguredFormat(),
        prompt: INPUT_PROMPT,
      });

      if (format != null) {
        replaceEditorSelection(getFormattedDateString(format));
      }
    })
  );

  // Can be used in task inputs and other variable substitutions
  context.subscriptions.push(
    commands.registerCommand("insertDateString.getDateTime", () => {
      return getFormattedDateString();
    })
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.getDate", () => {
      return getFormattedDateString(getConfiguredFormat("formatDate"));
    })
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.getTime", () => {
      return getFormattedDateString(getConfiguredFormat("formatTime"));
    })
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.getTimestamp", () => {
      return new Date().getTime().toString();
    })
  );

  context.subscriptions.push(
    commands.registerCommand("insertDateString.getOwnFormatDateTime", async format => {
      if (format != null) {
        return getFormattedDateString(format);
      } else {
        const format = await window.showInputBox({
          value: getConfiguredFormat(),
          prompt: INPUT_PROMPT,
        });

        if (format != null) {
          return getFormattedDateString(format);
        } else {
          return undefined;
        }
      }
    })
  );
}
