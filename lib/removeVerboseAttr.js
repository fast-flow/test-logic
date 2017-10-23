import extend from "extend"
export default function removeErrrorSuccessVerboseAttr (item) {
    let copyItem = extend(true, {}, item)
    delete copyItem.error
    delete copyItem.tested
    return copyItem
}
