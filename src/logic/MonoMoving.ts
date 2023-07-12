export class MonoMoving{
    
    /**
     * This function falls the mono on the field by one square.
     * @date 2023/7/12 - 23:38:22
     *
     * @public
     * @param {number[][]} _movingMonoField
     */
    public monoFallOneSquare(_movingMonoField : number[][]) : number[][] {
        let result : number[][] = [..._movingMonoField];

        for(let vertical = 0; result.length - 1 < vertical; vertical++){
            result[vertical + 1] = result[vertical];
        }

        return result;
    }
}