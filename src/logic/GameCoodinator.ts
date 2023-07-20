import { GameExecute } from './main';

import * as vscode from 'vscode';

export class GameCoodinator{
    private mainTimerId : NodeJS.Timer | undefined = undefined;
    private calcInterval : number = 1000;

    private drawTimerId : NodeJS.Timer | undefined = undefined;
    private drawInterval : number = 50;

    private mainFunc : GameExecute | undefined = undefined;

    private view : vscode.WebviewView;
    constructor(_view : vscode.WebviewView){
        this.view = _view;
        this.mainFunc = new GameExecute(this.view);
    }

    /**
     * ## このメソッドはゲームをスタートするメソッドです。
     * @date 2023/7/13 - 15:55:51
     *
     * @public
     */
    public startGame() {
        this.mainTimerId = setInterval(
            () => this.mainFunc!!.main(), this.calcInterval
        );

        this.drawTimerId = setInterval(
            () => this.mainFunc!!.invokeDrawField(), this.calcInterval
        );
    }

    /**
     * ## このメソッドはゲームを終了するメソッドです。
     * @date 2023/7/13 - 15:56:59
     *
     * @public
     */
    public finishGame() {
        clearInterval(this.mainTimerId);
        clearInterval(this.drawTimerId);
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

    public controlMovingByPlayer(_control: string){
        switch(_control){
            case 'moveLeft':
            {
                this.mainFunc!!.moveLeft();
                break;
            }
            case 'moveRight':
            {
                this.mainFunc!!.moveRight();
                break;
            }
        }
    }

    public controlRotating(_control: string){
        switch(_control){
            case 'rotateLeft':
            {
                this.mainFunc!!.rotateLeft();
                break;
            }
            case 'rotateRight':
            {
                this.mainFunc!!.rotateRight();
                break;
            }
        }
    }
}