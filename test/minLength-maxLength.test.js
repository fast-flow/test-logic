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
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名至少4位')
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
        finish: function (fail, info) {
            expect(fail).to.eql(false)
            expect(info.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
