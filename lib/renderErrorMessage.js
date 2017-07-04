import Mustache from "mustache"
export default function renderErrorMessage (msg, data) {
    return Mustache.render(msg, data)
}
