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
        let result : Field = [..._movingMonoField];

        for(let vertical = 0; result.length - 1 < vertical; vertical++){
            result[vertical + 1] = result[vertical];
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

}