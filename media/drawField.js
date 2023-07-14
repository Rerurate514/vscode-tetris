//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    const vscode = acquireVsCodeApi();

    const GameExecute = require("../src/logic/main");

    document.querySelector('.add-color-button').addEventListener('click', () => {
        addColor();
    });

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'drawField':
                {
                    drawField();
                    break;
                }

        }
    });

    async function drawField(){

    }

    function fetchFieldDataFromMainTs(){
        let 
    }
    
}());