# Documentation

## new TestLogic()

## check

`check` 可校验单个 `value` 的多项规则，支持[异步](../example/README.md#function-async)、**优先**，**惰性**。

````html
<div id="abcMsg" style="color:red;" ></div>
<div id="emailMsg" style="color:red;" ></div>
<input type="text" id="email">
````

````js
var test = new TestLogic()
$('#email').on('input', function() {
    var value = this.value
    test.check({
        value: value,
        label: '邮箱',
        test: [
            'email'
        ],
        finish: function (fail, data) {
            if (fail) {
                console.error(data.errors[0].msg)
            }
            console.log(fail, data)
            console.log('\r\n')
        }
    })
})
````

---

`finish` 回调参数


```js
// fail 校验是否失败
true

// data 完整信息
{
    errors: [
        {
            msg: '邮箱格式错误',
            test: {...}
        }
    ],
    successes: [...],
    unchecked: [...],
    source: [
        {
           error: true,
           tested: true,
           msg: '邮箱格式错误',
           test: {...}
        }
        ...
    ]
}
```

`source` 是源数据，格式与 `errors` 基本一致。不同的是多了 `tested` 和 `error`，用于标示是否测试和是否校验错误。（`every: false` 时某些项目可能会不校验）

`errors` `successes` `untested` 都是基于 source 过滤出的数据

```js
errors = source.filter(function (item){ return item.errror && item.tested })
successes = source.filter(function (item){ return !item.errror && item.tested })
untested = source.filter(function (item){ return !item.tested })
```



`test` 可附带一些用户扩展参数，用于解决更复杂的业务场景 [示例](../example/README.md#every)

## checkAll

`checkAll` 可校验多个 `value` 的多项规则，支持**队列**、**惰性**

````js
var checkEmail = {
    value: 'mail',
    label: '邮箱',
    test: [
        'required',
        'email'
    ]
}
var checkPassword = {
    value: '123',
    label: '密码',
    test: [
        'required',
        {
            minLength: 4,
            maxLength: 20,
            msg:'{{label}}必须是{{self.minLength}}~{{self.maxLength}}位'
        },
        {
            regexp: /[a-z]/g,
            msg: '{{label}}必须包含小写字母'
        },
        {
            regexp: /[A-Z]/g,
            msg: '{{label}}必须包含大写字母'
        }
    ]
}
test.checkAll(
    [
        checkEmail,
        checkPassword
    ],
    {
        finish: function (fail, errors, data) {
            console.log('fail', fail)
            console.log('errors', errors)
            console.log('data', data)
        }
    }
)
````


```js
// fail 校验是否失败
true
// errors 校验不通过的规则（注意是不通过的 test 规则不是校验项 checkEmail 或 checkEmail）
[
    {test: {…}, msg: "邮箱的格式不正确"},
    {test: {…}, msg: "密码必须是4~20位"}
]
// data 源数据包含所有信息
[
    {
        // 这四个参数是 test.check({finish}) 回调的 finish(fail, data){}
        fail: true,
        errors: [...],
        successes: [...],
        untested: [],

        check: {value, 'mail', ...},    // checkEmail 和 checkPassword
        tested: true                    // 该校验项是否校验过
    },
    ...
]
```
