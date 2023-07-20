"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoMovingByPlayer = exports.MonoMovingByAuto = void 0;
var MonoMovingByAuto = /** @class */ (function () {
    function MonoMovingByAuto() {
    }
    /**
     * ## この関数はフィールド上にあるmonoを１マス下げる関数です。
     * > recommend - var movingField
     * @date 2023/7/12 - 23:38:22
     *
     * @public
     * @param {Field} _movingMonoField
     */
    MonoMovingByAuto.prototype.monoFallOneSquare = function (_movingMonoField) {
        var result = JSON.parse(JSON.stringify(_movingMonoField));
        for (var v = result.length - 1; v >= 1; v--) {
            result[v] = result[v - 1];
            result[v - 1] = new Array(12).fill(0);
        }
        return result;
    };
    return MonoMovingByAuto;
}());
exports.MonoMovingByAuto = MonoMovingByAuto;
/**
 * Description placeholder
 * @date 2023/7/13 - 15:52:20
 *
 * @export
 * @class MonoMovingByPlayer
 * @typedef {MonoMovingByPlayer}
 */
var MonoMovingByPlayer = /** @class */ (function () {
    function MonoMovingByPlayer() {
    }
    MonoMovingByPlayer.prototype.moveLeft = function () {
    };
    MonoMovingByPlayer.prototype.moveRight = function () {
    };
    return MonoMovingByPlayer;
}());
exports.MonoMovingByPlayer = MonoMovingByPlayer;
