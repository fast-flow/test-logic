import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('checkAll 2 fail', function (done) {
    let callItemFinishCount = 0
    let callItemFinishTime = new Date().getTime()
    test.checkAll([
        {
            value: '1abcd',
            label: '用户名',
            test: [
                {
                    regexp: /\d/,
                    be: false,
                    msg: '{{label}}不能包含数字'
                }
            ],
            finish: function () {
                callItemFinishCount++
            }
        },
        {
            value: '二3',
            label: '用户名',
            test: [
                {
                    minByte: 4,
                    msg: '{{label}}不能少{{self.minByte}}个英文|{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
                }
            ]
        }

    ], {
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors[1].msg).to.eql('用户名不能少4个英文|2个中文,当前字节3')
            expect(errors.length).to.eql(2)
            expect(data.length).to.eql(2)
            expect(callItemFinishCount).to.eql(1)
            done()
        }
    })
})
it('checkAll 1 fail', function (done) {
    test.checkAll([
        {
            value: '1abcd',
            label: '用户名',
            test: [
                {
                    regexp: /\d/,
                    be: false,
                    msg: '{{label}}不能包含数字'
                }
            ]
        },
        {
            value: '二34',
            label: '用户名',
            test: [
                {
                    minByte: 4,
                    msg: '{{label}}不能少{{self.minByte}}个英文|{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
                }
            ]
        }

    ], {
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors.length).to.eql(1)
            expect(data.length).to.eql(2)
            done()
        }
    })
})

it('checkAll default queue:false', function (done) {
    test.checkAll([
        {
            value: '1',
            label: 'a',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        },
        {
            value: '2',
            label: 'b',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        }

    ], {
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[1].msg - errors[0].msg).to.be.within(0, 100)
            done()
        }
    })
})
it('checkAll default queue:true', function (done) {
    test.checkAll([
        {
            value: '1',
            label: 'a',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        },
        {
            value: '2',
            label: 'b',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        }

    ], {
        queue: true,
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[1].msg - errors[0].msg).to.be.within(500, 600)
            done()
        }
    })
})


it('checkAll every: false', function (done) {
    let finishCount = 0
    test.checkAll([
        {
            label: '用户名',
            value: '',
            test: ['required']
        },
        {
            label: '邮箱',
            value: '',
            test: ['required', 'email']
        },
        {
            label: '手机号码',
            value: '',
            test: ['required', 'mobile']
        },
        {
            label: '(异步校验)',
            value: 'a',
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
                    }, 100)
                }
            ]
        }
    ], {
        every: false,
        finish: function (fail, errors, data) {
            finishCount++
        }
    })
    setTimeout(function () {
        expect(finishCount).to.eql(1)
        done()
    }, 200)
})

it('checkAll queue:true every: false', function (done) {
    test.checkAll([
        {
            label: '(异步校验)1',
            value: 'a',
            test: [
                'required',
                function (pass, fail, value) {
                    setTimeout(function () {
                        fail('erorr 1')
                    }, 100)
                }
            ]
        },
        {
            label: '(异步校验)2',
            value: 'a',
            test: [
                'required',
                function (pass, fail, value) {
                    setTimeout(function () {
                        fail('erorr 2')
                    }, 100)
                }
            ]
        }
    ], {
        queue: true,
        every: false,
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            // expect(JSON.parse(JSON.stringify(data))).to.eql(
            //     [{"source":[{"test":{"regexp":{},"be":true,"msg":"请输入{{label}}","rule":"required"},"error":false,"tested":true},{"test":{"msg":"erorr 1"},"tested":true,"error":true,"msg":"erorr 1"}],"errors":[{"test":{"msg":"erorr 1"},"tested":true,"error":true,"msg":"erorr 1"}],"success":[{"test":{"regexp":{},"be":true,"msg":"请输入{{label}}","rule":"required"},"error":false,"tested":true}],"fail":true,"tested":true,"test":{"label":"(异步校验)1","value":"a","test":["required",null]}},{"tested":false,"test":{"label":"(异步校验)2","value":"a","test":["required",null]}}]
            // )
            done()
        }
    })
})
