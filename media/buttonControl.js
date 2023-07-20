(function() {
    const vscode = acquireVsCodeApi();

    const rightMoveBtn = document.getElementById('moving-right-button');
    const leftMoveBtn = document.getElementById('moving-left-button');

    leftMoveBtn?.addEventListener('click', () => {
        moveLeft();
    });

    rightMoveBtn?.addEventListener('click', () => {
        moveRight();
    });

    async function moveLeft(){
        vscode.postMessage({ type: 'moveLeftByPlayer' });
    }

    async function moveRight(){
        vscode.postMessage({ type: 'moveRightByPlayer' });
    }
    

    const rightRotateBtn = document.getElementById('rotating-right-button');
    const leftRotateBtn = document.getElementById('rotating-left-button');

    leftRotateBtn?.addEventListener('click', () => {
        rotateLeft();
    });

    rightRotateBtn?.addEventListener('click', () => {
        rotateRight();
    });

    async function rotateLeft(){
        vscode.postMessage({ type: 'rotateLeftByPlayer' });
    }

    async function rotateRight(){
        vscode.postMessage({ type: 'rotateRightByPlayer' });
    }
})();