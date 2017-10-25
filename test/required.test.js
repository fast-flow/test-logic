import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()

it('fail', function (done) {
    test.check({
        value: '',
        label: '用户名',
        test: [
            {
                rule: 'required',
                msg: '{{label}}必填'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名必填')
            expect(data.errors[0].msg).to.eql('用户名必填')
            expect(data.successes.length).to.eql(0)
            expect(data.untested.length).to.eql(0)
            done()
        }
    })
})
it('pass', function (done) {
    test.check({
        value: 'abc',
        label: '用户名',
        test: [
            {
                rule: 'required',
                msg: '{{label}}必填'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source[0].error).to.eql(false)
            done()
        }
    })
})
it('pass ["required", "email"]', function (done) {
    test.check({
        value: 'sadasd',
        label: '邮箱',
        test: [
            {
                rule: 'required',
                msg: '{{label}}必填'
            },
            {
                rule: 'email'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].error).to.eql(true)
            expect(data.source[1].msg).to.eql('邮箱的格式不正确')
            done()
        }
    })
})
it('fail ["required", "email"]', function (done) {
    test.check({
        value: '',
        label: '用户名',
        test: [
            {
                rule: 'required',
                msg: '{{label}}必填'
            },
            {
                rule: 'email'
            },
            {
                rule: 'number'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名必填')
            expect(data.source[1].tested).to.eql(false)
            expect(data.source.length).to.eql(3)
            done()
        }
    })
})
it('no required ignore check email', function (done) {
    test.check({
        value: '',
        label: '用户名',
        test: [
            {
                rule: 'email'
            },
            {
                rule: 'number'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(2)
            done()
        }
    })
})
