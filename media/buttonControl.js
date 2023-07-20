(function() {
    const vscode = acquireVsCodeApi();

    const rightBtn = document.getElementById('moving-right-button');
    const leftBtn = document.getElementById('moving-left-button');

    leftBtn?.addEventListener('click', () => {
        moveLeft();
    });

    rightBtn?.addEventListener('click', () => {
        moveRight();
    });

    async function moveLeft(){
        vscode.postMessage({ type: 'moveLeftByPlayer' });
    }

    async function moveRight(){
        vscode.postMessage({ type: 'moveRightByPlayer' });
    }
})();