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

**finish**回调参数说明


```js
[
    // fail 校验是否失败
    true,
    // data 完整信息
    {
        errors: [
            {
                msg: '邮箱格式错误',
                test: {...}
            }
        ],
        "*successes": "successes 格式与 errors 基本一致，唯一的不同是 successes 没有 msg",
        successes: successes,
        /*
            errors = source.filter(function (item){ return item.errror})
            successes = source.filter(function (item){ return !item.errror})
        */
        "*source": "source格式与 errors 基本一致，不同的是多了 tested 和 error，用于标示是否测试和是否校验错误。（every: false 时某些项目可能会不校验）",
        source: [
            {
/**/            error: true,
/**/            tested: true,
                msg: '邮箱格式错误',
                test: {...}
            }
            ...
        ]
    }
]
```

`test` 可附带一些用户扩展参数，用于解决更复杂的业务场景 [示例](../example/README.md#every)

## checkAll

`checkAll` 可校验多个 `value` 的多项规则，支持**队列**、**惰性**

````js
test.checkAll(
    [
        {
            value: 'mail',
            label: '邮箱',
            test: [
                'required',
                'email'
            ]
        },
        {
            value: '123',
            label: '密码',
            every: true,
            test: [
                'required',
                {
                    minLength: 4,
                    maxLength: 20,
                    msg:'{{label}}必须是{{minLength}}~{{maxLength}}位'
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
    ],
    {
        finish: function (fail, errors, data) {
            console.log(data)
        }
    }
)
````
