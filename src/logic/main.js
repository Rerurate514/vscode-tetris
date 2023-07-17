"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDataFetch = exports.GameExecute = void 0;
var MonoData_1 = require("./MonoData");
var MonoMoving_1 = require("./MonoMoving");
var vscode = require("vscode");
var GameExecute = /** @class */ (function () {
    function GameExecute(_view) {
        this.monoMovingByAuto = new MonoMoving_1.MonoMovingByAuto;
        this.movingMonoField = new Array(24);
        this.placedMonoField = new Array(20);
        this.isMonoFalling = false;
        this.view = _view;
    }
    GameExecute.prototype.getMovingMonoField = function () { return this.movingMonoField; };
    GameExecute.prototype.getPlacedMonoField = function () { return this.placedMonoField; };
    /**
     * ## このメソッドはゲーム開始からGameCoodinate.interval[ms]ごとに呼び出されます。
     * @date 2023/7/13 - 16:34:22
     *
     * @public
     */
    GameExecute.prototype.main = function () {
        /*if(!this.isMonoFalling){
            let mono = this.decideMono;
        }
        else{
            this.monoMovingByAuto.monoFallOneSquare(
                this.movingMonoField
            );
        }*/
        this.invokeDrawField();
    };
    GameExecute.prototype.invokeDrawField = function () {
        if (this.view) {
            vscode.window.showInformationMessage("invoked : drawField in main.ts func in this.view = true");
            this.view.webview.postMessage({ type: 'drawField' });
        }
    };
    /**
     * この関数はmonoのmapからランダムにmonoを返す関数です。
     * @date 2023/7/13 - 13:08:25
     *
     * @private
     * @returns {Field}
     */
    GameExecute.prototype.decideMono = function () {
        vscode.window.showInformationMessage("invoked : decideMono");
        var monoData = new MonoData_1.MonoData;
        var ramdomNum = Math.floor(Math.random() * monoData.getMonoDataSize()) + 1;
        var monoMap = monoData.createMonoDataHashMap();
        var monoDecide = monoMap.get(ramdomNum);
        return monoDecide;
    };
    /**
     * この関数はmonoをフィールドに配置する関数です。
     * @date 2023/7/13 - 13:05:51
     *
     * @private
     * @param {Field} _mono
     * @returns {Field}
     */
    GameExecute.prototype.placeMovingMonoField = function (_mono) {
        var movingMonoField = new Array(24);
        movingMonoField[0][3] = _mono[0][0];
        movingMonoField[0][4] = _mono[0][1];
        movingMonoField[0][5] = _mono[0][2];
        movingMonoField[0][6] = _mono[0][3];
        movingMonoField[1][3] = _mono[1][0];
        movingMonoField[1][4] = _mono[1][1];
        movingMonoField[1][5] = _mono[1][2];
        movingMonoField[1][6] = _mono[1][3];
        movingMonoField[2][3] = _mono[2][0];
        movingMonoField[2][4] = _mono[2][1];
        movingMonoField[2][5] = _mono[2][2];
        movingMonoField[2][6] = _mono[2][3];
        movingMonoField[3][3] = _mono[3][0];
        movingMonoField[3][4] = _mono[3][1];
        movingMonoField[3][5] = _mono[3][2];
        movingMonoField[3][6] = _mono[3][3];
        return movingMonoField;
    };
    return GameExecute;
}());
exports.GameExecute = GameExecute;
var GameDataFetch = /** @class */ (function () {
    function GameDataFetch() {
        this.gameExecute = new GameExecute;
    }
    GameDataFetch.prototype.fetchFieldArray = function () {
        var movingMonoField = structuredClone(this.gameExecute.getMovingMonoField());
        var placedMonoField = structuredClone(this.gameExecute.getPlacedMonoField());
        var result = new Array(24);
        for (var vertical = 0; vertical > result.length; vertical++) {
            for (var horizontal = 0; horizontal > result[vertical].length; horizontal++) {
                if (placedMonoField[vertical][horizontal] !== 0) {
                    result[vertical][horizontal] = placedMonoField[vertical][horizontal];
                    continue;
                }
                result[vertical][horizontal] = movingMonoField[vertical][horizontal];
            }
        }
        return result;
    };
    GameDataFetch.prototype.teseta = function () {
        vscode.window.showInformationMessage("invoked : drawField");
    };
    return GameDataFetch;
}());
exports.GameDataFetch = GameDataFetch;
