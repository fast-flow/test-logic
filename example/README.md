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
/**/        test: ['required'],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
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
/**/        test: ['required', 'email'],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
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
/**/        test: [
/**/            'required',
/**/            {
/**/                func: function (pass, fail, value) {
/**/                    console.log(this)
/**/                    // 可以通过延迟执行 pass 或 fail 达到异步校验的目的
/**/                    if (/abc/.test(value)) {
/**/                        fail('{{label}}中不能包含 abc')
/**/                    }
/**/                    pass()
/**/                }
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## msg


````html
<button id="msgBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eBtn = document.getElementById('msgBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: 'a',
            label: '邮箱',
/**/        test: [
/**/            'required',
/**/            {
/**/                rule: 'email',
/**/                msg: '{{label}}格式错误'
/**/                // 语法基于 https://github.com/janl/mustache.js
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## max

````html
<input type="number" id="maxInput" value="9" />
<button id="maxBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxInput')
    var eBtn = document.getElementById('maxBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '年龄',
/**/        test: [
/**/            'required',
/**/            {
/**/                max: 10,
/**/                msg: '{{label}}不可大于{{self.max}}'
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## min

````html
<input type="number" id="minInput" value="3" />
<button id="minBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('minInput')
    var eBtn = document.getElementById('minBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '年龄',
 /**/       test: [
 /**/           'required',
 /**/           {
 /**/               min: 4,
 /**/               msg: '{{label}}不可小于{{self.min}}'
 /**/           }
 /**/       ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## max&min

````html
<input type="number" id="maxMinInput" value="3" />
<button id="maxMinBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxMinInput')
    var eBtn = document.getElementById('maxMinBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '年龄',
/**/        test: [
/**/            'required',
/**/            {
/**/                max: 6,
/**/                min: 4,
/**/                msg: '{{label}}不可小于{{self.min}}并大于{{self.max}}'
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## maxLength

````html
<input type="text" id="maxLengthInput" value="a23456789" />
<button id="maxLengthBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxLengthInput')
    var eBtn = document.getElementById('maxLengthBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                maxLength: 8,
/**/                msg: '{{label}}长度不可大于{{self.maxLength}},当前长度{{value.length}}'
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

## minLength

````html
<input type="text" id="minLengthInput" value="a" />
<button id="minLengthBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('minLengthInput')
    var eBtn = document.getElementById('minLengthBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                minLength: 2,
/**/                msg: '{{label}}长度不可小于{{self.minLength}},当前长度{{value.length}}'
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````


## maxLength&minLength

````html
<input type="text" id="maxMinLengthInput" value="a23456" />
<button id="maxMinLengthBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxMinLengthInput')
    var eBtn = document.getElementById('maxMinLengthBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                minLength: 2,
/**/                maxLength: 5,
/**/                msg: '{{label}}长度不可小于{{self.minLength}}且大于{{self.maxLength}},当前长度{{value.length}}'
/**/            }
/**/        ],
            finish: function (fail, info) {
                console.log('fail', fail)
                if (fail) { console.error(info.error[0].msg) }
                console.log('info', info)
            }
        })
    })
})
````

