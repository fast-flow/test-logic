import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('regexp be true', function (done) {
    test.check({
        value: 'abcd1',
        label: '用户名',
        test: [
            {
                regexp: /\d/,
                be: false,
                msg: '{{label}}不能包含数字'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名不能包含数字')
        }
    })
    setTimeout(done, 10)
})
it('regexp be true', function (done) {
    test.check({
        value: 'abcd',
        label: '用户名',
        test: [
            {
                regexp: /\d/,
                be: true,
                msg: '{{label}}必须包含数字'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名必须包含数字')
        }
    })
    setTimeout(done, 10)
})
