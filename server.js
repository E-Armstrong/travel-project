var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

const mongoose = require('mongoose');
var app = express()

mongoose.connect('mongodb://localhost/travel-project');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('./public'))

app.get('/', function(req, res){
    res.sendFile('./html/index.html', {root: './public'})
})

app.post('/hosteldata', function(req, res) {
})

app.post('/airbnbdata', function(req, res) {
})


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

// Places API
// app.get('/api', function(req, res){
//     console.log('pinging', req.query)

//     //parameters: query, type=lodging, radius=10000 meters(we can have user choose radius)


// })
// // Place details API
// app.get('/api', function(req, res){
//     console.log('pinging', req.query)

    //parameters: placeid


// })




app.listen(8080, function() {
    console.log('started on 8080');
})








