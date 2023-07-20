import { MonoData } from './MonoData';
import { MonoMovingByAuto } from './MonoMoving';
import { MonoMovingByPlayer } from './MonoMoving';
import { MonoRotating } from './MonoRotating';
import { MonoCollision } from './MonoCollision';
import { CollisionRefControl } from './CollisionRefControl';

import { Common } from './Common';

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

    private monoRotating = new MonoRotating;

    private monoCollision = new MonoCollision;

    private monoData = new MonoData;

    private collisionRefControl = new CollisionRefControl;

    private commonCalc = new Common;

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

        this.movingMonoField = this.commonCalc.fillFieldArrayOfArray(this.movingMonoField,12);
        this.placedMonoField = this.createWallToField(
            this.commonCalc.fillFieldArrayOfArray(this.placedMonoField,12)
        );
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

        this.invokeDrawField();
    }

    private executeMonoPlacing(){
        let mono = this.monoData.decideMono();
        this.collisionRefControl.setRefDefault(this.monoCollisionRef);
        this.placeMovingMonoField(mono);
        this.monoFallingFlag = true;
        this.calculateMonoCollision(mono);
    }

    private executeMonoFalling(){
        this.movingMonoField = this.monoMovingByAuto.monoFallOneSquare(
            this.movingMonoField
        );

        this.monoCollisionRef = this.collisionRefControl.moveCollisionRefY(
            this.monoCollisionRef
        );

        if(this.monoCollision.isBottomCollision(this.placedMonoField,this.monoCollisionRef)){
            this.mergePlacedFromMoving();
            this.monoFallingFlag = false;
        }

        /*isLineOver*/
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

    private mergePlacedFromMoving(){
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
      
        const result: Field = this.commonCalc.fillFieldArrayOfArray(new Array(21),12);

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
      
    public async moveLeft(){
        if(!this.monoFallingFlag){ return; };
        this.movingMonoField = this.monoMovingByPlayer.moveLeft(
            this.movingMonoField, this.monoCollisionRef
        );

        this.monoCollisionRef = this.collisionRefControl.moveCollisionRefX(
            this.monoCollisionRef, "left"
        );
    }

    public async moveRight(){
        if(!this.monoFallingFlag){ return; };
        this.movingMonoField = this.monoMovingByPlayer.moveRight(
            this.movingMonoField, this.monoCollisionRef
        );

        this.monoCollisionRef = this.collisionRefControl.moveCollisionRefX(
            this.monoCollisionRef, "right"
        );
    }

    public async rotateLeft(){
        if(!this.monoFallingFlag){ return; };
        this.movingMonoField = this.monoRotating.rotateLeft(
            this.movingMonoField, this.monoCollisionRef
        );

        this.calculateMonoCollision();
    }

    public async rotateRight(){
        if(!this.monoFallingFlag){ return; };
        this.movingMonoField = this.monoRotating.rotateLeft(
            this.movingMonoField, this.monoCollisionRef
        );
        
        this.calculateMonoCollision();
    }

    private calculateMonoCollision(_mono?: Field){
        let mono = _mono;
        if(mono === undefined) { mono = this.fetchMonofieldFromMoving(); }
        this.monoCollisionRef.monoLowerCollision = this.monoCollision.calculateMonoLowerCollision(mono);
    }

    private fetchMonofieldFromMoving(): Field{
        let xBasis = this.monoCollisionRef.coodinate.monoBasis.x;
        let yBasis = this.monoCollisionRef.coodinate.monoBasis.y;
        let xLimit = this.monoCollisionRef.coodinate.monoLimit.x;
        let yLimit = this.monoCollisionRef.coodinate.monoLimit.y;

        let result = this.commonCalc.fillFieldArrayOfArray(new Array(4), 4);

        for (let v = yBasis; v <= yLimit; v++) {
            for (let h = xBasis; h < xLimit; h++) {
                result[v - yBasis][h - xBasis] = this.movingMonoField[v][h];
            }  
        }

        return result;
    }
}