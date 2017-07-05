import renderErrorMessage from "./renderErrorMessage"
import extend from "extend"
const check = function check (settings) {
    const self = this
    // data
    let fail, source, requiredItem, requiredData, requiredIndex
    // method
    let checkItem, checkList, returnError
    requiredItem = false
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
    returnError = function (data, item, settings) {
        let renderData = extend(true, {}, settings)
        renderData.test = item
        data.error = true
        data.msg = renderErrorMessage(item.msg, renderData)
        return data
    }
    // 校验单项
    checkItem = function (item) {
        let data = {
            test: item
        }
        let completeItem = extend(true, {}, item)
        if (item.rule) {
            completeItem = extend(true, completeItem, self.rule[completeItem.rule])
            completeItem = extend(true, completeItem, item)
        }
        if (completeItem.regexp) {
            if (completeItem.regexp.test(settings.value) !== completeItem.be) {
                data = returnError(data, completeItem, settings)
            }
            else {
                data.error = false
            }
        }
        if (typeof completeItem.min !== 'undefined') {
            if (Number(settings.value) < Number(completeItem.min)) {
                data = returnError(data, completeItem, settings)
            }
            else {
                data.error = false
            }
        }
        data.tested = true
        return data
    }
    // 校验列表
    checkList = function () {
        settings.test.some(function (item, index) {
            // ignore required
            if (item.rule === 'required') {
                return false
            }
            let data = checkItem(item)
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
        requiredData = checkItem(requiredItem)
        if (!requiredData.error) {
            checkList()
        }
        source[requiredIndex] = requiredData
    }
    else {
        checkList()
    }

    fail = source.some(function (item) {
        return item.error
    })
    settings.finish(fail, {
        source: source
    })
}
export default check
