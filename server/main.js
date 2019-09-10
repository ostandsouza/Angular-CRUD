"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var express = require("express");
var utils_1 = require("./utils");
var bodyParser = require("body-parser");
var mongodb_1 = require("mongodb");
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
app.post('/api/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var url, conn, err_1, output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.body.url;
                console.log(url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, utils_1.Connection(url).then(function (result) {
                        conn = result;
                        console.log("conn", conn);
                    })["catch"](function (err) {
                        console.log("DB connection failed", err);
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new Error("DB connection failed");
            case 4:
                if (!conn)
                    output = { "status": "Not connected to server" };
                else
                    output = { "status": "connected to server" };
                res.send(output);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/list', function (req, res) {
    //let api = req.body.api;
    var db = utils_1.getDb();
    var output;
    var ApiList = new Array();
    db.db().listCollections().toArray().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].name);
            ApiList[i] = result[i].name;
        }
        //console.log("conn", result);
        output = { "status": ApiList };
        res.send(output);
    })["catch"](function (err) {
        console.log("Api get list failed", err);
        res.send(output);
    });
});
app.post('/api/new', function (req, res) {
    var api = req.body.api;
    var db = utils_1.getDb();
    var output;
    db.db().createCollection(api).then(function (result) {
        console.log("conn", result);
        output = { "status": "Collection creation was successfull" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "Collection create was failed" };
        console.log("Api new failed", err);
        res.send(output);
    });
});
//, {capped:true, size:10000, max:1000, w:1}
app.post('/api/drop', function (req, res) {
    var api = req.body.api;
    var db = utils_1.getDb();
    var output;
    db.db().collection(api).drop().then(function (result) {
        console.log("conn", result);
        output = { "status": "Collection was deleted" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "Delete collection was failed" };
        console.log("Api drop failed", err);
        res.send(output);
    });
});
app.post('/api/find', function (req, res) {
    var api = req.body.api;
    var id = req.body.id;
    console.log("api", api);
    console.log("id", id);
    var db = utils_1.getDb();
    var output;
    db.db().collection(api).findOne({ "_id": mongodb_1.ObjectID(id) }, function (err, results) {
        if (err) {
            output = { "status": err };
            console.log(err);
        }
        else {
            output = { "status": results };
        }
        res.send(output);
        console.log("output", output);
    });
});
app.post('/api/read', function (req, res) {
    var api = req.body.api;
    var db = utils_1.getDb();
    var output;
    db.db().collection(api).find().toArray(function (err, results) {
        if (err) {
            output = { "status": err };
            console.log(err);
        }
        else {
            output = { "status": results };
        }
        res.send(output);
    });
});
app.post('/api/create', function (req, res) {
    var api = req.body.api;
    var insertDoc = req.body.doc;
    var db = utils_1.getDb();
    var output;
    db.db().collection(api).insertOne(insertDoc).then(function (result) {
        console.log("conn", result);
        output = { "status": "document were successfully inserted" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "document insetion was failed" };
        console.log("Api create failed", err);
        res.send(output);
    });
});
app.post('/api/update', function (req, res) {
    var api = req.body.api;
    var id = req.body.id;
    var db = utils_1.getDb();
    // id = id._id;
    // console.log("Api ", id);
    // id= db.db().collection(api).db.bson_serializer.ObjectID.createFromHexString(id)
    // console.log("Api ", id);
    // id = req.body.id;
    // id["_id"]= id;
    // console.log("Api ", id);
    var replace = req.body.replace;
    var output;
    db.db().collection(api).updateOne({ "_id": mongodb_1.ObjectID(id) }, { $set: replace }).then(function (result) {
        console.log("conn", result);
        output = { "status": "document was modified successfully" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "document modification was failed" };
        console.log("Api update failed", err);
        res.send(output);
    });
});
app.post('/api/unset', function (req, res) {
    var api = req.body.api;
    var id = req.body.id;
    var db = utils_1.getDb();
    // id = id._id;
    // console.log("Api ", id);
    // id= db.db().collection(api).db.bson_serializer.ObjectID.createFromHexString(id)
    // console.log("Api ", id);
    // id = req.body.id;
    // id["_id"]= id;
    // console.log("Api ", id);
    var replace = req.body.replace;
    var output;
    db.db().collection(api).updateOne({ "_id": mongodb_1.ObjectID(id) }, { $unset: replace }).then(function (result) {
        console.log("conn", result);
        output = { "status": "document was modified successfully" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "document modification was failed" };
        console.log("Api update failed", err);
        res.send(output);
    });
});
app.post('/api/delete', function (req, res) {
    var api = req.body.api;
    var id = req.body.id;
    var db = utils_1.getDb();
    var output;
    db.db().collection(api).deleteOne(id).then(function (result) {
        console.log("conn", result);
        output = { "status": "document was deleted successfully" };
        res.send(output);
    })["catch"](function (err) {
        output = { "status": "document deletion was failed" };
        console.log("Api delete failed", err);
        res.send(output);
    });
});
app.get('/api/conn', function (req, res) {
    var output;
    try {
        var db = utils_1.getDb();
        db.db().listCollections();
        output = true;
    }
    catch (error) {
        output = false;
    }
    res.send(output);
});
app.listen(3000);
console.log('running');
