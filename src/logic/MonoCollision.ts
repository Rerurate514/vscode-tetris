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
export class MonoCollision{
    
    /**
     * ## この関数はmonoの衝突判定を出す関数です。
     * @date 2023/7/18 - 15:37:31
     *
     * @public
     * @param {Field} _movingMonoField
     * @param {Field} _placedMonoField
     * @param {CollisionRef} _collisionRefY
     * @returns {boolean}
     */
    public isBottomCollision(
        _placedMonoField : Field,
        _collisionRef: CollisionRef
        ) : boolean{

        let basis = {
            x : _collisionRef.coodinate.monoBasis.x,
            y : _collisionRef.coodinate.monoBasis.y,
        };

        let limit = {
            x : _collisionRef.coodinate.monoLimit.x,
            y : _collisionRef.coodinate.monoLimit.y,
        };
            
        

        return false;
    }

    public createMonoLowerCollision(_mono : Field): number[]{
        let monoLowerCollision = new Array(4).fill(-1);
    
        for (let v = 1; v < _mono.length + 1; v++) {
            for (let h = 0; h < _mono.length; h++) {
                if(_mono[v - 1][h] !== 0){
                    monoLowerCollision[h] = v;
                }
            }
        }  
    
        return monoLowerCollision;
    }
}