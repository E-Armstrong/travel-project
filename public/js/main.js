var mainVm = new Vue({
    el: '#app',
    data: {
        locations:[],

        location:'',

        details:[],
    },
    methods: {
        findHostels: function(event){
            event.preventDefault();
            
            $.post('/hosteldata', {Object: object}, function(data){ //data sent must be an object, placeholder object inserted
                
            })
        },
        findAirbnbs: function(event){
            event.preventDefault();
            
            $.post('/airbnbdata', {Object: object}, function(data){ //data sent must be an object, placeholder object inserted
                
            })
        },
        findHotels: function(event){
            event.preventDefault();
            event.stopPropagation();
            console.log(this.location)
            $.post('/hoteldata', {hotelObject: this.location}, function(data){ //data sent must be an object, placeholder object inserted
            console.log(data) 

            hotelData = JSON.parse(data)
            // console.log(hotelData)
            // console.log(hotelData.results[0])
                for( var i = 0; i < hotelData.results.length; i++){
                    // console.log(hotelData.results[i])
                    mainVm.locations.push(hotelData.results[i])
                    
                }
                // console.log(mainVm.locations)
            })
        
        },
<<<<<<< HEAD
        findHotelDetails: function(event){

            // id = place_id
            // console.log(event.target.id)
            
            $.post('/hoteldetails', {hotelObject: event.target.id},(data)=>{
                // console.log(data)

                hotelDetails = JSON.parse(data)
                console.log(hotelDetails)

                mainVm.details.push(hotelDetails.result)

                
            })            
            $.post('/hotelPrices', {hotelObject: event.target.id}, function(data){
            hotelPrices = JSON.parse(data)
            console.log('hotel prices',hotelPrices)

=======
        findHotelDetails: function(location_id, event){
            event.preventDefault();
            event.stopPropagation();
            // id = place_id
            // console.log(event.target.id)
            
            $.post('/hoteldetails', {hotelObject: location_id}, function(data){
            console.log("Event Target ID: ", location_id)

            hotelDetails = JSON.parse(data)
            console.log(hotelDetails)
            mainVm.details.push(hotelDetails.result)
            console.log("MainVM details: ", mainVm.details)
>>>>>>> 1236af9379f0287801cf9b12d05705456a27db3a
            })
        }

    }
})

