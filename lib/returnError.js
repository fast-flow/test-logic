import byteLength from "./byteLength"
import extend from "extend"
import Mustache from "mustache"
import spare from "sparejs"
/*
 * @function 将数据标识为错误，并根据 settings 渲染 msg
 * @param {Object} data - `{"test":{"notEqual":"123","msg":"{{label}}不能等于{{self.notEqual}}"}}`
 * @param {Object} item - `{"rule":"required","msg":"{{label}}必填","regexp":{},"be":true}`
 * @param {Object} settings - `{"value":"","label":"用户名","test":[{"rule":"required","msg":"{{label}}必填"},{"rule":"email"}]}`
 * @returns {Object} `{"test":{"rule":"required","msg":"{{label}}必填","regexp":{},"be":true},"error":true,"msg":"用户名必填"}`
 */
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
    data.msg = Mustache.render(spare(item.msg, ''), renderData)
    return data
}
export default returnError
