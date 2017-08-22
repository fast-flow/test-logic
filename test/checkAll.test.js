import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
console.log('checkItem 部分 every true 异步every false')
it('checkAll 2 fail', function (done) {
    test.checkAll([
        {
            value: '1abcd',
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
            value: '二3',
            label: '用户名',
            test: [
                {
                    minByte: 4,
                    msg: '{{label}}不能少{{self.minByte}}个英文|{{self.minByteHalf}}个中文,当前字节{{valueByte}}'
                }
            ]
        }

    ], {
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors[1].msg).to.eql('用户名不能少4个英文|2个中文,当前字节3')
            expect(errors.length).to.eql(2)
            expect(data.length).to.eql(2)
            done()
        }
    })
})
it('checkAll 1 fail', function (done) {
    test.checkAll([
        {
            value: '1abcd',
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
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors.length).to.eql(1)
            expect(data.length).to.eql(2)
            done()
        }
    })
})

it('checkAll default queue:false', function (done) {
    test.checkAll([
        {
            value: '1',
            label: 'a',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        },
        {
            value: '2',
            label: 'b',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        }

    ], {
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[1].msg - errors[0].msg).to.be.within(0, 100)
            done()
        }
    })
})
it('checkAll default queue:true', function (done) {
    test.checkAll([
        {
            value: '1',
            label: 'a',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        },
        {
            value: '2',
            label: 'b',
            test: [
                {
                    func: function (psss, fail) {
                        setTimeout(function() {
                            fail(new Date().getTime())
                        }, 500)
                    }
                }
            ]
        }

    ], {
        queue: true,
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[1].msg - errors[0].msg).to.be.within(500, 600)
            done()
        }
    })
})


it('checkAll every: false', function (done) {
    test.checkAll([
        {
            value: '1abcd',
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
        queue: true,
        every: false,
        finish: function(fail, errors, data) {
            expect(fail).to.eql(true)
            expect(errors[0].msg).to.eql('用户名不能包含数字')
            expect(errors.length).to.eql(1)
            done()
        }
    })
})
