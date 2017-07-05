import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('required', function (done) {
    test.check({
        value: '',
        label: '用户名',
        test: [
            {
                rule: 'required',
                msg: '{{label}}必填'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名必填')
            done()
        }
    })
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
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source[0].error).to.eql(false)
            expect(info.source[1].error).to.eql(true)
            expect(info.source[1].msg).to.eql('邮箱的格式不正确')
            done()
        }
    })
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
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名必填')
            expect(info.source[1].tested).to.eql(false)
            done()
        }
    })
})
