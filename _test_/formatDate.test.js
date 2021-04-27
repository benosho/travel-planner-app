import { formatDate } from '../src/client/js/app'

const rawDate = [
    '2021-04-29',
    '2024-12-16',
    '2029-08-01',
    '2022-10-06'
]

const formattedDate = [
    'Apr 29, 2021',
    'Dec 16, 2024',
    'Aug 1, 2029',
    'Oct 6, 2022'
]

describe('testing the date formatting functionality', () => {
    test('2021-04-29 outputs as Apr 29, 2021', () => {
        expect(formatDate(rawDate[0])).toBe(formattedDate[0])
    })
    test('2024-12-16 outputs as Dec 16, 2024', () => {
        expect(formatDate(rawDate[1])).toBe(formattedDate[1])
    })
    test('2029-08-01 outputs as Aug 1, 2029', () => {
        expect(formatDate(rawDate[2])).toBe(formattedDate[2])
    })
    test('2022-10-06 outputs as Oct 6, 2022', () => {
        expect(formatDate(rawDate[3])).toBe(formattedDate[3])
    })
})