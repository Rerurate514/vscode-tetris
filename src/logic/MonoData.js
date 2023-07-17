"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoData = void 0;
/**
 * # mono data class
 * > O, T, mS, S, mL, L, I : mono
 * >monoの格納配列は4*4の16マスです。
 *
 * @date 2023/7/12 - 23:17:08
 *
 * @class MonoData
 * @typedef {MonoData}
 */
var MonoData = /** @class */ (function () {
    function MonoData() {
        this.mono = {
            O_MONO: [
                [0, 0, 0, 0],
                [0, 2, 2, 0],
                [0, 2, 2, 0],
                [0, 0, 0, 0]
            ],
            T_MONO: [
                [0, 0, 0, 0],
                [0, 3, 0, 0],
                [3, 3, 3, 0],
                [0, 0, 0, 0]
            ],
            S_MONO: [
                [0, 4, 0, 0],
                [0, 4, 4, 0],
                [0, 0, 4, 0],
                [0, 0, 0, 0]
            ],
            MIRROR_S_MONO: [
                [0, 0, 5, 0],
                [0, 5, 5, 0],
                [0, 5, 0, 0],
                [0, 0, 0, 0]
            ],
            L_MONO: [
                [0, 6, 0, 0],
                [0, 6, 0, 0],
                [0, 6, 6, 0],
                [0, 0, 0, 0]
            ],
            MIRROR_L_MONO: [
                [0, 0, 7, 0],
                [0, 0, 7, 0],
                [0, 7, 7, 0],
                [0, 0, 0, 0]
            ],
            I_MONO: [
                [0, 8, 0, 0],
                [0, 8, 0, 0],
                [0, 8, 0, 0],
                [0, 8, 0, 0]
            ]
        };
    }
    /**
     * ## この関数は登録されているmonoの個数を返す関数です。
     * @date 2023/7/13 - 12:54:42
     *
     * @public
     * @returns {number}
     */
    MonoData.prototype.getMonoDataSize = function () {
        return Object.keys(this.mono).length;
    };
    /**
     * ## この関数はmonoをmapにして返す関数です。
     * > keyは1~からのnumber型です。
     * @date 2023/7/13 - 12:49:35
     *
     * @public
     * @returns {Map<number, Field>}
     */
    MonoData.prototype.createMonoDataHashMap = function () {
        var result = new Map();
        var keys = Object.keys(this.mono);
        var cnt = 1;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = this.mono[key];
            result.set(cnt, value);
            cnt++;
        }
        return result;
    };
    return MonoData;
}());
exports.MonoData = MonoData;
