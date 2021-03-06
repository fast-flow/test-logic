# Basic

## check

### required

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````
### required-email

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### function-async

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
/**/            function (pass, fail, value) {
/**/                console.log(this)
/**/                // 可以通过延迟执行 pass 或 fail 达到异步校验的目的
/**/                if (/abc/.test(value)) {
/**/                    fail('{{label}}中不能包含 abc')
/**/                }
/**/                pass()
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### msg
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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### max

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### min

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### max&min

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### maxLength

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### minLength

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````


### maxLength&minLength

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
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````


### maxByte

````html
<input type="text" id="maxByteInput" value="123五" />
<button id="maxByteBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxByteInput')
    var eBtn = document.getElementById('maxByteBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                maxByte: 4,
/**/                msg: '{{label}}长度不能大于{{self.maxByte}}个英文或{{self.maxByteHalf}}个中文,当前字节{{valueByte}}'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### minByte

````html
<input type="text" id="minByteInput" value="二四六" />
<button id="minByteBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('minByteInput')
    var eBtn = document.getElementById('minByteBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                minByte: 5,
/**/                msg: '{{label}}长度不能小于{{self.minByte}}个英文或{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### maxByte&minByte


````html
<input type="text" id="maxMinByteInput" value="二四六八十" />
<button id="maxMinByteBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('maxMinByteInput')
    var eBtn = document.getElementById('maxMinByteBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                maxByte: 9,
/**/                minByte: 5,
/**/                msg: '{{label}}长度不能大于{{self.maxByte}}个英文或{{self.maxByteHalf}}个中文'+
/**/                     '且' +
/**/                     '不能小于{{self.minByte}}个英文或{{self.minByteHalf}}个中文，' +
/**/                     '当前字节{{valueByte}}'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### regexp


````html
<input type="text" id="regexpInput" value="123abc" />
<button id="regexpBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('regexpInput')
    var eBtn = document.getElementById('regexpBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                regexp: /abc/,
/**/                be: false,
/**/                msg: '{{label}}不能包含 abc'
/**/                // regexp.test(value) should be false
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### regexp-be-true

````html
<input type="text" id="regexpTrueInput" value="123ab" />
<button id="regexpTrueBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('regexpTrueInput')
    var eBtn = document.getElementById('regexpTrueBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput.value,
            label: '用户名',
/**/        test: [
/**/            'required',
/**/            {
/**/                regexp: /abc/,
/**/                be: true,
/**/                msg: '{{label}}必须包含 abc'
/**/                // regexp.test(value) should be true
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### equal

````html
<input type="text" id="equalInput1" value="123ab" />
<input type="text" id="equalInput2" value="123abc" />
<button id="equalBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput1 = document.getElementById('equalInput1')
    var eInput2 = document.getElementById('equalInput2')
    var eBtn = document.getElementById('equalBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput2.value,
            label: '密码',
/**/        test: [
/**/            'required',
/**/            {
/**/                equal: eInput1.value,
/**/                msg: '两次密码输入不相同'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### notEqual

````html
<input type="text" id="notEqualInput1" value="123ab" />
<input type="text" id="notEqualInput2" value="123ab" />
<button id="notEqualBtn" >Check the console</button>
````

````js
window.addEventListener('load', function () {
    var eInput1 = document.getElementById('notEqualInput1')
    var eInput2 = document.getElementById('notEqualInput2')
    var eBtn = document.getElementById('notEqualBtn')
    var test = new TestLogic({})
    eBtn.addEventListener('click', function () {
        test.check({
            value: eInput2.value,
            label: '新密码',
/**/        test: [
/**/            'required',
/**/            {
/**/                notEqual: eInput1.value,
/**/                msg: '新密码与旧密码不能相同'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                console.log('fail', fail)
                if (fail) { console.error(errors[0].msg) }
                console.log('data', data)
            }
        })
    })
})
````

### every

````html
<input type="text" id="everyInput" value="123" /> change this input value
<div id="everyResult" ></div>
````

````js
window.addEventListener('load', function () {
    var eInput = document.getElementById('everyInput')
    var eResult = document.getElementById('everyResult')
    var test = new TestLogic({})
    everyInput.addEventListener('input', function () {
        test.check({
            value: eInput.value,
            label: '密码',
/**/        every: true,
/**/        test: [
/**/            {
/**/                rule: 'required',
/**/                // 使用 $data 防止与 test-logic 未来的新接口冲突
/**/                $data: '密码必填'
/**/            },
/**/            {
/**/                regexp: /(123|1234|12345|123456)/,
/**/                be: false,
/**/                $data: '使用连续数字作为密码不安全(123456)'
/**/            },
/**/            {
/**/                regexp: /[A-Z]/,
/**/                be: true,
/**/                $data: '必须存在大写英文字母'
/**/            },
/**/            {
/**/                regexp: /[a-z]/,
/**/                be: true,
/**/                $data: '必须存在小写英文字母'
/**/            },
/**/            {
/**/                regexp: /[0-9]/,
/**/                be: true,
/**/                $data: '必须存在数字'
/**/            }
/**/        ],
            finish: function (fail, errors, data) {
                var result = data.source.map(function (item) {
                        var color = item.error?'red':'gray'
                        return '<div style="color:' + color + ';" >' + item.test.$data + '</div>'
                    })
                result.push('<div>fail:' + fail +  '</div>')
                eResult.innerHTML = result.join('')
                console.log('data', data)
            }
        })
    })
})
````

## addRule

## checkAll

### basic

````html
<form id="checkAllForm">
    user: <input type="text" class="js-user" /><br />
    email: <input type="text" class="js-email" /><br />
    mobile: <input type="text" class="js-mobile" /><br />
    async: <input type="text" class="js-async" value="a" /><br />
    <button type="submit" >Check the console</button>
</form>
<pre id="checkAllResult"></pre>
````
````js
window.addEventListener('load', function () {
    var test = new TestLogic({})
    var eForm = document.getElementById('checkAllForm')
    var eResult = document.getElementById('checkAllResult')
    var get = function (className) {return eForm.getElementsByClassName(className)[0]}
    eForm.addEventListener('submit', function (e) {
        e.preventDefault()
/**/    test.checkAll([
/**/        {
/**/            label: '用户名',
/**/            value: get('js-user').value,
/**/            test: ['required']
/**/        },
/**/        {
/**/            label: '邮箱',
/**/            value: get('js-email').value,
/**/            test: ['required', 'email']
/**/        },
/**/        {
/**/            label: '手机号码',
/**/            value: get('js-mobile').value,
/**/            test: ['required', 'mobile']
/**/        },
/**/        {
/**/            label: '(异步校验)',
/**/            value: get('js-async').value,
/**/            test: [
/**/                'required',
/**/                function (pass, fail, value) {
/**/                    console.log('async start...')
/**/                    setTimeout(function () {
/**/                        if (/a/.test(value)) {
/**/                            fail('{{label}}不能包含a')
/**/                        }
/**/                        else {
/**/                            pass()
/**/                        }
/**/                        console.log('async end')
/**/                    }, 500)
/**/                }
/**/            ]
/**/        }
/**/    ], {
/**/        finish: function (fail, errors, data) {
/**/            console.log('## checkAll')
/**/            console.log('fail', fail),
/**/            console.error('errors', errors)
/**/            console.log('data', data)
/**/            eResult.innerHTML = errors.map(function (item) {
/**/                return item.msg
/**/            }).join('\r\n')
/**/        }
/**/    })
/**/})
})
````

### every:false

`checkAll([...], {every: true})` default `true`

````html
<form id="everyForm">
    user: <input type="text" class="js-user" /><br />
    email: <input type="text" class="js-email" /><br />
    mobile: <input type="text" class="js-mobile" /><br />
    async: <input type="text" class="js-async" value="a" /><br />
    <button type="submit" >Check the console</button>
</form>
<pre id="everyFormResult"></pre>
````
````js
window.addEventListener('load', function () {
    var test = new TestLogic({})
    var eForm = document.getElementById('everyForm')
    var eResult = document.getElementById('everyFormResult')
    var get = function (className) {return eForm.getElementsByClassName(className)[0]}
    eForm.addEventListener('submit', function (e) {
        e.preventDefault()
        test.checkAll([
            {
                label: '用户名',
                value: get('js-user').value,
                test: ['required']
            },
            {
                label: '邮箱',
                value: get('js-email').value,
                test: ['required', 'email']
            },
            {
                label: '手机号码',
                value: get('js-mobile').value,
                test: ['required', 'mobile']
            },
            {
                label: '(异步校验)',
                value: get('js-async').value,
                test: [
                    'required',
                    function (pass, fail, value) {
                        console.log('async start...')
                        setTimeout(function () {
                            if (/a/.test(value)) {
                                fail('{{label}}不能包含a')
                            }
                            else {
                                pass()
                            }
                            console.log('async end')
                        }, 500)
                    }
                ]
            }
        ], {
            every: false,
            finish: function (fail, errors, data) {
                console.log('## checkAll')
                console.log('fail', fail),
                console.error('errors', errors)
                console.log('data', data)
                eResult.innerHTML = errors.map(function (item) {
                    return item.msg
                }).join('\r\n')
            }
        })
    })
})
````

### queue

`checkAll([...], {queue: false})` default `false`

````html
<form id="queueForm">
    async1: <input type="text" class="js-async1" value="a" /><br />
    async2: <input type="text" class="js-async2" value="a" /><br />
    <button type="submit" >Check the console</button>
</form>
<pre id="queueFormItemFinish"></pre>
<hr>
<pre id="queueFormResult"></pre>
````
````js
window.addEventListener('load', function () {
    var test = new TestLogic({})
    var eForm = document.getElementById('queueForm')
    var eResult = document.getElementById('queueFormResult')
    var eResultItem = document.getElementById('queueFormItemFinish')
    var get = function (className) {return eForm.getElementsByClassName(className)[0]}
    eForm.addEventListener('submit', function (e) {
        e.preventDefault()
        test.checkAll([
            {
                label: '(异步校验)1',
                value: get('js-async1').value,
                test: [
                    'required',
                    function (pass, fail, value) {
                        console.data('start async1:' + new Date().getTime())
                        setTimeout(function () {
                            console.data('end async1:' + new Date().getTime())
                            fail('队列错误1')
                        }, 500)
                    }
                ],
                finish: function (fail, errors, data) {
                    if (fail) {
                        var msg = errorss[0].msg
                        eResultItem.innerHTML = eResultItem.innerHTML + '\r\n' + new Date().getTime() + ':' + msg
                        console.log(msg)
                    }
                }
            },
            {
                label: '(异步校验)2',
                value: get('js-async1').value,
                test: [
                    'required',
                    function (pass, fail, value) {
                        console.data('start async2:' + new Date().getTime())
                        setTimeout(function () {
                            console.data('end async2:' + new Date().getTime())
                            fail('队列错误2')
                        }, 500)
                    }
                ],
                finish: function (fail, errors, data) {
                    if (fail) {
                        var msg = errorss[0].msg
                        eResultItem.innerHTML = eResultItem.innerHTML + '\r\n' + new Date().getTime() + ':' + msg
                        console.log(msg)
                    }
                }
            }
        ], {
            queue: true,
            finish: function (fail, errors, data) {
                console.log('[fail, errors, data]:', arguments)
                eResult.innerHTML = errors.map(function (item) {
                    return item.msg
                }).join('\r\n')
            }
        })
    })
})
````
