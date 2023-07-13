import { GameExecute } from './main';

class GameCoodinator{
    private timerId : NodeJS.Timer | undefined = undefined;
    private interval : number = 1000;

    /**
     * ## このメソッドはゲームをスタートするメソッドです。
     * @date 2023/7/13 - 15:55:51
     *
     * @public
     */
    public gameStart() {
        let mainFunc = new GameExecute;
        this.timerId = setInterval(mainFunc.main, this.interval);
    }
    
    /**
     * ## このメソッドはゲームを終了するメソッドです。
     * @date 2023/7/13 - 15:56:59
     *
     * @public
     */
    public gameFinish() {
        clearInterval(this.timerId);
    }

    
    /**
     * ## このメソッドはゲームをポーズするメソッドです。
     * @date 2023/7/13 - 15:57:14
     *
     * @public
     */
    public gamePause() {
        
    }

    
    /**
     * ## このメソッドはゲームを初期化するメソッドです。
     * @date 2023/7/13 - 15:57:36
     *
     * @public
     */
    public gameReset() {
        
    }

    
    /**
     * ## このメソッドはゲームが強制終了するときに呼ばれるメソッドです。
     * @date 2023/7/13 - 15:57:50
     *
     * @public
     */
    public gameEmergencyStop() {
        
    }
}