require('date-format-lite');

const vscode = require('vscode');

exports.activate = function activate(context) {
  const disposable = vscode.commands.registerCommand('extension.insertdatestring', () => {
    const editor = vscode.window.activeTextEditor;
    const selections = editor.selections;

    editor.edit((editBuilder) => {
      const userFormat = vscode.workspace.getConfiguration('insertdatestring').get('format');
      const date = (new Date()).format(userFormat);

      selections.forEach((selection) => {
        editBuilder.replace(selection, '');
        editBuilder.insert(selection.active, date);
      });
    });
  });

  context.subscriptions.push(disposable);
};

exports.deactivate = function deactivate() {};
