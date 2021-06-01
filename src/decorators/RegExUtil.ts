import {DecoCallBackType} from "./CqlDecorator";

export default class RegExUtil {
    static matchRegEx(text: string, regEx: RegExp, callback: DecoCallBackType) {
        for (const match of text.matchAll(regEx)) {
            if( typeof(match.index) == 'number' ) {
                callback(match.index, match.index + match[0].length );
            }
        }
    }
}


