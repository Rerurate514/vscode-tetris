import { GameExecute } from './main';

import * as vscode from 'vscode';

export class GameCoodinator{
    private timerId : NodeJS.Timer | undefined = undefined;
    private interval : number = 1000;

    private view : vscode.WebviewView;
    constructor(_view : vscode.WebviewView){
        this.view = _view;
    }

    /**
     * ## このメソッドはゲームをスタートするメソッドです。
     * @date 2023/7/13 - 15:55:51
     *
     * @public
     */
    public startGame() {
        let mainFunc = new GameExecute(this.view);
        this.timerId = setInterval(() => mainFunc.main(), this.interval);
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