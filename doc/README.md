# Documentation


## check

````html
<div id="abcMsg" style="color:red;" ></div>
<div id="emailMsg" style="color:red;" ></div>
<input type="text" id="email">
````

````js
var test = new TestLogic({
    /*
    rule: {
        'email': {
            regexp: /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,
            be: true,
            msg: '{{label}}的格式不正确'
        }
    }
    */
})
$('#email').on('input', function() {
    var value = this.value
    test.check({
        value: value,
        label: 'email',
        test: [
            {
                rule: 'email'
            }
        ],
        finish: function (fail, data) {
            if (fail) {
                console.error(data.errors[0].msg)
            }
            console.log(fail, data)
        }
    })
})
````

---

**finish**回调参数解释


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

`test` 可附带一些用户扩展参数，用于解决更复杂的业务场景 [示例](../example/index.html#every)
