import { CalculateCollisionRef } from "./CalculateCollisionRef";
import { Common } from "./Common";

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

export class MonoRotating{
    private commonCalc = new Common;

    public rotateLeft(_movingMonoField: Field, _collisionRef: CollisionRef): Field{
        let xBasis = _collisionRef.coodinate.monoBasis.x;
        let yBasis = _collisionRef.coodinate.monoBasis.y;

        let movingMonoField = JSON.parse(JSON.stringify(_movingMonoField));
        let result = this.commonCalc.fillFieldArrayOfArray(new Array(24),12);
        
        result[yBasis][xBasis] = movingMonoField[yBasis + 3][xBasis];
        result[yBasis][xBasis + 1] = movingMonoField[yBasis + 2][xBasis];
        result[yBasis][xBasis + 2] = movingMonoField[yBasis + 1][xBasis];
        result[yBasis][xBasis + 3] = movingMonoField[yBasis][xBasis];

        result[yBasis + 1][xBasis] = movingMonoField[yBasis + 3][xBasis + 1];
        result[yBasis + 1][xBasis + 1] = movingMonoField[yBasis + 2][xBasis + 1];
        result[yBasis + 1][xBasis + 2] = movingMonoField[yBasis + 1][xBasis + 1];
        result[yBasis + 1][xBasis + 3] = movingMonoField[yBasis][xBasis + 1];

        result[yBasis + 2][xBasis] = movingMonoField[yBasis + 3][xBasis + 2];
        result[yBasis + 2][xBasis + 1] = movingMonoField[yBasis + 2][xBasis + 2];
        result[yBasis + 2][xBasis + 2] = movingMonoField[yBasis + 1][xBasis + 2];
        result[yBasis + 2][xBasis + 3] = movingMonoField[yBasis][xBasis + 2];

        result[yBasis + 3][xBasis] = movingMonoField[yBasis + 3][xBasis + 3];
        result[yBasis + 3][xBasis + 1] = movingMonoField[yBasis + 2][xBasis + 3];
        result[yBasis + 3][xBasis + 2] = movingMonoField[yBasis + 1][xBasis + 3];
        result[yBasis + 3][xBasis + 3] = movingMonoField[yBasis][xBasis + 3];

        return result;
    }

    public rotateRight(_movingMonoField: Field, _collisionRef: CollisionRef): Field{
        let xBasis = _collisionRef.coodinate.monoBasis.x;
        let yBasis = _collisionRef.coodinate.monoBasis.y;

        let movingMonoField = JSON.parse(JSON.stringify(_movingMonoField));
        let result = this.commonCalc.fillFieldArrayOfArray(new Array(24),12);

        result[yBasis][xBasis] = movingMonoField[yBasis][xBasis + 3];
        result[yBasis][xBasis + 1] = movingMonoField[yBasis + 1][xBasis + 3];
        result[yBasis][xBasis + 2] = movingMonoField[yBasis + 2][xBasis + 3];
        result[yBasis][xBasis + 3] = movingMonoField[yBasis + 3][xBasis + 3];

        result[yBasis + 1][xBasis] = movingMonoField[yBasis][xBasis + 2];
        result[yBasis + 1][xBasis + 1] = movingMonoField[yBasis + 1][xBasis + 2];
        result[yBasis + 1][xBasis + 2] = movingMonoField[yBasis + 2][xBasis + 2];
        result[yBasis + 1][xBasis + 3] = movingMonoField[yBasis + 3][xBasis + 2];

        result[yBasis + 2][xBasis] = movingMonoField[yBasis][xBasis + 1];
        result[yBasis + 2][xBasis + 1] = movingMonoField[yBasis + 1][xBasis + 1];
        result[yBasis + 2][xBasis + 2] = movingMonoField[yBasis + 2][xBasis + 1];
        result[yBasis + 2][xBasis + 3] = movingMonoField[yBasis + 3][xBasis + 1];

        result[yBasis + 3][xBasis] = movingMonoField[yBasis][xBasis];
        result[yBasis + 3][xBasis + 1] = movingMonoField[yBasis + 1][xBasis];
        result[yBasis + 3][xBasis + 2] = movingMonoField[yBasis + 2][xBasis];
        result[yBasis + 3][xBasis + 3] = movingMonoField[yBasis + 3][xBasis];

        return result;
    }
}