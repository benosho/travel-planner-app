import { getCityCoord } from '../src/client/js/app'

describe('testing the functionality for fetching coordinates for travel destinations', () => {
    test('get coordinates for Lagos, Nigeria', () => {
        getCityCoord('Lagos')
        .then((cityCoords) => {
            expect(cityCoords.geonames[0].lat).toBe('6.45407')
            expect(cityCoords[0].geonames.lng).toBe('3.39467')
        })
        .catch ((err) => {
            console.log('Error:', err.message)
        })
    })
    test('get coordinates for Marrakesh, Morocco', () => {
        getCityCoord('Marrakesh')
        .then((cityCoords) => {
            expect(cityCoords.geonames[0].lat).toBe('31.63416')
            expect(cityCoords[0].geonames.lng).toBe('-7.99994')
        })
        .catch ((err) => {
            console.log('Error:', err.message)
        })
    })
})