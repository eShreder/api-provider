import ApiProvider from '../provider'

describe('ApiProvider', () => {
    const FooPart = {
        _name: 'foo',
        method_1() {
            return 'foo-method-1'
        },
        testContext() {
            return this
        },
    }
    const BarPart = {
        _name: 'bar',
        _hiden: () => 'hiden',
        method_2() {
            return 'bar-method-2'
        },
    }

    describe('register', () => {
        let api = null
        const emitter = { emit: jest.fn() }
        const transport = {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            delete: jest.fn(),
            defaults: {
                headers: {
                    common: {
                        foo: 'default',
                    },
                },
            },
        }

        beforeAll(() => {
            api = new ApiProvider(transport, emitter)
        })
        it('should register part', () => {
            api.registerPartsApi(FooPart, BarPart)

            expect(api._methods).toEqual({
                foo: {
                    method_1: expect.any(Function),
                    testContext: expect.any(Function),
                },
                bar: { method_2: expect.any(Function) },
            })
        })
        it('should throw error repeat', () => {
            try {
                api.registerPartApi(FooPart)
            } catch (error) {
                expect(error.message).toBe(ApiProvider.METHOD_EXISTS)
            }
        })
        xit('should bind context', () => {})
    })

    xdescribe('credentials', () => {
        xit('should set', () => {})
        xit('should clear', () => {})
    })
})
