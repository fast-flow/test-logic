import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('minLength', function (done) {
    test.check({
        value: '123',
        label: '用户名',
        test: [
            {
                minLength: 4,
                msg: '{{label}}至少{{self.minLength}}位'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名至少4位')
        }
    })
    test.check({
        value: '1234',
        label: '用户名',
        test: [
            {
                minLength: 4,
                msg: '{{label}}至少{{self.minLength}}位'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
it('maxLength', function (done) {
    test.check({
        value: '12345',
        label: '用户名',
        test: [
            {
                maxLength: 4,
                msg: '{{label}}最多{{self.maxLength}}位'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名最多4位')
        }
    })
    test.check({
        value: '1234',
        label: '用户名',
        test: [
            {
                maxLength: 4,
                msg: '{{label}}最多{{self.maxLength}}位'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            // expect(data.source[0].error).to.eql(false)
        }
    })
    test.check({
        value: '1',
        label: '用户名',
        test: [
            {
                maxLength: 4,
                minLength: 2,
                msg: '{{label}}至少{{self.minLength}}位，最多{{self.maxLength}}位，当前{{value}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名至少2位，最多4位，当前1')
        }
    })
    setTimeout(done, 10)
})
