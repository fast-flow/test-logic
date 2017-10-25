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
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            done()
        }
    })
})

it('syntactic-sugar required', function (done) {
    test.check({
        value: '',
        label: '用户名',
        test: [
            'required'
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(true)
            done()
        }
    })
})
it('syntactic-sugar required', function (done) {
    test.check({
        value: '1',
        label: '用户名',
        test: [
            'required'
        ],
        finish: function (fail, errors, data) {
            expect(fail).to.eql(false)
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
            finish: function (fail, errors, data) {

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
