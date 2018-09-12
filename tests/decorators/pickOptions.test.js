import pickOptions from '../../decorators/pickOptions'

describe('api decorators pickOptions', () => {
    it('should filter field in last argument', () => {
        const part = {
            @pickOptions(['a', 'b'])
            foo(data) {
                return data
            },
            @pickOptions(['b'])
            bar(_, data) {
                return data
            },
        }

        expect(part.foo({ a: 1, b: 2, c: 3 })).toEqual({
            a: 1,
            b: 2,
        })
        expect(part.bar(0, { a: 1, b: 2, c: 3 })).toEqual({
            b: 2,
        })
    })
})
