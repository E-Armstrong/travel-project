var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

const mongoose = require('mongoose')
var app = express()

mongoose.connect('mongodb://localhost:27017/travel-project', {useMongoClient: true})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static('./public'))

var hotelSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    rating:{type: String},
    website: {type: String},
    reviews: {type: String},

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
    // console.log('Data from sign-in isLoggedIn function: ', req.query.name, req.query.password)
    
    var name = req.query.name
    var pass = req.query.password
    if ( name in users && users[name] === pass ) {
        // console.log("isLoggedIn was called successfully")
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
    // console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDr2i-eGynB7zL9N2r9K8JrbMqsBEaJoGo`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)

    
    })
})

app.post('/hoteldetails', function(req, res) {
    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.hotelObject}&key=AIzaSyDr2i-eGynB7zL9N2r9K8JrbMqsBEaJoGo`, function (error, response, body) {
    // console.log('data from google: ', body)
    res.send(body)
})
})

app.get('/log-in', isLoggedIn, function(req, res) {
    // console.log('Data from sign-in: ', req.query.name, req.query.password)
})

app.post('/hoteldata', function(req, res) {
    // console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDr2i-eGynB7zL9N2r9K8JrbMqsBEaJoGo`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)
    })
})

app.post('/hotelMapdata', function(req, res) {
    // console.log(req.body.hotelObject)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDr2i-eGynB7zL9N2r9K8JrbMqsBEaJoGo`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)

    res.send(body)
    })
})

app.post('/saveToDo', function(req, res) {

    let newHotel = {
        name: req.body.location.name,
        address: req.body.location.formatted_address,
        phoneNumber: req.body.location.formatted_phone_number,
        rating:req.body.location.rating,
        website: req.body.location.website,
        reviews: req.body.location.reviews[0].text,
    }

    console.log(newHotel)
    
    new hotelModel(newHotel).save(function(err, createdHotel) {
        if (err) { 
            res.status(500).send(err);
            return console.log(err);
        }
        console.log(createdHotel)
        res.status(200).send(createdHotel);
    })

    console.log("Data from saveToDo handle: name ", typeof(req.body.location.name))
    console.log("Data from saveToDo handle: address", typeof(req.body.location.formatted_address))
    console.log("Data from saveToDo handle: phone number", typeof(req.body.location.formatted_phone_number))
    console.log("Data from saveToDo handle: rating", typeof(req.body.location.rating))
    console.log("Data from saveToDo handle: website", typeof(req.body.location.website))
    console.log("Data from saveToDo handle: reviews", typeof(req.body.location.reviews[0].text))
})

app.listen(8080, function() {
    console.log('started on 8080')
})




