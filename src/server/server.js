// Endpoint for all routes
let savedTrips = []

const path = require('path')
const express = require('express')
const cors = require('cors')
const open = require('open')

// Initiate Express app instance
const app = express()

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })) // Parse URL-encoded bodies
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

//  Start the server on port 5000
app.listen(process.env.PORT || 5000, function () {
    console.log('Travel App listening on port 5000!')
    open('http://127.0.0.1:5000')
})

/**
 * Setup GET and POST request routes
 */

// GET route - get saved trips
app.get('/data', (request, response) => {
    //savedTrips = []
    response.send(savedTrips);
})

// POST route
app.post('/add', (request, response) => {
    savedTrips.push(request.body)
})

// POST route
app.post('/update', (request, response) => {
    savedTrips = request.body
})