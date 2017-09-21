var TestLogic = require('test-logic').default
var $ = require('jquery')
var $input = $('#example__email-input')
var $msg = $('#example__email-msg')
var test = new TestLogic()
$input.on('input', function () {
    var email = this.value
    test.checkAll([
        {
            value: email,
            label: '邮箱',
            test: [
                'email'
            ]
        }
    ], {
        finish: function(fail, errors, data) {
            if (fail) {
                $msg.html(errors[0].msg)
            }
            else {
                $msg.html('')
            }
        }
    })
}).trigger('input')
