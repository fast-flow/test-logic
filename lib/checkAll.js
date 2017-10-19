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
    let callFinishCount = 0
    function isCalledFinish() {
        return callFinishCount !== 0
    }
    // callFinish 只会调用一次
    function callFinish() {
        if (isCalledFinish()) {
            return
        }
        callFinishCount++
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
    // 如果 callFinish 调用过 checkItem 则不会校验
    let checkItem = function (item, settings, callback) {
        if (isCalledFinish()) {
            return
        }
        self.check(
            spare.settings(item, {
                finish: function(fail, info) {
                    info.fail = fail
                    infos.push(info)
                    if (typeof item.finish === 'function') {
                        item.finish.apply(item, arguments)
                    }
                    if (!settings.every && fail) {
                        callback('over')
                    }
                    else {
                        callback('next')
                    }
                }
            })
        )
    }
    /**
     * queue:true 时 self.check 完成时通过 next 进入下一个校验，
     * queue:false 时直接进入下一个校验
     */
    if (settings.queue) {
        delayEach(
            checks,
            function handle(item, index, next, finish) {
                checkItem(item, settings, function callback (type) {
                    switch(type) {
                        case 'over':
                            finish()
                        break
                        case 'next':
                            next()
                        break
                    }
                })
            },
            function finish(type) {
                callFinish()
            }
        )
    }
    else {
        checks.forEach(function (item) {
            checkItem(item, settings, function callback (type) {
                switch(type) {
                    case 'over':
                        callFinish()
                    break
                    case 'next':
                        checkoutCount++
                        if (checkoutCount === checks.length) {
                            callFinish()
                        }
                    break
                }
            })
        })
    }
}
export default checkAll
