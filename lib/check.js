import renderErrorMessage from "./renderErrorMessage"
const check = function check (settings) {
    let source = []
    settings.test.forEach(function (item, index) {
        let data = {
            settings: item
        }
        if (item.regexp) {
            if (item.regexp.test(settings.value) !== item.be) {
                data.error = true
                data.msg = renderErrorMessage(item.msg, {
                    label: settings.label
                })
            }
            else {
                data.error = false
            }
        }
        source[index] = data
    })
    let fail = source.some(function (item) {
        return item.error
    })
    settings.finish(fail, {
        source: source
    })
}
export default check
