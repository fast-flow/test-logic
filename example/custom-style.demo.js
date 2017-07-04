var React = require('react')
var Testlogic = require('test-logic').default
var App = React.createClass({
    render: function () {
        return (
            <Testlogic themes="info" >basic</Testlogic>
        )
    }
})
module.exports = App
