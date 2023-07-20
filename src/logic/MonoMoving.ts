import * as vscode from 'vscode';

type Field = number[][];
export class MonoMovingByAuto{
    /**
     * ## この関数はフィールド上にあるmonoを１マス下げる関数です。
     * > recommend - var movingField
     * @date 2023/7/12 - 23:38:22
     *
     * @public
     * @param {Field} _movingMonoField
     */
    public monoFallOneSquare(_movingMonoField : Field) : Field {
        let result : Field = JSON.parse(JSON.stringify(_movingMonoField));

        for(let v = result.length - 1; v >= 1; v--){
            result[v] = result[v - 1];
            result[v - 1] = new Array(12).fill(0);
        }

        return result;
    }
}


/**
 * Description placeholder
 * @date 2023/7/13 - 15:52:20
 *
 * @export
 * @class MonoMovingByPlayer
 * @typedef {MonoMovingByPlayer}
 */
export class MonoMovingByPlayer{
    public moveLeft(){
        vscode.window.showInformationMessage("invoked : move Left");
    }

    public moveRight(){
        vscode.window.showInformationMessage("invoked : move Right");
    }
}