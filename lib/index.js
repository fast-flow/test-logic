import check from "./check"
import checkAll from "./checkAll"
import defaultProps from "./defaultProps"
import extend from "extend"
import spare from "sparejs"
class TestLogic {
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
TestLogic.prototype.check = check
TestLogic.prototype.checkAll = checkAll
export default TestLogic
module.exports = TestLogic
