const vscode = require("vscode");

class ConsoleTronClear {
  async clearAll() {
    const editor = vscode.window.activeTextEditor;

    const linesToClear = this.getLinesToClear(editor);

    this.performClear(editor, linesToClear);
    vscode.window.showInformationMessage(`${linesToClear.length} cleared!`);
  }

  getLinesToClear(editor) {
    if (!editor) {
      vscode.window.showErrorMessage(
        "You need to open the text editor first, coder!"
      );
      return;
    }

    const regex = /(console.tron.log\(\)|console.tron.log\(.+\));/;

    let endOfFile = false;
    let iteratedLine = 0;
    const documentLines = [];
    const linesToClear = [];

    while (!endOfFile) {
      try {
        const line = editor.document.lineAt(iteratedLine);
        iteratedLine++;
        documentLines.push(line);
      } catch {
        endOfFile = true;
      }
    }

    for (let i = 0; i < documentLines.length; i++) {
      const line = documentLines[i];
      if (regex.test(line.text)) {
        linesToClear.push(line);
      }
    }
    return linesToClear;
  }

  performClear(editor, linesToClear) {
    editor.edit(editBuilder => {
      linesToClear.map(line => {
        editBuilder.delete(line.range);
      });
    });
  }
}

module.exports = ConsoleTronClear;
