(function() {
    const rightBtn = document.getElementById('moving-right-button');
    const leftBtn = document.getElementById('moving-left-button');

    leftBtn?.addEventListener('click', () => {
        moveLeft();
    });

    rightBtn?.addEventListener('click', () => {
        moveRight();
    });

    async function moveLeft(){
        console.log("move left");
        monoMovingByPlayer.moveLeft();
    }

    async function moveRight(){
        console.log("move right");
        monoMovingByPlayer.moveRight();
    }
})();