var React = require('react')
var Testlogic = require('test-logic').default
var App = React.createClass({
    getInitialState: function () {
        return {
            show: true
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                {
                    self.state.show?
                    (
                        <Testlogic onClose={function() {
                                self.setState({
                                    show: false
                                })
                            }} >basic</Testlogic>
                    ):null
                }
            </div>
        )
    }
})
module.exports = App
