/**
 * Import statements
 */

 import 'regenerator-runtime/runtime'

// Load spin.js for animated progress indicator. Comment out when running Jest tests because of conflicts
import { Spinner } from 'spin.js'

/**
 * Global Variables
 */

let addedTrips = localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp')) : [] // Array of added trips
let savedTrips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [] // Array of saved trips


/**
 * Helper functions
 */

// Load spinner (i.e., animated progress indicator)
const uiSpinner = () => {
    const spinnerEl = document.querySelector('#spinner')
    const spinner = new Spinner({ color: '#1484e8', scale: 1.2 }).spin(spinnerEl)
    return spinner
}

// Format date as [Month Date, Year]
const formatDate = (rawDate) => {
    const d = new Date(rawDate)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const formattedDate = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
    return formattedDate
}

const getTodaysDate = () => {
    const today = new Date()
    const timeZoneOffset = today.getTimezoneOffset() * 60000
    const todayISOString = (new Date(Date.now() - timeZoneOffset)).toISOString().split('T')[0]
    return todayISOString
}

// Set earliest departure date on date picker
const setMinDate = () => {
    document.querySelector('#date').setAttribute('min', getTodaysDate())
}

// Countdown to departure date
const countDown = (departureDate) => {
    const millisecPerDay = 1000 * 60 * 60 * 24
    const currDate = new Date()
    currDate.setHours(0, 0, 0, 0)
    const futureDate = new Date(departureDate)
    futureDate.setHours(0, 0, 0, 0)
    const daysToDeparture = (futureDate.getTime() - currDate.getTime()) / millisecPerDay
    return daysToDeparture
}

// Toggle the "add trip" form
const toggleForm = () => {
    const appStart = document.querySelector('.app-start')
    const addTripForm = document.querySelector('.add-trip-form')
    const addTripToggle = document.querySelector('.add-trip-toggle')
    const addTripBtn = document.querySelector('.add-trip-btn')
    const closeFormBtn = document.querySelector('.close-form-btn')
    window.addEventListener('click', (e) => {
        if (e.target === addTripToggle || e.target === addTripBtn || e.target === closeFormBtn) {
            addTripForm.classList.toggle('hidden')
            if (addTripForm.classList.contains('hidden')) {
                addTripToggle.children[0].classList.add('fa-toggle-off')
                addTripToggle.children[0].classList.remove('fa-toggle-on')
                const result = document.querySelectorAll('.trip-data > ul > li')
                if (result.length === 0) {
                    appStart.hidden = false
                }
            }
            else {
                addTripToggle.children[0].classList.add('fa-toggle-on')
                addTripToggle.children[0].classList.remove('fa-toggle-off')
                appStart.hidden = true
                setMinDate()
            }
        }
    })
}

// Scroll to the top of viewport when floating button is clicked:
function scrollToTopOnClick() {
    const scrollBtn = document.querySelector('#scroll-to-top')
    scrollBtn.hidden = true
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > window.innerHeight / 2) {
            scrollBtn.hidden = false
        }
        else {
            scrollBtn.hidden = true
        }
    })
    scrollBtn.addEventListener('click', () => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    })
}

// GET request to GeoNames API
const getCityCoord = async (cityName = '', url = 'http://api.geonames.org/search?', apiID = process.env.API_ID_GEONAMES) => {
    const apiResponse = await fetch(url + 'name_equals=' + cityName + '&type=json' + '&username=' + apiID)
    try {
        const cityData = await apiResponse.json()
        return cityData
    }
    catch (err) {
        console.log('Error:', err.message)
    }
}

// GET request to Weatherbit API
const getWeather = async (latVal = '', longVal = '', url = 'https://api.weatherbit.io/v2.0/forecast/daily?', apiKey = process.env.API_KEY_WEATHERBIT) => {
    const apiResponse = await fetch(url + 'lat=' + latVal + '&lon=' + longVal + '&key=' + apiKey)
    try {
        const weatherForecast = await apiResponse.json()
        return weatherForecast
    }
    catch (err) {
        console.log('Error:', err.message)
    }
}

