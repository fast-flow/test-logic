import TextLogic from "../lib/index"
import expect from "expect.js"
const test = new TextLogic()
it('syntactic-sugar email', function (done) {
    test.check({
        value: '1',
        label: '用户名',
        test: [
            'email'
        ],
        finish: function (fail, info) {
            expect(fail).to.eql(true)
            done()
        }
    })
})

it('syntactic-sugar non-existent', function (done) {
    try {
        test.check({
            value: '1',
            label: '用户名',
            test: [
                'non-existent'
            ],
            finish: function (fail, info) {
                
            }
        })
    }
    catch(err) {
        expect(err.message).to.eql('node_modules/test-logic: Not find rule[name] name is "non-existent"')
    }
    setTimeout(function() {
        done()
    }, 100)
})
