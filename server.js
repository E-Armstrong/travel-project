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

//request/response to/from main.js
app.get('/api', function(req, res){
    console.log('pinging', req.query)

    //request to Nasa API
    request(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.startDate1}&end_date=${req.query.endDate}&api_key=uBbS7vZx5Jtx6pAfsZBVVrMThUPYxy6eMNq7m8iG`, function (error, response, body) {
        console.log('data from nasa: ', body)
        res.send(body)
    
    })

})

app.listen(8080, function() {
    console.log('started on 8080');
})