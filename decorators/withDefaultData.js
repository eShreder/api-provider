export default (defaultData) => (target, key) => {
    const originalValue = target[key]

    target[key] = function(...props) {
        const data = props.pop()

        return originalValue.call(this, ...props, {
            ...defaultData,
            ...data,
        })
    }

    return target
}
