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

        let collissionCoodinate = [
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
            ),
        ];

        let xBasis = _collisionRef.coodinate.monoBasis.x;
           
        for(let h = 0; h <= 3; h++){
            console.log(collissionCoodinate[h] + " ::: " + xBasis);
            if(collissionCoodinate[h] === -1) { continue; }
            console.log(_placedMonoField[collissionCoodinate[h]][xBasis + h]);
            if(_placedMonoField[collissionCoodinate[h]][xBasis + h] !== undefined ||
               _placedMonoField[collissionCoodinate[h]][xBasis + h] === 0 
            ) { continue; }
            
            return true;
        }

        return false;
    }

    private sumWithCheckEmptyCollision(_y : number, _lowerCollision : number) : number{
        if(_lowerCollision === -1) { return -1; }
        return _y + _lowerCollision;
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