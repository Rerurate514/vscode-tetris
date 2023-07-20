import { Common } from "./Common";

type Field = number[][];
type LineFullInfo = {
    isFull : boolean,
    lineNum : number[]
};

export class LinePlacedFullControl{
    private commonCalc = new Common;
    
    /**
     * ## この関数は、クラス[LinePlacedFullControl]のエントリポイントです。
     * ## 埋まったラインを消したい時はこの関数を呼び出すだけです。
     * @date 2023/7/21 - 7:43:20
     *
     * @public
     * @param {Field} _movingMonoField
     * @returns {Field}
     */
    public lineFull(_movingMonoField: Field): Field{
        let movingMonoField = JSON.parse(JSON.stringify(_movingMonoField));

        let lineFullInfo = this.checkLineFull(movingMonoField);

        if(!lineFullInfo.isFull){ return movingMonoField; }

        return this.fallLinelOneSquare(movingMonoField, lineFullInfo);
    }

    
    /**
     * ## この関数は、ラインが埋まっているのかを確認する関数です。
     * @date 2023/7/21 - 7:44:43
     *
     * @private
     * @param {Field} _movingMonoField
     * @returns {LineFullInfo}
     */
    private checkLineFull(_movingMonoField: Field): LineFullInfo{
        let result = {
            isFull : false,
            lineNum : new Array(24)
        };

        for (let v = 0; v < _movingMonoField.length; v++) {
            let line = _movingMonoField[v];
            for (let h = 0; h < line.length; h++) {
                
                if(line[h] === 0){ continue; }
                console.log(`line[${h}] : ${line[h]}`);
                result.lineNum.push(v);
                result.isFull = true;
            }
        }

        return result;
    }

    
    /**
     * ## この関数は、埋まったラインを消してnumber[-1]におく関数です。
     * @date 2023/7/21 - 7:45:14
     *
     * @private
     * @param {Field} _movingMonoField
     * @param {LineFullInfo} _lineFullInfo
     * @returns {Field}
     */
    private fallLinelOneSquare(_movingMonoField: Field, _lineFullInfo: LineFullInfo): Field{
        let movingMonoField = JSON.parse(JSON.stringify(_movingMonoField));
        let result = this.commonCalc.fillFieldArrayOfArray(new Array(24),12);

        for (let v = 0; v < movingMonoField.length; v++) {
            if(!_lineFullInfo.lineNum.includes(v)){ continue; }

            //-1をnullの代わりとして運用する。
            //※この関数とremoveOneLineのスコープ内でのみ
            result[v] = new Array(12).fill(-1);
        }

        return this.removeOneLine(result,_lineFullInfo.lineNum.length);
    }

    
    /**
     * ## この関数は、number[-1]を消して繰り上げる関数です。
     * @date 2023/7/21 - 7:46:37
     *
     * @private
     * @param {Field} _movingMonoField
     * @param {number} _lineQuantity
     * @returns {Field}
     */
    private removeOneLine(_movingMonoField: Field, _lineQuantity: number): Field{
        let movingMonoField = JSON.parse(JSON.stringify(_movingMonoField));
        let result = this.commonCalc.fillFieldArrayOfArray(new Array(24),12);

        for (let v = movingMonoField.length; v >= 1; v--) {
            if(movingMonoField[v][0] !== -1){ continue; }
            
            result[v] = result[v + 1];
            

            result[v] = new Array(12).fill(-1);
        }

        for(let v = 0; v <= _lineQuantity; v++){
            result[v] = new Array(12).fill(0);
        }

        return result;
    }
}