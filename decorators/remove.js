export default () => (target, key) => {
    const originalValue = target[key]

    if (typeof originalValue === 'string') {
        target[key] = function(data) {
            return this.delete(originalValue, data)
        }
    }
    if (typeof originalValue === 'function') {
        target[key] = function(params, data) {
            const result = originalValue(params, data)

            if (typeof result !== 'string') {
                return result
            }

            return this.delete(result, data)
        }
    }

    return target
}
