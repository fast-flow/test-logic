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
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名不能包含数字')
            done()
        }
    })
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
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名必须包含数字')
            done()
        }
    })
})
