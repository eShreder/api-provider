import { normalize } from 'normalizr'
import { ON_RECIVED } from '../constants'

export default (schema, sync = false) => (target, key) => {
    const originalValue = target[key]

    target[key] = function(...args) {
        return originalValue.call(this, ...args).then((data) => {
            const result = normalize(data, schema)

            if (sync && this.emit) {
                this.emit(ON_RECIVED, result)
            }

            return result
        })
    }

    return target
}
