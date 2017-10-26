import byteLength from "./byteLength"
import extend from "extend"
import returnError from "./returnError"
import compareNumber from "./compareNumber"
/**
 * function - 校验具体规则，完成后回调
 * @param {object} rule
 * @param {object} settings
 * @param {finishCallback} callback
 */

/**
 * @callback - finishCallback
 * @param {string} type
 * @param {object} data
 * @param {boolean} data.error
 * @param {string} data.msg
 */
export default function checkItem (rule, settings, finishCallback) {
    let data = {
        test: rule
    }
    const setData = function (pass) {
        if (pass === 'NOT_MATCH') {
            return
        }
        if (pass) {
            data.error = false
        }
        else {
            data = returnError(data, rule, settings)
        }
    }
    // regexp
    if (rule.regexp) {
        setData(
            rule.regexp.test(settings.value) === rule.be
        )
    }
    if (typeof rule.equal !== 'undefined') {
        setData(
            String(settings.value) == String(rule.equal)
        )
    }
    if (typeof rule.notEqual !== 'undefined') {
        setData(
            String(settings.value) !== String(rule.notEqual)
        )
    }
    if (typeof settings.value === 'string' || typeof settings.value === 'number') {
        setData(
            compareNumber(rule['min'], rule['max'], Number(settings.value))
        )
        setData(
            compareNumber(rule['minLength'], rule['maxLength'], settings.value.length)
        )
        setData(
            compareNumber(rule['minByte'], rule['maxByte'], byteLength(settings.value))
        )
    }
    if (typeof rule.fn === 'function') {
        rule.fn(
            function pass () {
                data.error = false
                data.tested = true
                finishCallback('PASS', data)
            },
            function fail (msg) {
                rule.msg = String(msg)
                data.tested = true
                finishCallback('FAIL', returnError(data, rule, settings))
            },
            settings.value
        )
    }
    else {
        data.tested = true
        if (data.error) {
            finishCallback('FAIL', data)
        }
        else {
            finishCallback('PASS', data)
        }
    }
}
