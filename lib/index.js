import check from "./check"
import defaultProps from "./defaultProps"
import extend from "extend"
import spare from "sparejs"
class TextLogic {
    constructor (userSettings) {
        const self = this
        let settings = spare.settings(
            defaultProps,
            userSettings
        )
        self.rule = settings.rule
        self.importantRule = settings.importantRule
    }
}
TextLogic.prototype.check = check
export default TextLogic
