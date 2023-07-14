"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCoodinator = void 0;
const main_1 = require("./main");
class GameCoodinator {
    constructor() {
        this.timerId = undefined;
        this.interval = 1000;
    }
    /**
     * ## このメソッドはゲームをスタートするメソッドです。
     * @date 2023/7/13 - 15:55:51
     *
     * @public
     */
    startGame() {
        let mainFunc = new main_1.GameExecute;
        this.timerId = setInterval(mainFunc.main, this.interval);
    }
    /**
     * ## このメソッドはゲームを終了するメソッドです。
     * @date 2023/7/13 - 15:56:59
     *
     * @public
     */
    finishGame() {
        clearInterval(this.timerId);
    }
    /**
     * ## このメソッドはゲームをポーズするメソッドです。
     * @date 2023/7/13 - 15:57:14
     *
     * @public
     */
    pauseGame() {
    }
    /**
     * ## このメソッドはゲームを初期化するメソッドです。
     * @date 2023/7/13 - 15:57:36
     *
     * @public
     */
    resetGame() {
    }
    /**
     * ## このメソッドはゲームが強制終了するときに呼ばれるメソッドです。
     * @date 2023/7/13 - 15:57:50
     *
     * @public
     */
    stopGame() {
    }
}
exports.GameCoodinator = GameCoodinator;
//# sourceMappingURL=GameCoodinator.js.map