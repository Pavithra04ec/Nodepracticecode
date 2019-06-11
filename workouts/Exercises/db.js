var MongoCilent = require ("mongodb").MongoClient;
var url="";
//
MongoCilent.connect(url,function(err,db){
    if(err) throw error;
    var dbo = db.db("mydb");
    dbo.createCollection("customer",function(err,res){
        if (err)
        throw error;
        console.log("collection created");
        db.close();
    });
    

});