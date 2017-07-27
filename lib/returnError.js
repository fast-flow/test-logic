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
export default returnError
