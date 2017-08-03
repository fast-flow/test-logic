import byteLength from "./byteLength"
import extend from "extend"
import returnError from "./returnError"
import compareNumber from "./compareNumber"
export default function checkItem (completeItem, settings, callback) {
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
        compareNumber(completeItem['min'], completeItem['max'], Number(settings.value))
    )
    setData(
        compareNumber(completeItem['minLength'], completeItem['maxLength'], settings.value.length)
    )
    setData(
        compareNumber(completeItem['minByte'], completeItem['maxByte'], byteLength(settings.value))
    )
    if (typeof completeItem.func === 'function') {
        completeItem.func(
            function pass () {
                data.error = false
                data.tested = true
                callback('PASS', data)
            },
            function fail (msg) {
                completeItem.msg = msg
                data.tested = true
                callback('FAIL', returnError(data, completeItem, settings))
            },
            settings.value
        )
    }
    else {
        data.tested = true
        if (data.error) {
            callback('PASS', data)
        }
        else {
            callback('FAIL', data)
        }
    }
}
