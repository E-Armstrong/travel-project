var mainVm = new Vue({
    el: '#app',
    data: {
        logInName:"",

        logInPassword:"",

        createUserName:"",

        createPassword: "",
    },
    mounted: function() {
        $.get('/locations', (dataFromServer) => {
            this.locations = dataFromServer
        })
    },
    methods: {
        
        logIn: function(event){
            event.preventDefault();
            console.log("Username/Password?", this.logInName, this.logInPassword)        
            $.get('/log-in', {name: this.logInName, password: this.logInPassword}, (data)=>{ 
            // console.log(data)
            })
        
        },

        signUp: function(location, event){
            event.preventDefault();
            console.log("Username/Password?", this.logInName, this.logInPassword)
            $.get('/create-log-in', {name: this.createUserName, password: this.createPassword}, (data)=>{ 
                // console.log(data) 
                    
            })
        },
    }
})