import { MonoData } from './MonoData';
import { MonoMovingByAuto } from './MonoMoving';
import { MonoMovingByPlayer } from './MonoMoving';
import { MonoCollision } from './MonoCollision';

import * as vscode from 'vscode';

type Field = number[][];
type CollisionRef = {
    coodinate:{
        monoBasis: {
            x : number,
            y : number
        },
        monoLimit: {
            x : number,
            y : number
        }
    },
    monoLowerCollision : number[]
};

export class GameExecute{
    private monoMovingByAuto = new MonoMovingByAuto;
    private monoMovingByPlayer = new MonoMovingByPlayer;

    private monoCollision = new MonoCollision;

    private movingMonoField : Field = new Array(24).fill([]);
    private placedMonoField : Field = new Array(25).fill([]);
    private monoFallingFlag : boolean = false;

    private monoCollisionRef : CollisionRef = {
        coodinate : {
            monoBasis : {
                x : 0,
                y : 0
            },
            monoLimit : {
                x : 0,
                y : 0
            }
        },
        monoLowerCollision : new Array(4).fill(-1),
    };

    private view : vscode.WebviewView | undefined;
    constructor(_view? : vscode.WebviewView){
        this.view = _view;

        this.movingMonoField = this.fillFieldArrayOfArray(this.movingMonoField);
        this.placedMonoField = this.createWallToField(this.fillFieldArrayOfArray(this.placedMonoField));
    }

    
    /**
     * ## この関数は2次元配列を作成して返す関数です。
     * @date 2023/7/18 - 1:35:56
     *
     * @private
     * @param {Field} _arr
     * @returns {Field}
     */
    private fillFieldArrayOfArray(_arr: Field): Field{
        let result : Field = new Array(_arr.length).fill([]);
        for(let v = 0; v < _arr.length; v++){
            result[v] = new Array(12).fill(0);
        }

        result = JSON.parse(JSON.stringify(result));
        return result;
    }

    private createWallToField(_arr: Field): Field{
        let wall = [1,0,0,0,0,0,0,0,0,0,0,1];
        let surface = [1,1,1,1,1,1,1,1,1,1,1,1];
        let result : Field = new Array(_arr.length).fill([]);

        for(let v = 0; v < _arr.length; v++){
            if(v === _arr.length - 1) {
                result[v] = JSON.parse(JSON.stringify(surface));
            }
            else{
                result[v] = JSON.parse(JSON.stringify(wall));
            }

        }

        return result;
    }

    /**
     * ## このメソッドはゲーム開始からGameCoodinate.interval[ms]ごとに呼び出されます。
     * @date 2023/7/13 - 16:34:22
     *
     * @public
     */
    public main(){
        if(this.monoFallingFlag){
            this.executeMonoFalling();
        }
        else{
            this.executeMonoPlacing();
        }

        /*ここでmonoMovingByPlayerによる操作*/
            /*横移動*/
                /*isMoveRight*/
                /*isMoveLeft*/
            /*回転*/
                /*isRotating*/

        /*isCollision*/
        /*isLineOver*/


        this.invokeDrawField();
    }

    private executeMonoPlacing(){
        let mono = this.decideMono();
        this.setRefDefault();
        this.placeMovingMonoField(mono);
        this.monoFallingFlag = true;
        this.monoCollisionRef.monoLowerCollision = this.monoCollision.createMonoLowerCollision(mono);
    }

    private executeMonoFalling(){
        this.movingMonoField = this.monoMovingByAuto.monoFallOneSquare(
            this.movingMonoField
        );
        this.moveCollisionRefY();

        if(this.monoCollision.isBottomCollision(this.placedMonoField,this.monoCollisionRef)){
            this.insertPlacedFromMoving();
            this.monoFallingFlag = false;
        }
    }

    
    /**
     * ## この関数はmonoの基底Y座標を１下げる関数です。
     * @date 2023/7/20 - 1:16:49
     *
     * @private
     */
    private moveCollisionRefY(){
        this.monoCollisionRef.coodinate.monoBasis.y += 1 ;
        this.monoCollisionRef.coodinate.monoLimit.y += 1 ;
    }

    private invokeDrawField(){
        const message = {
            type: 'drawField',
            field: this.fetchFieldArray()
        };

        if(this.view){
            this.view.webview.postMessage(message);
        }
    }
    
    /**
     * この関数はmonoのmapからランダムにmonoを返す関数です。
     * @date 2023/7/13 - 13:08:25
     *
     * @private
     * @returns {Field}
     */
    private decideMono() : Field{
        let monoData = new MonoData;
        let ramdomNum : number = Math.floor(Math.random() * monoData.getMonoDataSize()) + 1;
        let monoMap = monoData.createMonoDataHashMap();
        let monoDecide = monoMap.get(ramdomNum);
        return monoDecide!!;
    }

    
    /**
     * この関数はmonoをフィールドに配置する関数です。
     * @date 2023/7/13 - 13:05:51
     *
     * @private
     * @param {Field} _mono
     * @returns {Field}
     */
    private placeMovingMonoField(_mono: Field){
        this.movingMonoField[0][5] = _mono[0][0];
        this.movingMonoField[0][6] = _mono[0][1];
        this.movingMonoField[0][7] = _mono[0][2];
        this.movingMonoField[0][8] = _mono[0][3];

        this.movingMonoField[1][5] = _mono[1][0];
        this.movingMonoField[1][6] = _mono[1][1];
        this.movingMonoField[1][7] = _mono[1][2];
        this.movingMonoField[1][8] = _mono[1][3];

        this.movingMonoField[2][5] = _mono[2][0];
        this.movingMonoField[2][6] = _mono[2][1];
        this.movingMonoField[2][7] = _mono[2][2];
        this.movingMonoField[2][8] = _mono[2][3];

        this.movingMonoField[3][5] = _mono[3][0];
        this.movingMonoField[3][6] = _mono[3][1];
        this.movingMonoField[3][7] = _mono[3][2];
        this.movingMonoField[3][8] = _mono[3][3];
    }    

    private setRefDefault(){
        this.monoCollisionRef.coodinate.monoBasis.x = 5;
        this.monoCollisionRef.coodinate.monoBasis.y = 0;
        this.monoCollisionRef.coodinate.monoLimit.x = 8;
        this.monoCollisionRef.coodinate.monoLimit.y = 3;   
    }

    private insertPlacedFromMoving(){
        for (let v = 0; v < this.placedMonoField.length; v++) {
            for (let h = 0; h < this.placedMonoField.length; h++) {
                if(this.placedMonoField[v][h] !== 0) { continue; }
                this.placedMonoField[v][h] = this.movingMonoField[v][h];
                this.movingMonoField[v][h] = 0;
            }
        }   
    }

    private fetchFieldArray(): Field {
        const movingMonoField : Field = JSON.parse(JSON.stringify(this.movingMonoField));
        const placedMonoField : Field = JSON.parse(JSON.stringify(this.placedMonoField));
      
        const result: Field = this.fillFieldArrayOfArray(new Array(21));

        for (let v = 4; v < placedMonoField.length; v++) {
            for (let h = 0; h < placedMonoField[v].length; h++) {
                if(placedMonoField[v][h] !== 0){
                    result[v - 4][h] = placedMonoField[v][h];
                }
                else if(placedMonoField[v][h] === 1){
                    result[v - 4][h] = 1;
                }
                else{
                    result[v - 4][h] = movingMonoField[v][h];
                }
            }
        }
        return result;
    }
      
    public moveLeft(){
        this.monoMovingByPlayer.moveLeft();
    }

    public moveRight(){
        this.monoMovingByPlayer.moveRight();
    }
}