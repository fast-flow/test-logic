import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('function', function (done) {
    let randomText = String(Math.random())
    test.check({
        value: 'abc',
        label: '年龄',
        test: [
            {
                func: function (pass, fail, value) {
                    expect(value).to.eql('abc')
                    fail('自定义错误消息 sync:' + randomText)
                }
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('自定义错误消息 sync:' + randomText)
        }
    })
    test.check({
        value: 'abc',
        label: '年龄',
        test: [
            {
                func: function (pass, fail, value) {
                    expect(value).to.eql('abc')
                    setTimeout(function () {
                        fail('自定义错误消息 async:' + randomText)
                    }, 100)
                }
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(1)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('自定义错误消息 async:' + randomText)
        }
    })

    setTimeout(done, 200)
})
