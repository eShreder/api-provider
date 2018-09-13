import { normalize } from 'normalizr'
import nDecorator from '../../decorators/normalize'
import { ON_RECIVED } from '../../constants'

jest.mock('normalizr')

describe('api decorators normalize', () => {
    it('should call normalize', async () => {
        normalize.mockReturnValue('RESULT NORMALIZE')

        const response = { data: 'ok' }
        const part = {
            @nDecorator('SCHEMA')
            foo: (data) => {
                return Promise.resolve(data)
            },
        }
        const result = await part.foo.call({}, response)

        expect(result).toBe('RESULT NORMALIZE')
        expect(normalize).toBeCalledWith(response, 'SCHEMA')
    })

    it('should emit notification', async () => {
        normalize.mockReturnValue('RESULT_NORMALIZE')

        const part = {
            @nDecorator('SCHEMA', true)
            foo: () => {
                return Promise.resolve('result')
            },
        }
        const context = {
            emit: jest.fn(),
        }

        expect(await part.foo.call(context)).toBe('RESULT_NORMALIZE')
        expect(context.emit).toBeCalledWith(ON_RECIVED, 'RESULT_NORMALIZE')
    })
})
