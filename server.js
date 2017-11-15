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

// app.post('/hosteldata', function(req, res) {
// })

// app.post('/airbnbdata', function(req, res) {
// })


app.post('/hoteldata', function(req, res) {
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.hotelObject}&type=lodging&radius=10000&key=AIzaSyDXE5RxiZGcQmZ1XUzWVPD6hygz_udMGqY`, function (error, response, body) {
    //console.log('data from google: ', body)
    //console.log(res, 'res')
    // console.log(body)
    res.send(body)

    
    })
})

app.post('/hoteldetails', function(req, res) {
    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.hotelObject}&key=AIzaSyDXE5RxiZGcQmZ1XUzWVPD6hygz_udMGqY`, function (error, response, body) {
    console.log('data from google: ', body)
    res.send(body)
    
    })
})





app.listen(8080, function() {
    console.log('started on 8080')
})








