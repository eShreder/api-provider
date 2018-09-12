import get from '../../decorators/get'

describe('api decorators get', () => {
    const context = {
        get: jest.fn(() => 'get method'),
    }

    it('should decorate easy string', () => {
        const part = {
            @get()
            foo: '/url/path',
        }

        const result = part.foo.call(context)

        expect(context.get).toBeCalledWith('/url/path')
        expect(result).toBe('get method')
    })

    it('should decorate generator string', () => {
        const part = {
            @get()
            foo({ opt }) {
                return `/path/${opt}`
            },
        }

        const result = part.foo.call(context, { opt: 'foo' })

        expect(context.get).toBeCalledWith('/path/foo')
        expect(result).toBe('get method')
    })

    it('should generate query.search', () => {
        const part = {
            @get()
            foo({ opt }) {
                return `/path/${opt}`
            },
        }

        const result = part.foo.call(
            context,
            { opt: 'foo' },
            { foo: 1, bar: 2 }
        )

        expect(context.get).toBeCalledWith('/path/foo?foo=1&bar=2')
        expect(result).toBe('get method')
    })
    it('should skip decorate when original method return not string', () => {
        const foo = { a: 1 }
        const context = {
            get: jest.fn(),
        }
        const part = {
            @get()
            foo() {
                return foo
            },
        }
        const result = part.foo.call(context, { random: 1 }, 'data')

        expect(context.get).not.toHaveBeenCalled()
        expect(result).toBe(foo)
    })
})
