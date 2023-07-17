//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    //const vscode = acquireVsCodeApi();

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'drawField':
                {
                    drawField(message.field);
                    break;
                }

        }
    });

    async function drawField(_field){
        let field = _field;
        let table = document.querySelector('.field-table');
        let beforeTbody = document.querySelector('#field-tbody');
    
        table?.removeChild(/** @type {Element} */ (beforeTbody));
    
        let tbody = document.createElement("tbody");
        tbody.id = "field-tbody";
    
        table?.appendChild(tbody);

        for(let v = 0; v < field.length; v++){
            const tr = document.createElement("tr");
            tr.className= `row-num-${v}`;
            tbody.appendChild(tr);
            for(let h = 0; h < field[v].length; h++){
                const td = document.createElement("td");
                td.className = `num-${field[v][h]}-mono`;
                tr.appendChild(td);
            }
        }
    }
}());