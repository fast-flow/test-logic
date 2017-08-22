import extend from "extend"
import spare from "sparejs"
import delayEach from "delayeach"
function checkAll (checks, settings) {
    const self = this
    let infos = []
    let checkoutCount = 0
    function callFinish() {
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
    // queue:true 时 self.check 完成时通过 next 进入下一个校验，
    // 为 false 时直接进入下一个校验
    delayEach(
        checks,
        function handle(item, index, next, finish) {
            if (!settings.queue) {
                next()
            }
            self.check(
                spare.settings(item, {
                    finish: function(fail, info) {
                        infos.push({
                            fail,
                            info
                        })
                        if (settings.queue) {
                            next()
                        }
                        else {
                            checkoutCount++
                            if (checkoutCount === checks.length) {
                                callFinish()
                            }
                        }
                    }
                })
            )
        },
        function finish() {
            if (settings.queue) {
                callFinish()
            }
        }
    )
}
export default checkAll
