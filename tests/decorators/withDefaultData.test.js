import withDefaultData from '../../decorators/withDefaultData'

describe('api decorators withDefaultData', () => {
    it('should add default data to last argument', () => {
        const part = {
            @withDefaultData({
                a: 1,
            })
            foo(data) {
                return data
            },
            @withDefaultData({
                b: 2,
            })
            bar(_, data) {
                return data
            },
        }

        expect(part.foo({ c: 3 })).toEqual({
            a: 1,
            c: 3,
        })
        expect(part.bar(0, { c: 3 })).toEqual({
            b: 2,
            c: 3,
        })
    })

    it('should`t replace fields in data', () => {
        const part = {
            @withDefaultData({
                a: 1,
                b: 2,
            })
            foo(data) {
                return data
            },
        }

        expect(part.foo({ a: 0, c: 3 })).toEqual({
            a: 0,
            b: 2,
            c: 3,
        })
    })
})
