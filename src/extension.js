"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const GameCoodinator_1 = require("./logic/GameCoodinator");
function activate(context) {
    const provider = new FieldViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(FieldViewProvider.viewType, provider));
    context.subscriptions.push(vscode.commands.registerCommand('calicoColors.addColor', () => {
        vscode.window.showInformationMessage("invoked afddd color a");
        provider.addColor();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('calicoColors.clearColors', () => {
        vscode.window.showInformationMessage("invoked clear color fn");
        provider.clearColors();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-tetris.startGame', () => {
        provider.startGame();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-tetris.finishGame', () => {
        provider.finishGame();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-tetris.pauseGame', () => {
        provider.pauseGame();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-tetris.resetGame', () => {
        provider.resetGame();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('a', () => {
        vscode.window.showInformationMessage("aaa");
    }));
}
exports.activate = activate;
class FieldViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
        this.gameCoodnator = new GameCoodinator_1.GameCoodinator;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'colorSelected':
                    {
                        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
                        break;
                    }
            }
        });
    }
    addColor() {
        if (this._view) {
            this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
            this._view.webview.postMessage({ type: 'addColor' });
        }
    }
    clearColors() {
        if (this._view) {
            this._view.webview.postMessage({ type: 'clearColors' });
        }
    }
    startGame() {
        this.gameCoodnator.startGame();
    }
    finishGame() {
        this.gameCoodnator.finishGame();
    }
    pauseGame() {
        this.gameCoodnator.pauseGame();
    }
    resetGame() {
        this.gameCoodnator.resetGame();
    }
    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
        let fieldHtml = "";
        // Use a nonce to only allow a specific script to be run.
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleMainUri}" rel="stylesheet">

				<title>tetris</title>
			</head>
			<body>
				<div class="all-container">
					<div class="field-container"> 
						<div class="field">
							<table class="field-table">
								<tbody class="field-tbody">
									${fieldHtml}
								</tbody>
							</table>
						</div>
					</div>
					<div class="button-group-container">
						<div class="moving-button-group">
							<button class="moving-button">←</button>
							<button class="moving-button">→</button>
						</div>
						<div class="rotating-button-group">
			
						</div>
					</div>
				</div>
			</body>
			</html>`;
    }
}
//public static readonly viewType = 'calicoColors.colorsView';
FieldViewProvider.viewType = 'vscode-tetris.fieldView';
// <body>
// 	<ul class="color-list">
// 	</ul>
// 	<button class="add-color-button">Add Color</button>
// 	<script nonce="${nonce}" src="${scriptUri}"></script>
// </body>
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=extension.js.map