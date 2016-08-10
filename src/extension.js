require('date-format-lite');

const vscode = require('vscode');

function getFormattedDateString() {
  const userFormat = vscode.workspace.getConfiguration('insertdatestring').get('format');
  return (new Date()).format(userFormat);
}

function replaceEditorSelection(text) {
  const editor = vscode.window.activeTextEditor;
  const selections = editor.selections;

  editor.edit((editBuilder) => {
    selections.forEach((selection) => {
      editBuilder.replace(selection, '');
      editBuilder.insert(selection.active, text);
    });
  });
}

exports.activate = function activate(context) {
  const commands = [
    vscode.commands.registerCommand('extension.insertdatestring', () => {
      replaceEditorSelection(getFormattedDateString());
    }),
  ];

  context.subscriptions.push(...commands);
};

exports.deactivate = function deactivate() {};
