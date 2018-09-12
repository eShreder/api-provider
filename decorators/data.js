import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import pipe from 'lodash/fp/pipe'

export default ({ prepare = [], postProcessing = [] } = {}) => {
    const prepareData = pipe(
        ...prepare,
        get('data')
    )

    return (target, key) => {
        const originalValue = target[key]

        target[key] = function(...args) {
            return originalValue
                .call(this, ...args)
                .then(prepareData)
                .then(pipe(map((fn) => fn.bind(null, args), postProcessing)))
        }

        return target
    }
}