// GET requests to Pixabay API
const getFeaturedImg = async (cityName = '', countryName = '', url = 'https://pixabay.com/api/?', apiKey = process.env.API_KEY_PIXABAY) => {
    let apiResponse = await fetch(url + 'key=' + apiKey + '&q=' + encodeURIComponent(cityName + ' ' + countryName) + '&image_type=photo' + '&category=travel' + '&orientation=horizontal')
    try {
        const imageData = await apiResponse.json()
        if (imageData.hits[0]) {
            return imageData.hits[0].webformatURL
        }
        else {
            apiResponse = await fetch(url + 'key=' + apiKey + '&q=' + encodeURIComponent(countryName) + '&image_type=photo' + '&category=travel' + '&orientation=horizontal')
            try {
                const imageData = await apiResponse.json()
                if (imageData.hits[0]) {
                    return imageData.hits[0].webformatURL
                }
            }
            catch (err) {
                console.log('Error:', err.message)
            }
        }
    }
    catch (err) {
        console.log('Error:', err.message)
    }
}

// Update UI with travel data
const updateUI = async (featuredImgURL, cityName, countryName, departureDate, daysToDeparture, weatherForecast, update) => {
    try {
        addedTrips.push({ city: cityName, country: countryName, departing: departureDate, weather: weatherForecast })
        let uiContent = `<div class="featured-img"><img src="${featuredImgURL}" width="100%"></div>`
        uiContent += `<div class="trip-description"><span class="title">My trip to: ${cityName}, ${countryName}</span>`
        uiContent += `<span class="departure-date">Departing: ${formatDate(departureDate)}</span>`
        if (update.data === "search") {
            uiContent += `<span class="status hidden"><i class="fa fa-check-circle" aria-hidden="true"></i> Saved</span>`
        }
        else {
            uiContent += `<span class="status"><i class="fa fa-check-circle" aria-hidden="false"></i> Saved</span>`
        }
        uiContent += `<span class="control-btns">`
        if (update.data === "search") {
            uiContent += `<button class="save-btn" type="button" onclick="Client.saveTrip(${addedTrips.length - 1}, this)">Save trip</button>`
            uiContent += `<button class="remove-btn hidden" type="button" onclick="Client.removeTrip(${addedTrips.length - 1}, this)">Remove trip</button>`
        }
        else {
            uiContent += `<button class="remove-btn" type="button">Remove trip</button>`
        }
        uiContent += `</span>`
        if (daysToDeparture >= 0) {
            uiContent += `<span class="countdown">${cityName}, ${countryName} is ${daysToDeparture} day(s) away</span>`
        }
        else {
            uiContent += `<span class="countdown">${cityName}, ${countryName} was ${Math.abs(daysToDeparture)} day(s) <strong>ago</strong></span>`
        }
        uiContent += `<span class="weather">Typical weather for then is:</span>`
        if (weatherForecast) {
            uiContent += `<div class="weather-temp"><span class="high">High</span> ${weatherForecast.high_temp} <span class="low">Low</span> ${weatherForecast.low_temp}</div>
            <div class="weather-description">${weatherForecast.weather.description}<img src="./media/${weatherForecast.weather.icon}.png" width="48px"></div>`
        }
        else {
            uiContent += `<span class="no-weather"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No forecast available at this time for your departure date</span>`
        }
        uiContent += `</div>`
        const listItem = document.createElement('li')
        listItem.setAttribute('class', 'destination')
        const list = document.createElement('ul')
        listItem.innerHTML = uiContent
        list.appendChild(listItem)
        return list
    }
    catch (err) {
        console.log('Error:', err.message)
    }
}

/**
 * Main functions
 */

