import checkItem from "./checkItem"
import delayEach from "delayeach"
import extend from "extend"
/**
 * function - 校验列表并在结束后回调
 * @param {object} list
 * @param {object} list.settings
 * @param {string} list.settings.value
 * @param {string} list.settings.label
 * @param {boolean} list.settings.every
 * @param {function} list.settings.finish
 * @param {string} list.settings.value
 * @param {array} list.rules
 * @param {finishCallback} list.cb
 */
/**
 * @callback finishCallback
 * @param {boolean} fail
 * @param {array} checkResult
 */
export default function (list) {
    let output = extend(true, [], list.rules)
    delayEach(
        list.rules,
        function itemHandle(rule, index, next, finish) {
            let testData = rule.test
            checkItem(
                testData,
                list.settings,
                function finishCallback (type, data) {
                    output[index] = data
                    if (list.settings.every) {
                        next()
                    }
                    else {
                        if (data.error) {
                            finish()
                        }
                        else {
                            next()
                        }
                    }
                }
            )
        },
        function finishCallback () {
            let fail = output.some(function (item) {
                return item.error
            })
            list.cb(fail, output)
        }
    )
}
