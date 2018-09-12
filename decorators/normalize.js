import { normalize } from 'normalizr'

export default (schema, sync = false) => (target, key) => {
    const originalValue = target[key]

    target[key] = function(...args) {
        return originalValue.call(this, ...args).then((data) => {
            const result = normalize(data, schema)

            if (sync && this.emit) {
                this.emit('API/RECIVED_ENTITY', result)
            }

            return result
        })
    }
}
