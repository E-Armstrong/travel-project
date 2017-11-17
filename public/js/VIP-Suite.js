var mainVm = new Vue({
    el: '#app',
    data: {
        locations:[],

        location:'',

        details:[],
        triedSearch: false,
        savedHotels: [],
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
            //console.log("this.location", this.location)
            
            $.post('/hoteldata', {hotelObject: this.location}, (data)=>{ //data sent must be an object, placeholder object inserted
            // console.log(data) 
            mainVm.triedSearch = true
            hotelData = JSON.parse(data)
            // console.log(hotelData)
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
        getFreshData: function(event){
            $.post("/currentHotels", function(data) {
                console.log("the getFreshData data: ", data)
                mainVm.savedHotels = data
            })
        },

        findMapHotels: function(event){
            // event.preventDefault();
            this.locations = []
            // console.log("this.location", this.location)
            
            $.post('/hotelMapdata', {hotelObject: this.location}, (data)=>{ //data sent must be an object, placeholder object inserted
            // console.log(data) 
            mainVm.triedSearch = true
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

        findHotelDetails: function(location, event){
            event.preventDefault();
            if ( location.details ) {
                return
            }
            // event.stopPropagation();
            // id = place_id
            //console.log('location? ', location)
            
            $.post('/hoteldetails', {hotelObject: location.place_id}, function(data){
                //console.log("Event Target ID: ", location.place_id)

                hotelDetails = JSON.parse(data)
                // console.log('details? ', hotelDetails)
                // mainVm.details.push(hotelDetails.result)
                location.details = hotelDetails.result
                mainVm.$forceUpdate()
                console.log("MainVM details: ", mainVm.details)
            

            })
        },
        saveHotel: function(location) {
            // console.log("location.name data: ", location.name)
            $.post('/saveHotel', {location: location}, function(data){
                mainVm.getFreshData();
            })
        },
        deleteHotel: function(toDo, index, event) {
            var id = mainVm.savedHotels[index]._id
            console.log("ID String from main.js:", mainVm.savedHotels[index]._id)
            $.post("/deleteHotel", {id: id}, function(err, dataFromServer){
                if (err) {console.log(err)}
                mainVm.getFreshData()
            })
        },
    },
    created(){
        this.getFreshData()
     },
})

