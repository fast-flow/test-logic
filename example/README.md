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
            test: [
                {
                    rule: 'required',
                    msg: '{{label}}必填'
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
