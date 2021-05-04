const request = require('supertest')
const app = require('../src/server/server')
import 'regenerator-runtime/runtime'

describe('testing end points on Express server', () => {
    test('send POST request to the /test/add endpoint', async () => {
        const response = await request(app)
            .post('/express/test')
            .send({
                city: 'Lagos',
                country: 'Nigeria',
                high_temp: 31.3,
                low_temp: 25.9,
                weather_desc: 'Thunderstorm with rain',
            })

        expect(response.statusCode).toEqual(200)
    })
})