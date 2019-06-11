const Vue = require('Vue');
var vue = new Vue({
    el:"#vue_id",
    data :{
        firstname: "pavithra",
        lastname:"devi",
        address : "hostel"
    },
    methods:{
        mydetails : function(){
            return "I am" +this.firstname+" "+this.lastname;
        }
    }
});