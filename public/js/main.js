var mainVm = new Vue({
    el: '#app',
    data: {
        location:'',        
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
            
            $.post('/hoteldata', {Object: object}, function(data){ //data sent must be an object, placeholder object inserted
                
            })
        },
    }
})