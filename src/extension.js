require('date-format-lite');

const vscode = require('vscode');

const INPUT_PROMPT = 'Date and Time format';

function getConfiguredFormat() {
  return vscode.workspace.getConfiguration('insertdatestring').get('format');
}

function getFormattedDateString(userFormat = getConfiguredFormat()) {
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
    vscode.commands.registerCommand('insertdatestring.insertdatetime', () => {
      replaceEditorSelection(getFormattedDateString());
    }),
    vscode.commands.registerCommand('insertdatestring.inserttimestamp', () => {
      replaceEditorSelection((new Date()).getTime().toString());
    }),
    vscode.commands.registerCommand('insertdatestring.insertownformatdatetime', () => {
      vscode.window.showInputBox({
        value: getConfiguredFormat(),
        prompt: INPUT_PROMPT,
      }).then((format) => {
        replaceEditorSelection(getFormattedDateString(format));
      });
    }),
  ];

  context.subscriptions.push(...commands);
};

exports.deactivate = function deactivate() {};
