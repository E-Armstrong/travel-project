var express = require('express')
var bodyParser = require('body-parser')

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
})

// Places API
app.get('/api', function(req, res){
    console.log('pinging', req.query)

    //parameters: query, type=lodging, radius=10000 meters(we can have user choose radius)
    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.location}&type=lodging&radius=10000&key=AIzaSyBj6H3jojxCX5hDq4nryj-7O1JUmzrrIY4`, function (error, response, body) {
        console.log('data from nasa: ', body)
        res.send(body)
    
    })

})
// Place details API
app.get('/api', function(req, res){
    console.log('pinging', req.query)

    //parameters: placeid
    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.placeId}=AIzaSyBj6H3jojxCX5hDq4nryj-7O1JUmzrrIY4`, function (error, response, body) {
        console.log('data from nasa: ', body)
        res.send(body)
    
    })

})




app.listen(8080, function() {
    console.log('started on 8080');
})