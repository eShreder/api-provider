import pick from 'lodash/fp/pick'

export default (fields) => {
    const pickFields = pick(fields)

    return (target, key) => {
        const originalValue = target[key]

        target[key] = function(...props) {
            const data = props.pop()

            return originalValue.call(this, ...props, pickFields(data))
        }

        return target
    }
}
