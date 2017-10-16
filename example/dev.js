var ReactDOM = require('react-dom')
var render = ReactDOM.render
require('./doc.css')
window.TestLogic = require('test-logic').default
window._log = window.console.log
window._error = window.console.error
delete window.console.error
delete window.console.log
window.console.log = function() {
    if (arguments[0] === 'fail' && arguments[1] === false) {
        document.title = 'PASS-' + parseInt(Math.random()*99)
    }
    window._log(arguments)
}

window.console.error = function() {
    document.title = JSON.stringify(
        Array.from(arguments).filter(function (item) {
            return typeof item === 'string'
        })
    )
    window._error(arguments)
}
