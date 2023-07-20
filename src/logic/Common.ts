type Field = number[][];
export class Common{
    
    /**
     * ## この関数は1次元配列から2次元配列を作成する関数です。
     * @date 2023/7/21 - 6:24:32
     *
     * @public
     * @param {Field} _arr
     * @param {number} _size 横の長さ
     * @returns {Field}
     */
    public fillFieldArrayOfArray(_arr: Field, _size: number): Field{
        let result : Field = new Array(_arr.length).fill([]);
        for(let v = 0; v < _arr.length; v++){
            result[v] = new Array(_size).fill(0);
        }

        result = JSON.parse(JSON.stringify(result));
        return result;
    }
}