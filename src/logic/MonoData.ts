type Field = number[][];
/**
 * # mono data class
 * > O, T, mS, S, mL, L, I : mono
 * >monoの格納配列は4*4の16マスです。
 * >monoは初期値として四隅に固まってます。
 * 
 * @date 2023/7/12 - 23:17:08
 *
 * @class MonoData
 * @typedef {MonoData}
 */
export class MonoData{
    public static mono = {
        O_MONO : [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
      
        T_MONO : [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
      
        S_MONO : [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
      
        MIRROR_S_MONO : [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
      
        L_MONO : [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
      
        MIRROR_L_MONO : [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
      
        I_MONO : [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    };

    /**
     * getMonoDataSize
     */
    public getMonoDataSize() : number{
        return Object.keys(MonoData.mono).length;
    }

    
    /**
     * ## この関数はmonoをmapにして返す関数です。
     * > keyは1~からのnumber型です。
     * @date 2023/7/13 - 12:49:35
     *
     * @public
     * @returns {Map<number, Field>}
     */
    public createMonoDataHashMap() : Map<number, Field>{
        let result : Map<number, Field> = new Map();

        const keys = Object.keys(MonoData.mono);
        let cnt = 1;

        for(const key of keys){
            let value : Field = MonoData.mono[key as keyof typeof MonoData.mono];

            result.set(cnt, value);
            cnt++;
        }

        return result!!;
    }
}