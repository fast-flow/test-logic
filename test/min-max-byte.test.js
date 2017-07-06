import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('minByte', function (done) {
    test.check({
        value: '二3',
        label: '用户名',
        test: [
            {
                minByte: 4,
                msg: '{{label}}不能少{{self.minByte}}个英文|{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名不能少4个英文|2个中文,当前字节3')
        }
    })
    test.check({
        value: '二四',
        label: '用户名',
        test: [
            {
                minByte: 4,
                msg: '{{label}}不能少{{self.minByte}}个英文|{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(false)
            expect(info.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
