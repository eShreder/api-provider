export default () => (target, key) => {
    const originalValue = target[key]

    if (typeof originalValue === 'string') {
        target[key] = function(...args) {
            return this.post(originalValue, ...args)
        }
    }
    if (typeof originalValue === 'function') {
        target[key] = function(params, ...args) {
            const result = originalValue(params, ...args)

            if (typeof result !== 'string') {
                return result
            }

            return this.post(result, ...args)
        }
    }

    return target
}
