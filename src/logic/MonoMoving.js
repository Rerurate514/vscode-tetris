"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoMovingByPlayer = exports.MonoMovingByAuto = void 0;
var vscode = require("vscode");
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
        vscode.window.showInformationMessage("invoked : monoFallOneSquare");
        var result = __spreadArray([], _movingMonoField, true);
        for (var vertical = 0; result.length - 1 < vertical; vertical++) {
            result[vertical + 1] = result[vertical];
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
    return MonoMovingByPlayer;
}());
exports.MonoMovingByPlayer = MonoMovingByPlayer;
