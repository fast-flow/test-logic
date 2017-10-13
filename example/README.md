# Basic

## required

````html
<input type="text" id="requiredInput" value="" />
<button id="requiredBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('requiredInput')
    var eBtn = document.getElementById('requiredBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
            test: ['required'],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) {
                    console.error(info.error[0].msg)
                }
                console.log('info', info)
            }
        })
    })
})
````
## required-email

````html
<input type="text" id="requiredEmailInput" value="" />
<button id="requiredEmailBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('requiredEmailInput')
    var eBtn = document.getElementById('requiredEmailBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '邮箱',
            test: ['required', 'email'],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) {
                    console.error(info.error[0].msg)
                }
                console.log('info', info)
            }
        })
    })
})
````

## function-async

````html
<input type="text" id="functionInput" placeholder="input abc" value="" />
<button id="functionBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('functionInput')
    var eBtn = document.getElementById('functionBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
            test: [
                'required',
                {
                    func: function (pass, fail, value) {
                        console.log(this)
                        // 可以通过延迟执行 pass 或 fail 达到异步校验的目的
                        if (/abc/.test(value)) {
                            fail('{{label}}中不能包含 abc')
                        }
                        pass()
                    }
                }
            ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) {
                    console.error(info.error[0].msg)
                }
                console.log('info', info)
            }
        })
    })
})
````
