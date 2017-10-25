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
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名不能少4个英文|2个中文,当前字节3')
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
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
it('maxByte', function (done) {
    test.check({
        value: '二四5',
        label: '用户名',
        test: [
            {
                maxByte: 4,
                msg: '{{label}}不能大于{{self.maxByte}}个英文|{{self.maxByteHalf}}个中文,当前字节{{valueByte}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名不能大于4个英文|2个中文,当前字节5')
        }
    })
    test.check({
        value: '二四',
        label: '用户名',
        test: [
            {
                maxByte: 4,
                msg: '{{label}}不能大于{{self.maxByte}}个英文|{{self.maxByteHalf}}个中文,当前字节{{valueByte}}'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})

it('minByte maxByte', function (done) {
    test.check({
        value: '二',
        label: '用户名',
        test: [
            {
                minByte: 3,
                maxByte: 8,
                msg: '{{label}}不能大于{{self.maxByte}}字节,不能小于{{self.minByte}}字节'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名不能大于8字节,不能小于3字节')
        }
    })
    test.check({
        value: '二四六八9',
        label: '用户名',
        test: [
            {
                minByte: 3,
                maxByte: 8,
                msg: '{{label}}不能大于{{self.maxByte}}字节,不能小于{{self.minByte}}字节'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('用户名不能大于8字节,不能小于3字节')
        }
    })
    test.check({
        value: '二四六八',
        label: '用户名',
        test: [
            {
                minByte: 3,
                maxByte: 8,
                msg: '{{label}}不能大于{{self.maxByte}}字节,不能小于{{self.minByte}}字节'
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source[0].error).to.eql(false)
        }
    })
    setTimeout(done, 10)
})
