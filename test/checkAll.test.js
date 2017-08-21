import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('checkAll', function (done) {
    test.checkAll([
        {
            value: 'abcd1',
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
        finish: function(fail, errors, source) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors.length).to.eql(1)
            expect(source.length).to.eql(2)
            done()
        }
    })
})
