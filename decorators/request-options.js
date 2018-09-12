const stringify = (obj, key) => {
    if (obj.hasOwnProperty(key) && typeof obj[key] != 'string') {
        return {
            ...obj,
            [key]: JSON.stringify(obj[key]),
        }
    }

    return obj
}

const prepareFields = (obj) => ['filter', 'sort'].reduce(stringify, obj)

export default () => {
    return (target, key) => {
        const originalValue = target[key]

        target[key] = function(...props) {
            const data = props.pop() || {}

            return originalValue.call(this, ...props, prepareFields(data))
        }

        return target
    }
}
