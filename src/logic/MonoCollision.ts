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

export class MonoCollision{
    private calulateCollisionRef = new CalculateCollisionRef;
    
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

        let collissionCoodinate = this.calulateCollisionRef.culculateBottomCollision(
            _collisionRef
        );

        let xBasis = _collisionRef.coodinate.monoBasis.x;
           
        for(let h = 0; h <= 3; h++){
            if(collissionCoodinate[h] === -1) { continue; }
            if(_placedMonoField[collissionCoodinate[h]][xBasis + h] === 0 ) { continue; }
            return true;
        }

        return false;
    }

    public calculateMonoLowerCollision(_mono : Field): number[]{
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