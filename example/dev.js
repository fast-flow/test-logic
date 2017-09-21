var ReactDOM = require('react-dom')
var render = ReactDOM.render

// basic
;(function (node) {
    if (!node) {return}
    require(['./email.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__email'))
