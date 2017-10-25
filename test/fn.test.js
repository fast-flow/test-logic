import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('function error', function (done) {
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
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('自定义错误消息 sync:' + randomText)
            done()
        }
    })
})

it('function pass', function (done) {
    test.check({
        value: 'abc',
        label: '年龄',
        test: [
            function (pass, fail, value) {
                expect(value).to.eql('abc')
                pass()
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(false)
            done()
        }
    })
})
it('function pass async', function (done) {
    test.check({
        value: 'abc',
        label: '年龄',
        test: [
            {
                func: function (pass, fail, value) {
                    expect(value).to.eql('abc')
                    setTimeout(function () {
                        pass()
                    }, 100)
                }
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(false)
            done()
        }
    })
})
it('function fail async', function (done) {
    test.check({
        value: 'abc',
        label: '年龄',
        test: [
            {
                func: function (pass, fail, value) {
                    expect(value).to.eql('abc')
                    setTimeout(function () {
                        fail('自定义错误消息 async:')
                    }, 100)
                }
            }
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            expect(data.source.length).to.eql(1)
            expect(data.source[0].error).to.eql(true)
            expect(data.source[0].msg).to.eql('自定义错误消息 async:')
            done()
        }
    })
})
