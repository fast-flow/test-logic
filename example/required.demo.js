var TestLogic = require('test-logic').default
var $ = require('jquery')
var $input = $('#example__required-input')
var $msg = $('#example__required-msg')
var test = new TestLogic()
$input.on('blur', function () {
    /* - - - - - - - - - - - - - - - - - - - */
    var email = this.value
    test.checkAll([
        {
            value: email,
            label: '邮箱',
            test: [
                'required'
            ]
        }
    ], {
        finish: function(fail, errors, data) {
            console.log(fail, email)
            if (fail) {
                $msg.html(errors[0].msg)
            }
            else {
                $msg.html('')
            }
        }
    })
    /* - - - - - - - - - - - - - - - - - - - */
}).trigger('blur')
