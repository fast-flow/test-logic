import check from "./check"
import checkAll from "./checkAll"
import defaultProps from "./defaultProps"
import extend from "extend"
import spare from "sparejs"
import addRule from "./addRule"
import addPriorRule from "./addPriorRule"
class TestLogic {
    constructor (userSettings) {
        const self = this
        let settings = spare.settings(
            defaultProps,
            userSettings
        )
        self.rule = settings.rule
        self.priorRule = settings.priorRule
    }
}
TestLogic.prototype.check = check
TestLogic.prototype.checkAll = checkAll
TestLogic.prototype.addRule = addRule
TestLogic.prototype.addPriorRule = addPriorRule
export default TestLogic
module.exports = TestLogic
