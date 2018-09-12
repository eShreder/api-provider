import patch from '../../decorators/patch'

describe('api decorators patch', () => {
    const context = {
        patch: jest.fn(() => 'patch method'),
    }

    it('should decorate easy string', () => {
        const part = {
            @patch()
            foo: '/url/path',
        }

        const result = part.foo.call(context, 'data')

        expect(context.patch).toBeCalledWith('/url/path', 'data')
        expect(result).toBe('patch method')
    })

    it('should decorate generator string', () => {
        const part = {
            @patch()
            foo({opt}) { return `/path/${opt}` }
        }

        const result = part.foo.call(context, { opt: 'foo' }, 'data')

        expect(context.patch).toBeCalledWith('/path/foo', 'data')
        expect(result).toBe('patch method')
    })

    it('should skip decorate when original method return not string', () => {
        const foo = { a: 1 }
        const context = {
            patch: jest.fn(() => 'patch method')
        }
        const part = {
            @patch()
            foo() { return foo }
        }

        const result = part.foo.call(context, { random: 1 }, 'data')

        expect(context.patch).not.toHaveBeenCalled()
        expect(result).toBe(foo)
    })
})