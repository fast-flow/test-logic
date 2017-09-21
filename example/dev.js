var ReactDOM = require('react-dom')
var render = ReactDOM.render

// email
;(function (node) {
    if (!node) {return}
    require(['./email.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__email'))

// required
;(function (node) {
    if (!node) {return}
    require(['./required.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__required'))
