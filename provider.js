import curry from 'lodash/curry'
import filter from 'lodash/fp/filter'
import get from 'lodash/get'
import keys from 'lodash/fp/keys'
import map from 'lodash/fp/map'
import pipe from 'lodash/fp/pipe'
import set from 'lodash/set'
import { METHOD_EXISTS } from './constants'

const omitFields = filter((key) => key[0] !== '_')
const getMethods = pipe(
    keys,
    omitFields
)
const bindContext = curry((context, obj) =>
    getMethods(obj).reduce(
        (acc = {}, key) => ({
            ...acc,
            [key]: obj[key].bind(context),
        }),
        {}
    )
)

export class ApiProvider {
    static METHOD_EXISTS = METHOD_EXISTS
    _methods = {}

    constructor(transport, emitter) {
        this._transport = transport
        this._emitter = emitter

        this.bindContext = bindContext({
            get: (...params) => this._transport.get(...params),
            post: (...params) => this._transport.post(...params),
            delete: (...params) => this._transport.delete(...params),
            patch: (...params) => this._transport.patch(...params),
            emit: (...params) => this._emitter.emit(...params),
        })
    }
    setCredentials = (obj = {}) => {
        Object.assign(this._transport.defaults.headers.common, obj)
    }
    registerPartApi = (part) => {
        const name = part._name

        if (get(this._methods, name)) {
            throw new Error(ApiProvider.METHOD_EXISTS)
        } else {
            set(this._methods, name, this.bindContext(part))
        }
    }
    registerPartsApi = (...parts) => map(this.registerPartApi, parts)
}

export default ApiProvider
