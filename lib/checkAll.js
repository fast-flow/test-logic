import extend from "extend"
import spare from "sparejs"
import delayEach from "delayeach"
function checkAll (checks, settings) {
    const self = this
    var infos = []
    console.log('checkAll.js 注意这里应该是并发多个校验')
    // settings.queue: true
    delayEach(
        checks,
        function handle(item, index, next, finish) {
            self.check(
                spare.settings(item, {
                    finish: function(fail, info) {
                        infos.push({
                            fail,
                            info
                        })
                        next()
                    }
                })
            )
        },
        function finish() {
            let fail = infos.some(function (item) {
                return item.fail
            })
            let allError = []
            infos.forEach(function (data) {
                data.info.source.forEach(function (item) {
                    if (item.error) {
                        allError.push(item)
                    }
                })
            })
            settings.finish(fail, allError, infos)
        }
    )
}
export default checkAll
