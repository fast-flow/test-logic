import check from "./check"
import defaultRule from "./defaultRule"
import extend from "extend"
class TextLogic {
    constructor (settings) {
        const self = this
        self.rule = extend(true, {}, defaultRule)
    }
}
TextLogic.prototype.check = check
export default TextLogic
