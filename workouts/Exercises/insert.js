var mongoClient = require("mongodb").mongoClient;
var url ="";
mongoClient.connect(url,function(err,db){
    if(err) throw error;
    var dbo = db.db("mydb");
    var query ={name:"aji", address:"mdu"}
    dbo.Collection("customers").insertOne(query,function(err,res){
        if(err) throw error;
        console.log("one row inserted");
        db.close();
    })
})