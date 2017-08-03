import extend from "extend"
/*
 * @function - 将简写的校验参数转化为完整的参数
 * @param {Object} item - 校验参数
 * @param {Object} rule - defaultRule & addRule
 */
export default function transformItem(item, rule) {
    let completeItem = extend(true, {}, item)
    // use rule
    if (item.rule) {
        completeItem = extend(true, completeItem, rule[completeItem.rule])
        completeItem = extend(true, completeItem, item)
    }
    return completeItem
}
