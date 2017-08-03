import extend from "extend"
import returnError from "./returnError"
/*
 * @function - 判断一个值是否在最小值和最大值的范围，可以只传最小值或最大值，也可以都传
 * @param {Number|undefined} min
 * @param {Number|undefined} max
 * @param {Number} value
 * @returns {Boolean|String} true false "NOT_MATCH"
 */
const compareNumber = function (min, max, value) {
    min = Number(min)
    max = Number(max)
    if (isNaN(min)) { min = undefined }
    if (isNaN(max)) { max = undefined }
    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
        if (typeof min !== 'undefined' && typeof max !== 'undefined') {
            if (value >= min && value <= max) {
                return true
            }
            else {
                return false
            }
        }
        else {
            if (typeof min !== 'undefined') {
                if (value < min) {
                    return false
                }
                else {
                    return true
                }
            }
            if (typeof max !== 'undefined') {
                if (value > max) {
                    return false
                }
                else {
                    return true
                }
            }
        }
    }
    return 'NOT_MATCH'
}
export default compareNumber
