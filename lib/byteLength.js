/**
 * @function - 计算字符串字节长度
 * @param {String} str - 需要计算的字符串
 * @returns {Number} - 字符串字节长度
 */
export default function byteLength (str) {
    var byteLen = 0
    for(var i = 0; i<str.length; i++){
        if(str.charCodeAt(i)>255){
            byteLen += 2
        }
        else {
            byteLen++
        }
    }
    return byteLen
}
