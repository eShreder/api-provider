import requestOptions from '../../decorators/request-options'

describe('api decorators request-options', () => {
    it('should prepare fields', () => {
        const part = {
            @requestOptions()
            foo(data) {
                return data
            },
        }
        const filter = { user: 'foo', id: [1, 2, 3] }
        const sort = { foo: 'ASC', bar: 'DESC' }

        expect(
            part.foo({
                filter,
                sort,
                foo: { field: '1' },
            })
        ).toEqual({
            filter: '{"user":"foo","id":[1,2,3]}',
            sort: '{"foo":"ASC","bar":"DESC"}',
            foo: { field: '1' },
        })
    })

    it('should`t add empty field', () => {
        const part = {
            @requestOptions()
            foo(data) {
                return data
            },
        }
        const filter = { user: 'foo', id: [1, 2, 3] }

        expect(
            part.foo({
                filter,
                foo: { field: '1' },
            })
        ).toEqual({
            filter: '{"user":"foo","id":[1,2,3]}',
            foo: { field: '1' },
        })
    })
})
