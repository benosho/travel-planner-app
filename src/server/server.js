// Endpoint for all routes
let addedTrips = []
let savedTrips = []

const path = require('path')
const express = require('express')
const cors = require('cors')
const open = require('open')

// Initiate Express app instance
const app = express()

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//  Start the server on port 5000
app.listen(process.env.PORT || 5000, function () {
    console.log('Travel Planner App listening on port 5000!')
    open('http://127.0.0.1:5000')
})

/**
 * Setup GET and POST request routes
 */

// GET route - added trips
app.get('/data/add', (request, response) => {
    response.send(addedTrips);
})

// GET route - saved trips
app.get('/data/save', (request, response) => {
    response.send(savedTrips);
})

// POST route - add trips
app.post('/add', (request, response) => {
    addedTrips = request.body
    response.send('Success')
})

// POST route - save trips
app.post('/save', (request, response) => {
    savedTrips.push(request.body)
    response.send('Success')
})

// POST route - remove saved trips
app.post('/update', (request, response) => {
    savedTrips.forEach((trip, index) => {
        if (trip.uid === request.body.uid) {
            savedTrips.splice(index, 1)
            response.send('Success')
        }
    })
})

// POST route for testing Express server
app.post('/express/test', (request, response) => {
    response.send('Success')
})

module.exports = app