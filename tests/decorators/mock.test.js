import mock from '../../decorators/mock'

describe('api decorators mock', () => {
    it('should return data from resolved request', async () => {
        const part = {
            @mock(() => 'mock')
            foo(data) {
                return Promise.resolve(data)
            },
        }

        expect(await part.foo({ a: 1, b: 2 })).toEqual({
            a: 1,
            b: 2,
        })
    })

    it('should return mock data in field data', async () => {
        const part = {
            @mock((...args) => ({
                args,
                foo: 'mock',
            }))
            foo(data) {
                return Promise.reject('test error')
            },
        }

        expect(await part.foo(1, 2)).toEqual({
            data: {
                args: [1, 2, 'test error'],
                foo: 'mock',
            },
        })
    })
})
