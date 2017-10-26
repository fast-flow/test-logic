export default function addRule (name, rule) {
    const self = this
    if (typeof self.rule[name] !== 'undefined') {
        throw new Error(`node_modules/test-logic: test.addRule("${name}", {...}) "${name}" existing!` )
    }
    self.rule[name] = rule
}
