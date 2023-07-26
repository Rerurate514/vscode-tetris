type Field = number[][];
type LineFullInfo = {
    isFull : boolean,
    lineNum : number[]
};

export class LinePlacedFullControl{
    private replacedFullLine = [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1];
    private replacedDefaultLine = [1,0,0,0,0,0,0,0,0,0,0,1];
    
    /**
     * ## この関数は、クラス[LinePlacedFullControl]のエントリポイントです。
     * ## 埋まったラインを消したい時はこの関数を呼び出すだけです。
     * @date 2023/7/21 - 7:43:20
     *
     * @public
     * @param {Field} _placedMonoField
     * @returns {Field}
     */
    public lineFull(_placedMonoField: Field): Field{
        let placedMonoField = JSON.parse(JSON.stringify(_placedMonoField));

        let lineFullInfo = this.checkLineFull(placedMonoField);

        if(!lineFullInfo.isFull){ return placedMonoField; }

        placedMonoField = this.removeLine(placedMonoField, lineFullInfo);
        placedMonoField = this.fallLineOneSquare(placedMonoField, lineFullInfo);

        console.log("LINE IS FULL");

        return placedMonoField;
    }

    
    /**
     * ## この関数は、ラインが埋まっているのかを確認する関数です。
     * @date 2023/7/21 - 7:44:43
     *
     * @private
     * @param {Field} _placedMonoField
     * @returns {LineFullInfo}
     */
    private checkLineFull(_placedMonoField: Field): LineFullInfo{
        let result : LineFullInfo = {
            isFull : false,
            lineNum : []
        };

        let field : Field = JSON.parse(JSON.stringify(_placedMonoField));
 
        for(let v = 0; v <= field.length - 2; v++){
            for(let h = 1; h < field[v].length; h++){
                if(field[v][h] === 0) { break; }
                if(h !== field[v].length - 1) { continue; }
                result.isFull = true;
                result.lineNum.push(v);
            }
        }

        return result;
    }

    /**
     * ## この関数は、埋まったラインを消す関数です。
     * @date 2023/7/21 - 7:45:14
     *
     * @private
     * @param {Field} _placedMonoField
     * @param {LineFullInfo} _lineFullInfo
     * @returns {Field}
     */
        private removeLine(_placedMonoField: Field, _lineFullInfo: LineFullInfo): Field{
            let result = JSON.parse(JSON.stringify(_placedMonoField));
    
            for(const target of _lineFullInfo.lineNum){
                result[target] = [...this.replacedDefaultLine];
            }
    
            return result;
        }

    
    /**
     * ## この関数は、消されたラインから上のラインを下にずらす関数です。
     * @date 2023/7/21 - 7:45:14
     *
     * @private
     * @param {Field} _placedMonoField
     * @param {LineFullInfo} _lineFullInfo
     * @returns {Field}
     */
    private fallLineOneSquare(_placedMonoField: Field, _lineFullInfo: LineFullInfo): Field{
        let result = JSON.parse(JSON.stringify(_placedMonoField));
        let lineFullNumArr = [..._lineFullInfo.lineNum];

        for(let v = result.length - 1; v >= 1; v--){            
            if(!lineFullNumArr.includes(v)){ continue; }

            result[v] = [...result[v - 1]];
            lineFullNumArr.push(v - 1);
        }

        return result;
    }
}