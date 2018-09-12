import qs from 'qs'

const getSearch = (data) => {
    if (data && Object.keys(data).length > 0) {
        return `?${qs.stringify(data)}`
    }

    return ''
}

export default () => (target, key) => {
    const originalValue = target[key]

    if (typeof originalValue === 'string') {
        target[key] = function(data) {
            return this.get(`${originalValue}${getSearch(data)}`)
        }
    }
    if (typeof originalValue === 'function') {
        target[key] = function(params, data) {
            const result = originalValue(params, data)

            if (typeof result !== 'string') {
                return result
            }

            return this.get(`${result}${getSearch(data)}`)
        }
    }

    return target
}
