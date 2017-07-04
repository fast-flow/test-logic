import { PropTypes } from "react"
import extend from "extend"
export default function (component) {
    extend(true, component, {
        defaultProps: {
            prefixClassName: 'r-alert',
            themes: '',
            onClose: function () {}
        },
        propTypes: {
            prefixClassName: PropTypes.string,
            themes: PropTypes.string,
            onClose: PropTypes.func
        }
    })
}
