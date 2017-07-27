import Mustache from "mustache"
export default function renderErrorMessage (msg, data) {
    if (typeof msg === 'undefined') {
        msg = ''
    }
    return Mustache.render(msg, data)
}
