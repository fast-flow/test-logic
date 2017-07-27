import extend from "extend"
import returnError from "./returnError"
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
export default compareNumber
