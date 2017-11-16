var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

const mongoose = require('mongoose')
var app = express()

mongoose.connect('mongodb://localhost/travel-project')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static('./public'))

var hotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    details: {type: Array}

})

var hotelModel = mongoose.model('hotel', hotelSchema)



app.get('/', function(req, res){
    res.sendFile('./html/index.html', {root: './public'})
})

app.get('/login-page', function(request, response){
    response.sendFile('./public/html/login-page.html', {root: './'})
})


app.post('/hoteldata', function(req, res) {
    console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDm4Zqkhi-7epTq0LgSHYxd-Y9i1RNaX58`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)

    
    })
})

app.post('/hoteldetails', function(req, res) {
    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.hotelObject}&key=AIzaSyDm4Zqkhi-7epTq0LgSHYxd-Y9i1RNaX58`, function (error, response, body) {
    console.log('data from google: ', body)
    res.send(body)
})
})

app.get('/log-in', function(req, res) {
    
    console.log('Data from sign-in: ', req.name, req.password)
    res.send(res.body)
})

app.get('/create-log-in', function(req, res) {
    
    console.log('Data from create log-in: ', req.name, req.password)
    res.send(res.body)
})

app.post('/hoteldata', function(req, res) {
    console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDm4Zqkhi-7epTq0LgSHYxd-Y9i1RNaX58`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)
    })
})

app.post('/hotelMapdata', function(req, res) {
    console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDm4Zqkhi-7epTq0LgSHYxd-Y9i1RNaX58`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)
    })
})


app.listen(8080, function() {
    console.log('started on 8080')
})








