import post from '../../decorators/post'

describe('api decorators post', () => {
    const context = {
        post: jest.fn(() => 'post method'),
    }

    it('should decorate easy string', () => {
        const part = {
            @post()
            foo: '/url/path',
        }

        const result = part.foo.call(context, 'data')

        expect(context.post).toBeCalledWith('/url/path', 'data')
        expect(result).toBe('post method')
    })

    it('should decorate generator string', () => {
        const part = {
            @post()
            foo({opt}) { return `/path/${opt}` }
        }

        const result = part.foo.call(context, { opt: 'foo' }, 'data')

        expect(context.post).toBeCalledWith('/path/foo', 'data')
        expect(result).toBe('post method')
    })

    it('should skip decorate when original method return not string', () => {
        const foo = { a: 1 }
        const context = {
            post: jest.fn(() => 'post method')
        }
        const part = {
            @post()
            foo() { return foo }
        }

        const result = part.foo.call(context, { random: 1 }, 'data')

        expect(context.post).not.toHaveBeenCalled()
        expect(result).toBe(foo)
    })

    it('should call fn with more params', () => {
        const context = {
            post: jest.fn()
        }
        const part = {
            @post()
            foo(params) { return 'url from call' }
        }

        part.foo.call(context, 'params', 'data', 'options', 'random')

        expect(context.post).toHaveBeenCalledWith('url from call', 'data', 'options', 'random')
    })
})
