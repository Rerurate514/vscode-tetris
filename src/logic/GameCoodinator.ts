import { GameExecute } from './main';

import * as vscode from 'vscode';

export class GameCoodinator{
    private timerId : NodeJS.Timer | undefined = undefined;
    private interval : number = 1000;

    /**
     * ## このメソッドはゲームをスタートするメソッドです。
     * @date 2023/7/13 - 15:55:51
     *
     * @param {vscode.WebviewView} _view **描画するwebViewのUriを引数とします。**
     * @public
     */
    public startGame(_view: vscode.WebviewView) {
        let mainFunc = new GameExecute;
        mainFunc.setWebViewUri(_view);
        this.timerId = setInterval(mainFunc.main, this.interval);
    }
    
    /**
     * ## このメソッドはゲームを終了するメソッドです。
     * @date 2023/7/13 - 15:56:59
     *
     * @public
     */
    public finishGame() {
        clearInterval(this.timerId);
    }

    
    /**
     * ## このメソッドはゲームをポーズするメソッドです。
     * @date 2023/7/13 - 15:57:14
     *
     * @public
     */
    public pauseGame() {
        
    }

    
    /**
     * ## このメソッドはゲームを初期化するメソッドです。
     * @date 2023/7/13 - 15:57:36
     *
     * @public
     */
    public resetGame() {
        
    }

    
    /**
     * ## このメソッドはゲームが強制終了するときに呼ばれるメソッドです。
     * @date 2023/7/13 - 15:57:50
     *
     * @public
     */
    public stopGame() {
        
    }
}