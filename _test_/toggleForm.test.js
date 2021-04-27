import { getTodaysDate } from '../src/client/js/app'

describe('testing the functionality for getting the current date', () => {
    test('getTodaysDate() function exists', () => {
        expect(getTodaysDate).toBeDefined()
    })
})