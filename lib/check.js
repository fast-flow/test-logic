import renderErrorMessage from "./renderErrorMessage"
import byteLength from "./byteLength"
import extend from "extend"
const returnError = function (data, item, settings) {
    item = extend(true, {}, item)

    let renderData = extend(true, {}, settings)
    renderData.valueByte = byteLength(settings.value)
    if (typeof item.minByte !== 'undefined') {
        item.minByteHalf = Math.floor(item.minByte/2)
    }
    if (typeof item.maxByte !== 'undefined') {
        item.maxByteHalf = Math.floor(item.maxByte/2)
    }
    renderData.self = item

    data.error = true
    data.msg = renderErrorMessage(item.msg, renderData)
    return data
}
const compareNumber = function (data, item, minKey, maxKey, value, settings) {
    let output = extend(true, {}, data)
    let min = Number(item[minKey])
    let max = Number(item[maxKey])
    if (isNaN(min)) { min = undefined }
    if (isNaN(max)) { max = undefined }
    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
        if (typeof min !== 'undefined' && typeof max !== 'undefined') {
            if (value >= min && value <= max) {
                output.error = false
            }
            else {
                output = returnError(output, item, settings)
            }
        }
        else {
            if (typeof min !== 'undefined') {
                if (value < min) {
                    output = returnError(output, item, settings)
                }
                else {
                    output.error = false
                }
            }
            if (typeof max !== 'undefined') {
                if (value > max) {
                    output = returnError(output, item, settings)
                }
                else {
                    output.error = false
                }
            }
        }
    }
    return output
}
const checkItem = function (item, settings, rule) {
    let data = {
        test: item
    }
    let completeItem = extend(true, {}, item)
    // use rule
    if (item.rule) {
        completeItem = extend(true, completeItem, rule[completeItem.rule])
        completeItem = extend(true, completeItem, item)
    }
    // regexp
    if (completeItem.regexp) {
        if (completeItem.regexp.test(settings.value) !== completeItem.be) {
            data = returnError(data, completeItem, settings)
        }
        else {
            data.error = false
        }
    }
    if (typeof completeItem.equal !== 'undefined') {
        if (String(settings.value) !== String(completeItem.equal)) {
            data = returnError(data, completeItem, settings)
        }
        else {
            data.error = false
        }
    }
    if (typeof completeItem.notEqual !== 'undefined') {
        if (String(settings.value) === String(completeItem.notEqual)) {
            data = returnError(data, completeItem, settings)
        }
        else {
            data.error = false
        }
    }

    data = compareNumber(data, completeItem, 'min', 'max', Number(settings.value), settings)
    data = compareNumber(data, completeItem, 'minLength', 'maxLength', settings.value.length, settings)
    data = compareNumber(data, completeItem, 'minByte', 'maxByte', byteLength(settings.value), settings)
    data.tested = true
    return data
}
const check = function check (settings) {
    const self = this
    // data
    let fail, source, requiredItem, requiredData, requiredIndex
    // method
    let checkList

    requiredItem = false
    // 转换数据并标识出 required 的索引和配置
    source = settings.test.map(function (item, index) {
        if (item.rule === 'required') {
            requiredIndex = index
            requiredItem = item
        }
        return {
            tested: false,
            test: item
        }
    })
    // 校验列表
    checkList = function () {
        settings.test.some(function (item, index) {
            // ignore required
            if (item.rule === 'required') {
                return false
            }
            let data = checkItem(item, settings, self.rule)
            source[index] = data
            if (settings.every) {
                return false
            }
            else {
                return data.error
            }
        })
    }
    if (typeof requiredItem === 'object') {
        requiredData = checkItem(requiredItem, settings, self.rule)
        if (!requiredData.error) {
            checkList()
        }
        source[requiredIndex] = requiredData
    }
    else {
        // value 不为空则校验后续列表
        let pass
        if (Array.isArray(settings.value)) {
            pass = settings.value.length !== 0
        } else if (typeof settings.value === 'string'){
            pass = settings.value.trim().length !== 0
        }
        else {
            throw new Error('node_modules/test-logic: settings.value must be a string or array\n settings.value: `' + settings.value + '`')
        }

        if (pass) {
            checkList()
        }
    }

    fail = source.some(function (item) {
        return item.error
    })
    settings.finish(fail, {
        source: source
    })
}
export default check
