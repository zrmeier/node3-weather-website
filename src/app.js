const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Deinfe paths for expess config
console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Set up handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

// request, response
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zachary Meier'
    })
})

// request, response
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zachary Meier'
    })
})

// request, response
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'What Can I Help You With?',
        name: 'Zachary Meier'
    })
})

// Weather Page Request Weather Data From API
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error }) //return stops the program
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) //return stops the program
            }
    
            return res.send({
                forecast: forecastData,
                location,
                address : req.query.address,

            })
        })
    })
})

    

    




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

// If Help URL fails.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage : 'Help article not found',
        name: 'Zachary Meier'
    })
})

// 404 Route Comes Last Catch all
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage : 'Page not found',
        name: 'Zachary Meier'
    })
})


app.listen(3000, () => {
    console.log('Server is up.  Port 3000.')
})