// Add a trip with option to save
const addTrip = () => {
    let daysToDeparture = ''
    const addTripForm = document.querySelector('.add-trip-form')
    addTripForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const destinationCity = document.querySelector('#city').value.trim()
        const departureDate = document.querySelector('#date').value
        if (destinationCity && departureDate) {
            const spinner = uiSpinner()
            getCityCoord(destinationCity)
                .then((coord) => {
                    if (coord.geonames[0]) {
                        getWeather(coord.geonames[0].lat, coord.geonames[0].lng)
                            .then((weather) => {
                                daysToDeparture = countDown(departureDate)
                                if (daysToDeparture <= 15) {
                                    const weatherForecast = weather.data[daysToDeparture]
                                    return weatherForecast
                                }
                            })
                            .then((weatherForecast) => {
                                getFeaturedImg(coord.geonames[0].name, coord.geonames[0].countryName)
                                    .then((featuredImgURL) => {
                                        if (featuredImgURL) {
                                            updateUI(featuredImgURL, coord.geonames[0].name, coord.geonames[0].countryName, departureDate, daysToDeparture, weatherForecast, { data: "search" })
                                                .then((tripEl) => {
                                                    const tripData = document.querySelector('.trip-data')
                                                    tripData.appendChild(tripEl)
                                                    tripData.lastElementChild.scrollIntoView({ behavior: 'smooth' })
                                                    spinner.stop()
                                                })
                                        }
                                    })
                            })
                    }
                    else {
                        alert("Please enter a valid city destination")
                        spinner.stop()
                    }
                })
        }
        else {
            alert('Please enter your destination and departure date.')
        }
    })
}

// Show saved trips
const showSavedTrips = () => {
    const appStart = document.querySelector('.app-start')

    if (addedTrips.length > 0) {
        addedTrips.forEach((trip) => {
            if (trip.action === 'save') {
                savedTrips.push(trip)
            }
            localStorage.setItem('trips', JSON.stringify(savedTrips))
        })
        localStorage.removeItem('temp')
    }
    if (savedTrips.length > 0) {
        appStart.hidden = true
        const spinner = uiSpinner()
        savedTrips.forEach((trip, index) => {
            trip.oldIndex = index

            // Fetch image URL each time. Pixabay API does not support permanent hotlinking.
            getFeaturedImg(trip.city, trip.country)
                .then((imgURL) => {
                    const daysToDeparture = countDown(trip.departing)
                    updateUI(imgURL, trip.city, trip.country, trip.departing, daysToDeparture, trip.weather, { data: "saved" })
                        .then((tripEl) => {
                            const tripData = document.querySelector('.trip-data')
                            tripData.appendChild(tripEl)
                            const removeBtns = document.querySelectorAll('.remove-btn')
                            removeBtns[removeBtns.length - 1].addEventListener('click', () => {
                                savedTrips.forEach((trip, index) => {
                                    if (trip.oldIndex === (removeBtns.length - 1)) {
                                        savedTrips.splice(index, 1)
                                        localStorage.setItem('trips', JSON.stringify(savedTrips))
                                    }
                                    removeBtns[removeBtns.length - 1].parentNode.parentNode.parentNode.parentNode.hidden = true
                                    removeBtns[removeBtns.length - 1].parentNode.parentNode.parentNode.parentNode.remove()
                                    if (document.querySelectorAll('.destination').length === 0) {
                                        appStart.hidden = false
                                    }
                                    else {
                                        appStart.hidden = true
                                    }
                                })
                            })
                        })
                    spinner.stop()
                })
        })
    }
    else {
        appStart.hidden = false
    }
}

// Save a trip
const saveTrip = (index, obj) => {
    addedTrips[index].action = 'save'
    localStorage.setItem('temp', JSON.stringify(addedTrips))
    obj.classList.add('hidden')
    const controlBtns = obj.parentNode
    controlBtns.getElementsByClassName('remove-btn')[0].classList.remove('hidden')
    controlBtns.parentNode.getElementsByClassName('status hidden')[0].classList.remove('hidden')
}

// Remove a trip
const removeTrip = (index, obj) => {
    addedTrips[index].action = 'remove'
    localStorage.setItem('temp', JSON.stringify(addedTrips))
    obj.parentNode.parentNode.parentNode.parentNode.classList.hidden = true
    obj.parentNode.parentNode.parentNode.parentNode.remove()
    const appStart = document.querySelector('.app-start')
    if (document.querySelectorAll('.destination').length === 0) {
        appStart.hidden = false
        document.querySelector('.add-trip-form').classList.add('hidden')
    }
    else {
        appStart.hidden = true
    }
}

export {
    getTodaysDate,
    setMinDate,
    formatDate,
    countDown,
    toggleForm,
    scrollToTopOnClick,
    getCityCoord,
    getWeather,
    addTrip,
    saveTrip,
    removeTrip,
    showSavedTrips
}