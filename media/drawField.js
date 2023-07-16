//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    //const vscode = acquireVsCodeApi();

    const gameExecute = require("../src/logic/main.js");
    const gameDataFetch = new gameExecute.GameDataFetch;

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
        let field = fetchFieldDataFromMainTs();
        let table = document.querySelector('.field-tbody');

        
    }

    function fetchFieldDataFromMainTs(){
        let field = gameDataFetch.fetchFieldArray();

        return field;
    }
    
}());