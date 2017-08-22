import extend from "extend"
import spare from "sparejs"
import delayEach from "delayeach"
const checkAllDefaultSettings = {
    every: true,
    queue: false
}
function checkAll (checks, settings) {
    const self = this
    settings = spare.settings(checkAllDefaultSettings, settings)
    let infos = []
    let checkoutCount = 0
    function callFinish() {
        let fail = infos.some(function (item) {
            return item.fail
        })
        let allError = []
        infos.forEach(function (data) {
            data.source.forEach(function (item) {
                if (item.error) {
                    allError.push(item)
                }
            })
        })
        settings.finish(fail, allError, infos)
    }
    /**
     * queue:true 时 self.check 完成时通过 next 进入下一个校验，
     * queue:false 时直接进入下一个校验
     */
    delayEach(
        checks,
        function handle(item, index, next, finish) {
            self.check(
                spare.settings(item, {
                    finish: function(fail, info) {
                        info.fail = fail
                        infos.push(info)
                        if (!settings.every && fail) {
                            callFinish()
                        }
                        else {
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
                    }
                })
            )
            if (!settings.queue) {
                next()
            }
        },
        function finish() {
            if (settings.queue) {
                callFinish()
            }
        }
    )
}
export default checkAll
