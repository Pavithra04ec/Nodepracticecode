const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true }, (err, db) => {
    if (err)
        return err;
    var dbo = db.db("employee");
    // dbo.collection("managerDetail").aggregate([
    //     {
    //         $lookup:
    //         {
    //             from: 'employeeDetail',
    //             localField: 'project',
    //             foreignField: 'project',
    //             as: 'list of employee'
    //         }
    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("join two collection within a db : ", JSON.stringify(result));
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $group: { _id: "$project", employeeinProject: { $sum: 1 } } }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("group by project :", result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $group: { age: "$age", total: { $sum: 1 } } },
    //     { $sort: { age: -1 } }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("group by age :", result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $match: { project: 'node' } },
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("match by project :", result);
    // })
    // dbo.collection("employeeDetail").distinct('age', (err, result) => {
    //     if (err)
    //         return err;
    //     console.log("distinct by age :", result);
    // })
    // dbo.collection("employeeDetail").estimatedDocumentCount('age', (err, result) => {
    //     if (err)
    //         return err;
    //     console.log("count by age :", result);

    // })
    // dbo.collection("employeeDetail").aggregate([
    //     {
    //         $project: {
    //             avgage: { $avg: ["$age", "$id"] }
    //         }
    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("avg age :", result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     {
    //         $group: {
    //             _id: null,
    //             max: { $max: '$age' }
    //         }
    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("max age :", result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     {
    //         $group: {
    //             _id: null,
    //             min: { $min: '$age' }
    //         }
    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("min age :", result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $sort: { age: -1 } },
    //     { $match: { project: 'angular' } }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('sorting by age :', result);
    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $match: { project: 'node' } }, {
    //         $group: {
    //             _id: '$project', age: { $sum: '$age' }
    //         }
    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log("min age :", result);
    // })
    // var date = new Date;
    // dbo.collection("dateFn").insertOne(date, (err, res) => {

    // })
    // dbo.collection("employeeDetail").aggregate([
    //     { $match: { employeeName: 'srenu' } }, {
    //         $project:
    //         {
    //             year: { $year: '$date' },
    //             month: { $month: '$date' },
    //             day: { $dayOfMonth: '$date' },
    //             hour: { $hour: '$date' },
    //             minutes: { $minute: '$date' },
    //             seconds: { $second: '$date' },
    //             milliseconds: { $millisecond: '$date' },
    //             dayOfYear: { $dayOfYear: '$date' },
    //             dayOfWeek: { $dayOfWeek: '$date' },
    //             week: { $week: '$date' }
    //         }
    //     }

    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('date function', result);
    // })
    // dbo.collection('employeeDetail').aggregate([
    //     { $match: { project: 'node' } },
    //     { $redact: { $cond: { if: { $eq: ["$age" , 22]}, then: '$$PRUNE', else: '$$DESCEND' } } } 
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('redact function :', result);
    // })
    // dbo.collection('employeeDetail').aggregate([
    //     { $match: { project: 'node' } },
    //     { $match: { age : 22 } }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('Two match condition :', result);
    // })
    // dbo.collection('managerDetail').aggregate([
    //     {
    //         $lookup: {
    //             from: "employeeDetail",
    //             localField: 'project',
    //             foreignField: 'project',
    //             as: 'listofEmployee'
    //         }
    //     },
    //     { $unwind: "$listofEmployee" }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('unwind method :', (result));
    // })
    // dbo.collection("address").aggregate([
    //     { $match: { state: 'Tamil Nadu' } },
    //     {
    //         $group: { _id: "$state", totalpop: { $sum: "$pop" } } //,

    //     }
    // ]).toArray((err, result) => {
    //     if (err)
    //         return err;
    //     console.log('address :', result);
    // })
        var mapFunction = function () { 
            emit(this.employeeName, this.age) 
        };
        var reduceFunction =function (employeeName, age) { 
            return Array.sum(age) 
        };
        dbo.collection('employeeDetail').mapReduce(
            mapFunction,
            reduceFunction,
            {out : "totals"}
        )
        dbo.collection('totals').find({}).toArray( (err, result) =>{
            if (err)
            return err;
            console.log('Map reduce function',result);
        })
})