export default function addPriorRule (name, rule) {
    const self = this
    if (typeof self.rule[name] !== 'undefined') {
        throw new Error(`node_modules/test-logic: test.addPriorRule("${name}", {...}) "${name}" existing!` )
    }
    self.rule[name] = rule
    self.priorRule.push(name)
}
