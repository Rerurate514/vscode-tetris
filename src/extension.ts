// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GameCoodinator } from './logic/GameCoodinator';

export function activate(context: vscode.ExtensionContext) {

	const provider = new FieldViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(FiledViewProvider.viewType, provider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.addColor', () => {
			provider.addColor();
		})
	);n

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.clearColors', () => {
			provider.clearColors();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-tetris.startGame', () => {
			provider.startGame();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-tetris.finishGame', () => {
			provider.finishGame();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-tetris.pauseGame', () => {
			provider.pauseGame();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-tetris.resetGame', () => {
			provider.resetGame();
		})
	);
}

class FieldViewProvider implements vscode.WebviewViewProvider {

	//public static readonly viewType = 'calicoColors.colorsView';
	public static readonly viewType = 'vscode-tetris.fieldView';

	private _view?: vscode.WebviewView;

	private gameCoodnator = new GameCoodinator;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
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

	public addColor() {
		if (this._view) {
			this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
			this._view.webview.postMessage({ type: 'addColor' });
		}
	}

	public clearColors() {
		if (this._view) {
			this._view.webview.postMessage({ type: 'clearColors' });
		}
	}

	public startGame(){
		this.gameCoodnator.startGame();
	}

	public finishGame(){
		this.gameCoodnator.finishGame();
	}

	public pauseGame(){
		this.gameCoodnator.pauseGame();
	}

	public resetGame(){
		this.gameCoodnator.resetGame();
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));

		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

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
								<tbody class="field">
									
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