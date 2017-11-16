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

var users = {
    raphael: 'dragons',
    eric: 'dingleberries',
    michael: 'goats',
    bernidette  : 'feelthebern',
    password: 'password',
}

var isLoggedIn = function(req, res, next){
    console.log('Data from sign-in isLoggedIn function: ', req.query.name, req.query.password)
    
    var name = req.query.name
    var pass = req.query.password
    if ( name in users && users[name] === pass ) {
        console.log("isLoggedIn was called successfully")
        res.send({success: "Sucessfullly logged in!"})
    }
    else {
        res.redirect('/login-page')
    }
}

app.get('/', function(req, res){
    res.sendFile('./html/index.html', {root: './public'})
})

app.get('/login-page', function(request, response){
    response.sendFile('./public/html/login-page.html', {root: './'})
})

app.get('/VIP-suite', function(req, res, next){
    res.sendFile('./html/VIP-Suite.html', {root: './public'})
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

app.get('/log-in', isLoggedIn, function(req, res) {
    console.log('Data from sign-in: ', req.query.name, req.query.password)
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








