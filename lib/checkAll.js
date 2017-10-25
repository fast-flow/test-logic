import extend from "extend"
import spare from "sparejs"
import delayEach from "delayeach"
import removeVerboseAttr from "./removeVerboseAttr"
const checkAllDefaultSettings = {
    every: true,
    queue: false
}
function checkAll (checks, settings) {
    const self = this
    settings = spare.settings(checkAllDefaultSettings, settings)
    let data = []
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
        let fail = data.some(function (item) {
            return item.fail
        })
        let errors = []
        data.forEach(function (item) {
            if (item.tested) {
                item.source.forEach(function (item) {
                    if (item.error) {
                        errors.push(item)
                    }
                })
            }
        })
        errors = errors.map(removeVerboseAttr)
        settings.finish(fail, errors, data)
    }
    // 如果 callFinish 调用过 checkItem 则不会校验
    let checkItem = function (item, index, settings, callback) {
        if (isCalledFinish()) {
            return
        }
        self.check(
            spare.settings(item, {
                finish: function(fail ,errors, info) {
                    info.fail = fail
                    info.tested = true
                    info.check = item
                    data[index]= info
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
    // 为了应对 every: false 提前将 data 的内容填充 未校验标识
    data = checks.map(function (item) {
        return {
            tested: false,
            check: item
        }
    })
    /**
     * queue:true 时 self.check 完成时通过 next 进入下一个校验，
     * queue:false 时直接进入下一个校验
     */
    if (settings.queue) {
        delayEach(
            checks,
            function handle(item, index, next, finish) {
                checkItem(item, index, settings, function callback (type) {
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
        checks.forEach(function (item, index) {
            checkItem(item, index, settings, function callback (type) {
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
