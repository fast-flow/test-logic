import extend from "extend"
import checkItem from "./checkItem"
import checkList from "./checkList"
import spare from "sparejs"
import removeVerboseAttr from "./removeVerboseAttr"
const checkDefaultSettings = {
    finish: function () {}
}
/**
 * see /example & /test
 */
const check = function check (settings) {
    const self = this
    settings = spare.settings(checkDefaultSettings, settings)
    if (typeof settings.value === 'undefined') {
        throw new Error('node_modules/test-logic:test.check({value}) value is required')
    }
    let testedCount, source, priorSource
    testedCount = 0
    source = []
    priorSource = []
    // classify: priorSource & source
    settings.test.forEach(function (item, index) {
        if (typeof item === 'string') {
            if (typeof self.rule[item] === 'undefined') {
                throw new Error('node_modules/test-logic: Not find rule[name] name is "' + item + '"')
            }
            else {
                item = {
                    rule: item
                }
            }
        }
        if (typeof item === 'function') {
            item = {
                fn: item
            }
        }
        let target = {
            tested: false,
            test: item
        }
        let completeItem
        if (item.rule) {
            var targetRule = self.rule[target.test.rule]
            if (typeof targetRule === 'function') {
                targetRule = {
                    fn: targetRule
                }
            }
            completeItem = extend(true, {}, targetRule)

            target.test = extend(true, completeItem, target.test)
        }
        if (self.priorRule.indexOf(item.rule) !== -1) {
            priorSource.push(target)
        }
        else {
            source.push(target)
        }
    })
    // have priorSource
    if (priorSource.length !== 0) {
        checkList({
            settings,
            rules: priorSource,
            cb: function (fail, priorResult) {
                if (fail) {
                    finishCallback(fail, priorResult)
                }
                else {
                    if (source.length === 0) {
                        finishCallback(false, priorResult)
                    }
                    else {
                        checkNormalSource(fail, priorResult)
                    }
                }
            }
        })
    }
    else {
        checkNormalSource(false)
    }
    /**
     * function - 校验普通的 source
     * @param {boolean} priorCheckFail
     * @param {(array|undefined)} priorResult
     */
    function checkNormalSource(priorCheckFail, priorResult) {
        var valueSource = JSON.stringify(settings.value)
        if (valueSource === '""' || valueSource === '[]' || valueSource == '{}') {
            finishCallback(false)
        }
        else {
            checkList({
                settings,
                rules: source,
                cb: function (fail, result) {
                    finishCallback(
                        fail || priorCheckFail,
                        priorResult,
                        result
                    )
                }
            })
        }
    }
    /**
     * function - 校验是否可以进行 finish 回调，如果可以则直接回调
     * @param {boolean} fail
     */
    function finishCallback (fail, priorResult, sourceResult) {
        priorResult = spare(priorResult, priorSource)
        sourceResult = spare(sourceResult, source)
        let data = {
            source: priorResult.concat(sourceResult)
        }
        data.errors = data.source.filter(function (item) {
            return item.error && item.tested
        }).map(removeVerboseAttr)
        data.successes = data.source.filter(function (item) {
            return !item.error && item.tested
        }).map(removeVerboseAttr)
        data.untested = data.source.filter(function (item) {
            return !item.tested
        }).map(removeVerboseAttr)
        settings.finish(fail, data.errors, data)

    }
}
export default check
