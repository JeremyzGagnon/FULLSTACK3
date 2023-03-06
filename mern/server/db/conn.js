
const { MongoClient } = require("mongodb"); //import the MongoClient class
const Db = process.env.ATLAS_URI; //get my db key
const client = new MongoClient(Db, {//create an instance of the Mongoclient class
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) { //connect to our db
      // Verify we got a good "db" object
      if (db)//if the connection is succefull
      {
        _db = db.db("employees");//sets the _db variable to the database object returned by db.db("employees") 
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);//cannot connect
         });
  },

  getDb: function () {
    return _db;
  },
};
