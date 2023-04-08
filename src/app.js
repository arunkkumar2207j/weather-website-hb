const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecase');
const geoCode = require('./utils/geocode');

const app = express();
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        content: 'Home Content Comes here',
        name: "Arun"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        content: "Help content comes here",
        name: "Arun"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        content: "About content comes here",
        name: "Arun"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address not provided'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude}={}) => {
        if(error) {
            return res.send({
                error: 'you should provide the address'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                latitude,
                longitude,
                forecast: forecastData,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpArticleNotFound', {
        name: 'Arun'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('server started');
})