import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
// it('every default false', function (done) {
//     test.check({
//         value: 'abcd1',
//         label: '用户名',
//         test: [
//             {
//                 regexp: /\d/,
//                 be: false,
//                 msg: '{{label}}不能包含数字'
//             },
//             {
//                 regexp: /a/,
//                 be: false,
//                 msg: '{{label}}不能包含a'
//             }
//         ],
//         finish: function (fail, info) {
//             expect(fail).to.eql(true)
//             expect(info.source.length).to.eql(2)
//             expect(info.source[0].tested).to.eql(true)
//             expect(info.source[0].error).to.eql(true)
//             expect(info.source[0].msg).to.eql('用户名不能包含数字')
//             expect(info.source[1].tested).to.eql(false)
//             expect(info.source[1].error).to.eql(undefined)
//             done()
//         }
//     })
// })

it('every true', function (done) {
    test.check({
        value: 'abcd1',
        label: '用户名',
        every: true,
        test: [
            {
                regexp: /\d/,
                be: false,
                msg: '{{label}}不能包含数字'
            },
            {
                regexp: /a/,
                be: false,
                msg: '{{label}}不能包含a'
            }
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            expect(info.source.length).to.eql(2)
            expect(info.source[0].error).to.eql(true)
            expect(info.source[0].msg).to.eql('用户名不能包含数字')
            expect(info.source[1].error).to.eql(true)
            expect(info.source[1].msg).to.eql('用户名不能包含a')
            done()
        }
    })
})
