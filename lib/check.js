import byteLength from "./byteLength"
import extend from "extend"
import returnError from "./returnError"
import compareNumber from "./compareNumber"

const checkItem = function (completeItem, settings, funcCallback) {

    let data = {
        test: completeItem
    }
    const setData = function (pass) {
        if (pass === 'NOT_MATCH') {
            return
        }
        if (pass) {
            data.error = false
        }
        else {
            data = returnError(data, completeItem, settings)
        }
    }
    // regexp
    if (completeItem.regexp) {
        setData(
            completeItem.regexp.test(settings.value) === completeItem.be
        )
    }
    if (typeof completeItem.equal !== 'undefined') {
        setData(
            String(settings.value) == String(completeItem.equal)
        )
    }
    if (typeof completeItem.notEqual !== 'undefined') {
        setData(
            String(settings.value) !== String(completeItem.notEqual)
        )
    }

    setData(
        compareNumber(data, completeItem, 'min', 'max', Number(settings.value), settings)
    )
    setData(
        compareNumber(data, completeItem, 'minLength', 'maxLength', settings.value.length, settings)
    )
    setData(
        compareNumber(data, completeItem, 'minByte', 'maxByte', byteLength(settings.value), settings)
    )
    if (typeof completeItem.func === 'function') {
        completeItem.func(
            function pass () {
                data.error = false
                funcCallback('PASS', data)
                data.tested = true
            },
            function fail (msg) {
                completeItem.msg = msg
                funcCallback('FAIL', returnError(data, completeItem, settings))
                data.tested = true
            },
            settings.value
        )
    }
    else {
        return data
        data.tested = true
    }
}
const check = function check (settings) {
    const self = this
    // data
    let fail, source, requiredItem, requiredData, requiredIndex, fnTestingCount
    // method
    let checkList, checkFinish, getCompleteItem
    getCompleteItem = function (item) {
        let completeItem = extend(true, {}, item)
        // use rule
        if (item.rule) {
            completeItem = extend(true, completeItem, self.rule[completeItem.rule])
            completeItem = extend(true, completeItem, item)
        }
        return completeItem
    }
    fnTestingCount = 0

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
            let funcCallback
            let completeItem = getCompleteItem(item)
            if (typeof completeItem.func === 'function') {
                fnTestingCount++
                funcCallback = function (type, data) {
                    fnTestingCount--
                    source[index] = data
                    // 等待 checkFinish 被定义
                    setTimeout(function () {
                        checkFinish()
                    }, 0)

                }
                checkItem(completeItem, settings, funcCallback)
            }
            else {
                let data = checkItem(completeItem, settings, funcCallback)
                source[index] = data
                if (settings.every) {
                    return false
                }
                else {
                    return data.error
                }
            }
        })
    }
    // 存在必填验证则先校验必填
    if (typeof requiredItem === 'object') {
        requiredData = checkItem(getCompleteItem(requiredItem), settings)
        if (!requiredData.error) {
            checkList()
        }
        source[requiredIndex] = requiredData
    }
    // 不存在必填验时 value 为空或者 0 数组则不进行后续校验
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
    checkFinish = function () {
        if (fnTestingCount === 0) {
            let fail = source.some(function (item) {
                return item.error
            })
            settings.finish(
                fail
                ,
                {
                    source: source
                }
            )
        }
    }
    checkFinish()
}
export default check
