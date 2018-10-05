import remove from '../../decorators/remove'

describe('api decorators remove', () => {
    const context = {
        delete: jest.fn(() => 'remove method'),
    }

    it('should decorate easy string', () => {
        const part = {
            @remove()
            foo: '/url/path',
        }

        const result = part.foo.call(context, 'data')

        expect(context.delete).toBeCalledWith('/url/path', 'data')
        expect(result).toBe('remove method')
    })

    it('should decorate generator string', () => {
        const part = {
            @remove()
            foo({opt}) { return `/path/${opt}` }
        }

        const result = part.foo.call(context, { opt: 'foo' }, 'data')

        expect(context.delete).toBeCalledWith('/path/foo', 'data')
        expect(result).toBe('remove method')
    })

    it('should skip decorate when original method return not string', () => {
        const foo = { a: 1 }
        const context = {
            delete: jest.fn(() => 'remove method')
        }
        const part = {
            @remove()
            foo() { return foo }
        }

        const result = part.foo.call(context, { random: 1 }, 'data')

        expect(context.delete).not.toHaveBeenCalled()
        expect(result).toBe(foo)
    })
})
