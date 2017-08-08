import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('equal', function (done) {
    test.check({
        value: '3',
        label: '年龄',
        test: [
            {
                equal: '123',
                msg: '{{label}}不等于{{self.equal}}'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('年龄不等于123')
            done()
        }
    })
})
it('equal pass', function (done){
    test.check({
        value: '123',
        label: '年龄',
        test: [
            {
                equal: '123',
                msg: '{{label}}不等于{{self.equal}}'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(false)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(false)
            done()
        }
    })
})

it('notEqual', function (done) {
    test.check({
        value: '123',
        label: '年龄',
        test: [
            {
                notEqual: '123',
                msg: '{{label}}不能等于{{self.notEqual}}'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('年龄不能等于123')

            test.check({
                value: '12',
                label: '年龄',
                test: [
                    {
                        notEqual: '123',
                        msg: '{{label}}不能等于{{self.notEqual}}'
                    }
                ],
                finish: function (fail, info) {
                    expect(fail).to.eql(false)
                    expect(info.source.length).to.eql(1)
                    expect(info.source[0].error).to.eql(false)
                    done()
                }
            })


        }
    })
})
