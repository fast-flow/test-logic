import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('addRule', function (done) {
    var rules = {
        'demo': {
            regexp: /abc/,
            be:false,
            msg: '{{label}}不允许出现abc'
        }
    }
    Object.keys(rules).forEach(function (key) {
        test.addRule(key, rules[key])
    })
    test.check({
        label: '密码',
        value: 'abc',
        test: [
            'demo'
        ],
        finish: function (fail, errors) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('密码不允许出现abc')
            done()
        }
    })
})

it('addPriorRule', function (done) {
    var rules = {
        'demo2': function (pass, fail, value) {
            if (JSON.stringify(value) !== '[]') {
                pass()
            }
            else {
                fail('{{label}}必填')
            }
        }
    }
    Object.keys(rules).forEach(function (key) {
        test.addPriorRule(key, rules[key])
    })
    test.check({
        label: '密码',
        value: [],
        test: [
            'demo2',
            function (pass, fail, value) {
                pass()
            }
        ],
        finish: function (fail, errors) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('密码必填')
            done()
        }
    })
})

it('addPriorRule erorr2', function (done) {
    var rules = {
        'demo3': function (pass, fail, value) {
            if (JSON.stringify(value) === '[]') {
                fail('{{label}}必填')
            }
            else {
                pass()
            }
        }
    }
    Object.keys(rules).forEach(function (key) {
        test.addPriorRule(key, rules[key])
    })
    test.check({
        label: '密码',
        value: [],
        test: [
            'demo3',
            function (pass, fail, value) {
                if (value.indexOf(1) !== -1) {
                    fail('不能存在1')
                }
                else {
                    pass()
                }
            }
        ],
        finish: function (fail, errors) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('不能存在1')
            done()
        }
    })
})
