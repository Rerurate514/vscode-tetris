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

export class CollisionRefControl{ 
    
    /**
     * ## この関数は、collisionRefにデフォルトの座標を代入する関数です。
     * @date 2023/7/21 - 5:32:06
     *
     * @public
     * @param {CollisionRef} _collisionRef
     * @returns {CollisionRef}
     */
    public setRefDefault(_collisionRef: CollisionRef): CollisionRef{
        let result = _collisionRef;

        result.coodinate.monoBasis.x = 5;
        result.coodinate.monoBasis.y = 0;
        result.coodinate.monoLimit.x = 8;
        result.coodinate.monoLimit.y = 3;   

        return result;
    }

    /**
     * ## この関数はmonoの基底Y座標を１下げる関数です。
     * @date 2023/7/20 - 1:16:49
     *
     * @private
     */
    public moveCollisionRefY(_collisionRef: CollisionRef): CollisionRef{
        let result = _collisionRef;

        result.coodinate.monoBasis.y += 1 ;
        result.coodinate.monoLimit.y += 1 ;

        return result;
    }

    
    /**
     * ## この関数はmonoの基底X座標を変更する関数です。
     * @date 2023/7/21 - 5:27:29
     *
     * @public
     * @param {CollisionRef} _collisionRef
     * @param {string} _directional **"left"** or **"right"**
     * @returns {CollisionRef}
     */
    public moveCollisionRefX(_collisionRef: CollisionRef, _directional: string): CollisionRef{
        let result = _collisionRef;

        if(_directional === 'right'){
            result.coodinate.monoBasis.x += 1;
            result.coodinate.monoLimit.x += 1;
        }
        if(_directional === 'left'){
            result.coodinate.monoBasis.x -= 1;
            result.coodinate.monoLimit.x -= 1;
        }

        return result;
    }
}