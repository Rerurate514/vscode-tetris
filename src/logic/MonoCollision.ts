type Field = number[][];
export class MonoCollision{
    /**
     * ## この関数はmonoの衝突判定を出す関数です。
     * @date 2023/7/18 - 10:33:27
     *
     * @private
     * @returns {boolean}
     */
    private isBottomCollision() : boolean{
        

        return true;
    }

    private calculateMonoLowerLimit(_mono: Field): number{
        let lowerLimit = 0;
        for(let v = 0; v < _mono.length; v++){
            for(let h = 0; h < _mono[v].length; h++){
                if(_mono[v][h] !== 0) { lowerLimit = v; }
            }
        }
        return lowerLimit;
    }
}