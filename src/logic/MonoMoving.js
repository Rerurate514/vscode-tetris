"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoMovingByPlayer = exports.MonoMovingByAuto = void 0;
class MonoMovingByAuto {
    /**
     * ## この関数はフィールド上にあるmonoを１マス下げる関数です。
     * > recommend - var movingField
     * @date 2023/7/12 - 23:38:22
     *
     * @public
     * @param {Field} _movingMonoField
     */
    monoFallOneSquare(_movingMonoField) {
        let result = [..._movingMonoField];
        for (let vertical = 0; result.length - 1 < vertical; vertical++) {
            result[vertical + 1] = result[vertical];
        }
        return result;
    }
}
exports.MonoMovingByAuto = MonoMovingByAuto;
/**
 * Description placeholder
 * @date 2023/7/13 - 15:52:20
 *
 * @export
 * @class MonoMovingByPlayer
 * @typedef {MonoMovingByPlayer}
 */
class MonoMovingByPlayer {
}
exports.MonoMovingByPlayer = MonoMovingByPlayer;
//# sourceMappingURL=MonoMoving.js.map