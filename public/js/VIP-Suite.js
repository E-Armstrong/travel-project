

var mainVm = new Vue({
    el: '#app',
    data: {
        locations:[],

        location:'',

        details:[],
        triedSearch: false,
        savedLoctions: [],
    },
    mounted: function() {
        $.get('/locations', (dataFromServer) => {
            this.locations = dataFromServer
        })

          
    },
    created: function() {

    },
    methods: {

        
        findHotels: function(event){
            // event.preventDefault();
            this.locations = []
            console.log("this.location", this.location)
            
            $.post('/hoteldata', {hotelObject: this.location}, (data)=>{ //data sent must be an object, placeholder object inserted
            // console.log(data) 
            mainVm.triedSearch = true
            hotelData = JSON.parse(data)
            console.log(hotelData)
            // console.log(hotelData.results[0])
                for( var i = 0; i < hotelData.results.length; i++){
                    // console.log(hotelData.results[i])
                    mainVm.locations.push(hotelData.results[i])
                }
                // if (mainVm.locations.length === 0){
                //     mainVm.locations.push('No Hotels in Area')
                // }

            })
                // console.log(mainVm.locations)
            
                
           
        
        },

        findMapHotels: function(event){
            // event.preventDefault();
            this.locations = []
            console.log("this.location", this.location)
            
            $.post('/hotelMapdata', {hotelObject: this.location}, (data)=>{ //data sent must be an object, placeholder object inserted
            // console.log(data) 
            mainVm.triedSearch = true
            hotelData = JSON.parse(data)
            console.log(hotelData)
            // console.log(hotelData.results[0])
                for( var i = 0; i < hotelData.results.length; i++){
                    // console.log(hotelData.results[i])
                    mainVm.locations.push(hotelData.results[i])

                }
                // console.log(mainVm.locations)
                
            })

        
        },

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
        saveToDo: function(location) {
            $.post('/saveToDo', {location: location}, function(data){
                
            })
        }
    }
})

