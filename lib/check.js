import renderErrorMessage from "./renderErrorMessage"
const check = function check (settings) {
    let source = settings.test.map(function (item) {
        return {
            tested: false,
            test: item
        }
    })
    settings.test.some(function (item, index) {
        let data = item
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
        item.tested = true
        source[index] = item
        if (settings.every) {
            return false
        }
        else {
            return data.error
        }
    })
    let fail = source.some(function (item) {
        return item.error
    })
    settings.finish(fail, {
        source: source
    })
}
export default check
