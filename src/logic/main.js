"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameExecute = void 0;
const MonoData_1 = require("./MonoData");
const MonoMoving_1 = require("./MonoMoving");
class GameExecute {
    constructor() {
        this.monoMovingByAuto = new MonoMoving_1.MonoMovingByAuto;
        this.movingMonoField = new Array(24);
        this.placedMonoField = new Array(20);
        this.isMonoFalling = false;
    }
    /**
     * ## このメソッドはゲーム開始からGameCoodinate.interval[ms]ごとに呼び出されます。
     * @date 2023/7/13 - 16:34:22
     *
     * @public
     */
    main() {
        if (!this.isMonoFalling) {
            this.decideMono();
        }
        else {
            this.monoMovingByAuto.monoFallOneSquare(this.movingMonoField);
        }
        let fieldHtml = this.drawfield();
        return fieldHtml;
    }
    drawfield() {
        return "";
    }
    /**
     * この関数はmonoのmapからランダムにmonoを返す関数です。
     * @date 2023/7/13 - 13:08:25
     *
     * @private
     * @returns {Field}
     */
    decideMono() {
        let monoData = new MonoData_1.MonoData;
        let ramdomNum = Math.floor(Math.random() * Number(monoData.getMonoDataSize)) + 1;
        let monoMap = monoData.createMonoDataHashMap();
        let monoDecide = monoMap.get(ramdomNum);
        return monoDecide;
    }
    /**
     * この関数はmonoをフィールドに配置する関数です。
     * @date 2023/7/13 - 13:05:51
     *
     * @private
     * @param {Field} _mono
     * @returns {Field}
     */
    placeMovingMonoField(_mono) {
        let movingMonoField = new Array(24);
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
    }
}
exports.GameExecute = GameExecute;
//# sourceMappingURL=main.js.map