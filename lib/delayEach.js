/**
 * function - 延迟遍历
 * @param {array} task
 * @param {taskHandle}
 * @param {finishCallback}
 */
/**
  * @callback - itemHandle
  * @param {any} - value
  * @param {function} - next
  * @param {number} - index
  */
 /**
  * @callback - finishCallback
  */
export default function delayEach(task, itemHandle, finishCallback) {
    const taskCount = task.length
    function handleTask(index) {
        itemHandle(task[index], index, function next () {
            let nextIndex = index + 1
            if (nextIndex !== taskCount) {
                handleTask(index + 1)
            }
            else {
                finishCallback()
            }
        }, function finish() {
            finishCallback()
        })
    }
    handleTask(0)
}
