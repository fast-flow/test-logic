import { Component } from "react"
import Testlogic from "../lib/index"
import Test from 'react-addons-test-utils'
import { delay } from "./util"
it('className', function (done) {
    var app = Test.renderIntoDocument(<Testlogic className="myclass" />)
    delay(done,[
        function checkClassName() {
            expect(Test.scryRenderedDOMComponentsWithClass(app, 'myclass').length)
                .toEqual(1)
            arguments[0]()
        }
    ])
})
