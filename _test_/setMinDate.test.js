import { setMinDate, getTodaysDate } from '../src/client/js/app'

describe('testing the functionality for setting the earliest departure date', () => {
    test('min attribute set on the date field is today\'s date', () => {
        // Set up document body
        document.body.innerHTML =
            `<div>
            <input id="date" type="date"></input>
        </div>`
        setMinDate()
        expect(document.querySelector('#date').min).toBe(getTodaysDate())
    })
})