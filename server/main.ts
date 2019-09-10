import * as express from 'express';
import { Connection, getDb } from './utils';
import * as bodyParser from 'body-parser';
import * as assert from 'assert';
import * as MongoClient from 'mongodb';
import { ObjectID } from 'mongodb';
//var MongoClient = require('mongodb').MongoClient;

var app = new express();
app.use(bodyParser.json());

// const Connection = (_url: string, flag: boolean) : Promise<any> => {
//     let db
//     var output: any;
//     if(flag){
//         return new Promise<any>(async(resolve, reject) => {
//             try {
//             await MongoClient.connect(_url,{ useNewUrlParser: true }, function(err, result) {
//                 if (err) {
//                     reject(new Error("Request not Successful"));
//                 } else {
//                     db = result;
//                     resolve(db);
//                 }
//             })
//         }
//         catch (err) {
//             //reject(new Error("Request not Successful"));
//         }
//         });
//     }

//     const collection = db.collection('ExecuteApi');
//     collection.find({}).toArray(function(err, docs) {
//         if (err || !docs) {
//           output = { "docs" : "" };
//         } else {
//           output = { "docs" : docs };
//         }
//       });
//       return output;
// }
  

app.post('/api/',  async (req, res)=>{
    let url = req.body.url;
    console.log(url);
    var conn;
    try {
        await Connection(url).then(result =>{ 
            conn = result;
            console.log("conn", conn);
        }).catch(err => {
            console.log("DB connection failed", err);
        })
    }
    catch (err) {
        throw new Error("DB connection failed");
    }

    var output: any;
    if (!conn)
        output = {"status" :"Not connected to server"};
    else
        output = {"status" :"connected to server"};
    res.send(output);
});


app.get('/api/list', function (req, res){
    //let api = req.body.api;
    var db: any = getDb()
    var output: any;
    let ApiList: Array<string> = new Array();
    db.db().listCollections().toArray().then(result =>{ 
        for(var i=0;i<result.length;i++){
            console.log(result[i].name);
            ApiList[i]= result[i].name
        }
        //console.log("conn", result);
        output = {"status" :ApiList};
        res.send(output);
    }).catch(err => {
        console.log("Api get list failed", err);
        res.send(output);
    })

});


app.post('/api/new', function (req, res){
    let api = req.body.api;
    var db: any = getDb()   
    var output: any;
    db.db().createCollection(api).then(result =>{ 
        console.log("conn", result);
        output = {"status" : "Collection creation was successfull"};
        res.send(output);
    }).catch(err => {
        output = {"status" : "Collection create was failed"};
        console.log("Api new failed", err);
        res.send(output);
    })

});
//, {capped:true, size:10000, max:1000, w:1}

app.post('/api/drop', function (req, res){
    let api = req.body.api;
    var db: any = getDb()
    var output: any;
    db.db().collection(api).drop().then(result =>{ 
        console.log("conn", result);
        output = {"status" : "Collection was deleted"};
        res.send(output);
    }).catch(err => {
        output = {"status" : "Delete collection was failed"};
        console.log("Api drop failed", err);
        res.send(output);
    })

});

app.post('/api/find', function (req, res){
    let api = req.body.api;
    let id = req.body.id;
    console.log("api",api)
    console.log("id",id)
    var db: any = getDb()
    var output: any;
    db.db().collection(api).findOne({ "_id": ObjectID(id)},(err, results) => {
        if (err){
            output = {"status" :err};
            console.log(err)
        }
        else {
            output = {"status" :results};
        }
        res.send(output);
        console.log("output",output)
    });

});


app.post('/api/read', function (req, res){
    let api = req.body.api;
    var db: any = getDb()
    var output: any;
    db.db().collection(api).find().toArray((err, results) => {
        if (err){
            output = {"status" :err};
            console.log(err)
        }
        else {
            output = {"status" :results};
        }
        res.send(output);
    });

});


app.post('/api/create', function (req, res){
    let api = req.body.api;
    let insertDoc = req.body.doc;
    var db: any = getDb()
    var output: any;
    db.db().collection(api).insertOne(insertDoc).then(result =>{ 
        console.log("conn", result);
        output = {"status" : "document were successfully inserted"};
        res.send(output);
    }).catch(err => {
        output = {"status" : "document insetion was failed"};
        console.log("Api create failed", err);
        res.send(output);
    })

});


app.post('/api/update', function (req, res){
    let api = req.body.api;
    let id = req.body.id;
    var db: any = getDb()
    // id = id._id;
    // console.log("Api ", id);
    // id= db.db().collection(api).db.bson_serializer.ObjectID.createFromHexString(id)
    // console.log("Api ", id);
    // id = req.body.id;
    // id["_id"]= id;
    // console.log("Api ", id);
    let replace = req.body.replace;
    var output: any;
    db.db().collection(api).updateOne({ "_id": ObjectID(id)}, {$set: replace}).then(result =>{ 
        console.log("conn", result);
        output = {"status" :"document was modified successfully"};
        res.send(output);
    }).catch(err => {
        output = {"status" :"document modification was failed"};
        console.log("Api update failed", err);
        res.send(output);
    })

});

app.post('/api/unset', function (req, res){
    let api = req.body.api;
    let id = req.body.id;
    var db: any = getDb()
    // id = id._id;
    // console.log("Api ", id);
    // id= db.db().collection(api).db.bson_serializer.ObjectID.createFromHexString(id)
    // console.log("Api ", id);
    // id = req.body.id;
    // id["_id"]= id;
    // console.log("Api ", id);
    let replace = req.body.replace;
    var output: any;
    db.db().collection(api).updateOne({ "_id": ObjectID(id)}, {$unset: replace}).then(result =>{ 
        console.log("conn", result);
        output = {"status" :"document was modified successfully"};
        res.send(output);
    }).catch(err => {
        output = {"status" :"document modification was failed"};
        console.log("Api update failed", err);
        res.send(output);
    })

});


app.post('/api/delete', function (req, res){
    let api = req.body.api;
    let id = req.body.id;
    var db: any = getDb()
    var output: any;
    db.db().collection(api).deleteOne(id).then(result =>{ 
        console.log("conn", result);
        output = {"status" : "document was deleted successfully"};
        res.send(output);
    }).catch(err => {
        output = {"status" :"document deletion was failed"};
        console.log("Api delete failed", err);
        res.send(output);
    })

});


app.get('/api/conn', function (req, res){
    var output: any;
    try{
        var db: any = getDb()
        db.db().listCollections();
        output = true
    }
    catch (error) {
        output = false;
    }
    res.send(output);

});




app.listen (3000);
console.log('running');