import { MonoData } from './MonoData';
import { MonoMovingByAuto } from './MonoMoving';
import { MonoMovingByPlayer } from './MonoMoving';

import * as vscode from 'vscode';

type Field = number[][];
export class GameExecute{
    private monoMovingByAuto = new MonoMovingByAuto;

    private movingMonoField : Field = new Array(24).fill([]);
    private placedMonoField : Field = new Array(20).fill([]);
    private isMonoFalling : boolean = false;

    private view : vscode.WebviewView | undefined;
    constructor(_view? : vscode.WebviewView){
        this.view = _view;

        this.movingMonoField = this.fillFieldArrayOfArray(this.movingMonoField);
        this.placedMonoField = this.fillFieldArrayOfArray(this.placedMonoField);
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
            result[v] = new Array(10).fill(0);
        }

        result = JSON.parse(JSON.stringify(result));
        return result;
    }

    /**
     * ## このメソッドはゲーム開始からGameCoodinate.interval[ms]ごとに呼び出されます。
     * @date 2023/7/13 - 16:34:22
     *
     * @public
     */
    public main(){
        if(!this.isMonoFalling){
            let mono = this.decideMono();
            this.placeMovingMonoField(mono);
            this.isMonoFalling = true;
        }
        else{
            this.movingMonoField = this.monoMovingByAuto.monoFallOneSquare(
                this.movingMonoField
            );
        }
    
        this.invokeDrawField();
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
        vscode.window.showInformationMessage("invoked : decideMono");
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
        this.movingMonoField[0][3] = _mono[0][0];
        this.movingMonoField[0][4] = _mono[0][1];
        this.movingMonoField[0][5] = _mono[0][2];
        this.movingMonoField[0][6] = _mono[0][3];

        this.movingMonoField[1][3] = _mono[1][0];
        this.movingMonoField[1][4] = _mono[1][1];
        this.movingMonoField[1][5] = _mono[1][2];
        this.movingMonoField[1][6] = _mono[1][3];

        this.movingMonoField[2][3] = _mono[2][0];
        this.movingMonoField[2][4] = _mono[2][1];
        this.movingMonoField[2][5] = _mono[2][2];
        this.movingMonoField[2][6] = _mono[2][3];

        this.movingMonoField[3][3] = _mono[3][0];
        this.movingMonoField[3][4] = _mono[3][1];
        this.movingMonoField[3][5] = _mono[3][2];
        this.movingMonoField[3][6] = _mono[3][3];
    }    

    private fetchFieldArray(): Field {
        const movingMonoField : Field = JSON.parse(JSON.stringify(this.movingMonoField));
        const placedMonoField : Field = JSON.parse(JSON.stringify(this.placedMonoField));
      
        const result: Field = this.fillFieldArrayOfArray(new Array(20));
      
        for (let v = 0; v < result.length; v++) {
            for (let h = 0; h < result[v].length; h++) {
                if(placedMonoField[v][h] !== 0){
                    result[v][h] = placedMonoField[v][h];
                }
                else{
                    result[v][h] = movingMonoField[v + 4][h];
                }
            }
        }
      
        return result;
    }
      
}
