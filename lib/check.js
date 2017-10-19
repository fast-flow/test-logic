import extend from "extend"
import checkItem from "./checkItem"
import checkList from "./checkList"
import spare from "sparejs"
const checkDefaultSettings = {
    finish: function () {}
}
/**
 * see /example & /test
 */
const check = function check (settings) {
    const self = this
    settings = spare.settings(checkDefaultSettings, settings)
    let testedCount, source, importantSource
    testedCount = 0
    source = []
    importantSource = []
    // classify: importantSource & source
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
                func: item
            }
        }
        let target = {
            tested: false,
            test: item
        }
        let completeItem
        if (item.rule) {
            completeItem = extend(true, {}, self.rule[target.test.rule])
            target.test = extend(true, completeItem, target.test)
        }
        if (self.importantRule.indexOf(item.rule) !== -1) {
            importantSource.push(target)
        }
        else {
            source.push(target)
        }
    })
    // have importantSource
    if (importantSource.length !== 0) {
        checkList({
            settings,
            rules: importantSource,
            cb: function (fail, importantResult) {
                if (fail) {
                    finishCallback(fail, importantResult)
                }
                else {
                    if (source.length === 0) {
                        finishCallback(false, importantResult)
                    }
                    else {
                        checkNormalSource(fail, importantResult)
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
     * @param {boolean} importantCheckFail
     * @param {(array|undefined)} importantResult
     */
    function checkNormalSource(importantCheckFail, importantResult) {
        if (settings.value.trim().length === 0) {
            finishCallback(false)
        }
        else {
            checkList({
                settings,
                rules: source,
                cb: function (fail, result) {
                    finishCallback(
                        fail || importantCheckFail,
                        importantResult,
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
    function finishCallback (fail, importantResult, sourceResult) {
        importantResult = spare(importantResult, importantSource)
        sourceResult = spare(sourceResult, source)
        let info = {
            source: importantResult.concat(sourceResult)
        }
        info.errors = info.source.filter(function (item) {
            return item.error
        })
        info.success = info.source.filter(function (item) {
            return !item.error
        })
        settings.finish(fail, info)

    }
}
export default check
