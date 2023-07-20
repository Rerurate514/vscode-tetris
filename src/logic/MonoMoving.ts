import { CalculateCollisionRef } from "./CalculateCollisionRef";

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
    private calulateCollisionRef = new CalculateCollisionRef;

    public moveLeft(_movingMonoField: Field, _collisionRef: CollisionRef): Field{
        let xBasis = _collisionRef.coodinate.monoBasis.x;
        let yBasis = _collisionRef.coodinate.monoBasis.y;
        let xLimit = _collisionRef.coodinate.monoLimit.x;
        let yLimit = _collisionRef.coodinate.monoLimit.y;

        let result = JSON.parse(JSON.stringify(_movingMonoField));

        /*isLeftCollision*/

        for (let v = yBasis; v <= yLimit; v++) {
            for (let h = xBasis; h <= xLimit; h++) {
                result[v][h - 1] = result[v][h];
                result[v][h] = 0; 
            }
        }  

        return result;
    }

    public moveRight(_movingMonoField: Field, _collisionRef: CollisionRef): Field{
        let xBasis = _collisionRef.coodinate.monoBasis.x;
        let yBasis = _collisionRef.coodinate.monoBasis.y;
        let xLimit = _collisionRef.coodinate.monoLimit.x;
        let yLimit = _collisionRef.coodinate.monoLimit.y;

        let result = JSON.parse(JSON.stringify(_movingMonoField));

        /*isLeftCollision*/

        for (let v = yBasis; v <= yLimit; v++) {
            for (let h = xLimit; h >= xBasis; h--) {
                result[v][h + 1] = result[v][h];
                result[v][h] = 0; 
            }
        }  

        return result;
    }
}