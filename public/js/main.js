$( document ).ready(function() {
    console.log( "ready!" )
})


var initMap = function(event){
    
    var options = {
        zoom: 8,
        center: {lat:42.360, lng:-71.0589}
    }
    var map = new google.maps.Map(document.getElementById('map'), options)
}





var mainVm = new Vue({
    el: '#app',
    data: {
        locations:[],

        location:'',

        details:[],
    },
    mounted: function() {
        $.get('/locations', (dataFromServer) => {
            this.locations = dataFromServer
        })
    methods: {
        // findHostels: function(event){
        //     event.preventDefault();
            
        //     $.post('/hosteldata', {Object: object}, function(data){ //data sent must be an object, placeholder object inserted
                
        //     })
        // },
        // findAirbnbs: function(event){
        //     event.preventDefault();
            
            // $.post('/airbnbdata', {Object: object}, function(data){ //data sent must be an object, placeholder object inserted
                
            // })
        },
        findHotels: function(event){
            event.preventDefault();
            event.stopPropagation();
            console.log(this.location)
            
            $.post('/hoteldata', {hotelObject: this.location}, (data)=>{ //data sent must be an object, placeholder object inserted
            // console.log(data) 

            hotelData = JSON.parse(data)
            console.log(hotelData)
            // console.log(hotelData.results[0])
                for( var i = 0; i < hotelData.results.length; i++){
                    // console.log(hotelData.results[i])
                    mainVm.locations.push(hotelData.results[i])

                }
                // console.log(mainVm.locations)
                this.initMap()
            })
        
        },


        findHotelDetails: function(location_id, event){
            event.preventDefault();
            event.stopPropagation();
            // id = place_id
            // console.log(event.target.id)
            
            $.post('/hoteldetails', {hotelObject: location_id}, function(data){
            console.log("Event Target ID: ", location_id)

            hotelDetails = JSON.parse(data)
            console.log(hotelDetails)
            mainVm.locations.push(hotelDetails.result)
            console.log("MainVM details: ", mainVm.details)


        findHotelDetails: function(location, event){
            event.preventDefault();
            if ( location.details ) {
                return
            }
            // event.stopPropagation();
            // id = place_id
            console.log('location? ', location)
            
            $.post('/hoteldetails', {hotelObject: location.place_id}, function(data){
                console.log("Event Target ID: ", location.place_id)

                hotelDetails = JSON.parse(data)
                console.log('details? ', hotelDetails)
                // mainVm.details.push(hotelDetails.result)
                location.details = hotelDetails.result
                mainVm.$forceUpdate()
                console.log("MainVM details: ", mainVm.details)
            

            })
        },

        

    }
})

