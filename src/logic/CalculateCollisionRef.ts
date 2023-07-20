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

export class CalculateCollisionRef{
    public sumWithCheckEmptyCollision(_y : number, _lowerCollision : number) : number{
        if(_lowerCollision === -1) { return -1; }
        return _y + _lowerCollision;
    }

    
    /**
     * ## この関数はCollisionRefから、
     * ## 衝突判定座標を算出する関数です。
     * @date 2023/7/21 - 4:55:49
     *
     * @public
     * @param {CollisionRef} _collisionRef
     * @returns {number[]}
     */
    public culculateBottomCollision(_collisionRef: CollisionRef): number[]{
        return[
            this.sumWithCheckEmptyCollision(
                _collisionRef.coodinate.monoBasis.y, _collisionRef.monoLowerCollision[0]
                ),
            this.sumWithCheckEmptyCollision(
                _collisionRef.coodinate.monoBasis.y, _collisionRef.monoLowerCollision[1]
            ),
            this.sumWithCheckEmptyCollision(
                _collisionRef.coodinate.monoBasis.y, _collisionRef.monoLowerCollision[2]
            ),
            this.sumWithCheckEmptyCollision(
                _collisionRef.coodinate.monoBasis.y, _collisionRef.monoLowerCollision[3]
            )
        ];
    }
}