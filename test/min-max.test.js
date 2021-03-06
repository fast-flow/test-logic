import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('min', function (done) {
    test.check({
        value: '3',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁,当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].msg).to.eql('年龄不能小于4岁,当前输入3')
        }
    })
    test.check({
        value: 'sd',
        label: '年龄',
        test: [
            {
                rule: 'number',
                msg: '{{label}}必须输入数字'
            },
            {
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁,当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('年龄必须输入数字')
            expect(data.source[1].tested).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
it('max', function (done) {
    test.check({
        value: '6',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 4,
                msg: '{{label}}不能大于{{self.max}}岁,当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].msg).to.eql('年龄不能大于4岁,当前输入6')
        }
    })
    test.check({
        value: '4',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 4,
                msg: '{{label}}不能大于{{self.max}}岁,当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})

it('min max', function (done) {
    test.check({
        value: '3',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 10,
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁和大于{{self.max}},当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].msg).to.eql('年龄不能小于4岁和大于10,当前输入3')
        }
    })
    test.check({
        value: '4',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 10,
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁和大于{{self.max}},当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].error).to.eql(false)
        }
    })
    test.check({
        value: '10',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 10,
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁和大于{{self.max}},当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].error).to.eql(false)
        }
    })
    test.check({
        value: '11',
        label: '年龄',
        test: [
            {
                rule: 'number'
            },
            {
                max: 10,
                min: 4,
                msg: '{{label}}不能小于{{self.min}}岁和大于{{self.max}},当前输入{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(2)
            expect(data.source[0].error).to.eql(false)
            expect(data.source[1].error).to.eql(true)
            expect(data.source[1].msg).to.eql('年龄不能小于4岁和大于10,当前输入11')
        }
    })
    setTimeout(done, 10)
})
