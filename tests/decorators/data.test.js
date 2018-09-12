import data from '../../decorators/data'

describe('Api decorator data', () => {
    it('should return data from return object', async () => {
        const part = {
            @data()
            foo() {
                return Promise.resolve({
                    data: 'data',
                })
            },
        }

        expect(await part.foo()).toBe('data')
    })

    it('should exec custom prepare response', async () => {
        const part = {
            @data({
                prepare: [
                    (obj) => ({ ...obj, data: obj.data + obj.foo }),
                    (obj) => ({ ...obj, data: obj.data + obj.bar }),
                ],
            })
            foo() {
                return Promise.resolve({
                    data: 'it',
                    foo: '`s ',
                    bar: 'work!',
                })
            },
        }

        expect(await part.foo()).toBe('it`s work!')
    })

    it('should exec custom postProcessing with request arguments', async () => {
        const part = {
            @data({
                postProcessing: [
                    (args, data) => ({ ...data, id: args[0] }),
                    (args, data) => ({ ...data, bar: args[1] }),
                    (args, data) => {
                        if (args[2]) {
                            throw new Error()
                        }

                        return data
                    },
                ],
            })
            foo() {
                return Promise.resolve({
                    data: { foo: 'foo' },
                })
            },
        }

        expect(await part.foo(10, 20)).toEqual({
            foo: 'foo',
            id: 10,
            bar: 20,
        })

        try {
            await part.foo(10, 20, 30)

            expect('where my error?').toBe(0)
        } catch (error) {}
    })

    it('should propagation error', async () => {
        const part = {
            @data({})
            foo() {
                return Promise.reject(new Error('test'))
            },
        }

        try {
            await part.foo()
            expect('where my error?').toBe(0)
        } catch (error) {
            expect(error.message).toBe('test')
        }
    })
})
