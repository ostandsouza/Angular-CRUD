import * as MongoClient from 'mongodb';
//var MongoClient = require( 'mongodb' ).MongoClient;

var _db: any;

export const Connection = (_url: string) : Promise<any> => {
    return new Promise<any>(async(resolve, reject) => {
        try {
        await MongoClient.connect(_url,{ useNewUrlParser: true }, function(err, result) {
            if (err) {
                reject(new Error("Request not Successful"));
            } else {
                _db = result;
                resolve(_db);
            }
        })
    }
    catch (err) {
        console.log("conn", err);
    }
    });
}
export const getDb = ():any=> {
    return _db;
  }


