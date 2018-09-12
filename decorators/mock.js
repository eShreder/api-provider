export default (loaderMock) => (target, key) => {
    const originalValue = target[key]
    
    target[key] = function(...args) {
        return originalValue.call(this, ...args)
            .catch(async (error) => ({
                data: await loaderMock(...args, error)
            }))
    }

    return target
}
