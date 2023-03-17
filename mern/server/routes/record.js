  const express = require("express");//import express
  const { v4: uuidv4 } = require('uuid');

  // We use it to define our routes.
  const recordRoutes = express.Router();

  // This will help us connect to the database
  const dbo = require("../db/conn");

  // This help convert the id from string to ObjectId for the _id.
  const ObjectId = require("mongodb").ObjectId; //imports the id string converter of mongodb

  // This section will help you validate the token.
  recordRoutes.route("/validate-token").get(async (req, res) => {
    let db_connect = dbo.getDb();
    let cookie = req.query.token;
    console.log("TOKEN")
    console.log(cookie);
    db_connect
    .collection("Session")
    .findOne({session_token: cookie}, function (err, result) {
      if (err) {
        res.status(500).json({ status: "error", message: "Failed to validate token" });
      } else if (!result) {
        res.json({status: "ok", data: {valid: false, user: null, message: "Invalid token"}});
      } else {
        res.json({status: "ok", data: {valid: true, user: result.user, message: "Valid token"}});
      }
          });
  });

  // This section will help you get a list of all the records.
  recordRoutes.route("/record").get(function (req, res) {//list everyone
    let db_connect = dbo.getDb("employees");
    db_connect
      .collection("records")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  // This section will help you get a single record by id
  recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};//convert the id submitted by the client to a MongoDB ObjectId
    db_connect
        .collection("records")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

  // This section will help you create a new record.
  recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      region: req.body.region,
      rating:req.body.rating,
      fee: req.body.fee,
      sales: req.body.sales,
      manager: req.body.manager

    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);//si la promesse est résolue réponds avec le document ajouter à la db
    });
  });
// Gets the 10 earliest transaction
  // recordRoutes.route("/transaction-data/:id").get(function (req, res) {
  //   console.log(req.params.id)

  //   let db_connect = dbo.getDb();
  //   let myquery1 = { _id: ObjectId(req.params.id) };
  //   let projection = { _id: 0, first_name: 1, last_name: 1 };
  //   db_connect.collection("records").findOne(myquery1, projection)
  //     .then(result => {
  //       let userFirstName = result.first_name;
  //       let userLastName = result.last_name;
  //       console.log(userFirstName);
  //       console.log(userLastName);
  
  //       let myquery2 = { id: ObjectId(req.params.id) };
  //       db_connect
  //         .collection("transactions")
  //         .find(myquery2)
  //         .limit(10) 
  //         .sort( {transactionDate: -1} )
  //         .toArray(function (err, result) {
  //           if (err) throw err;
  //           res.json(result);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).send("Internal server error");
  //     });
  // });
  
  recordRoutes.route("/transaction-data/:id").get(function (req, res) {
    console.log(req.params.id);
  
    let db_connect = dbo.getDb();
    let myquery1 = { _id: ObjectId(req.params.id) };
    let projection = { _id: 0, first_name: 1, last_name: 1 };
    db_connect.collection("records").findOne(myquery1, projection)
      .then(result => {
        let userFirstName = result.first_name;
        let userLastName = result.last_name;
        console.log(userFirstName);
        console.log(userLastName);
  
        let myquery2 = { id: ObjectId(req.params.id) };
        db_connect
          .collection("transactions")
          .find(myquery2)
          .limit(10) 
          .sort( {transactionDate: -1} )
          .toArray(function (err, result) {
            if (err) throw err;
            res.json({
              transactions: result,
              userFirstName: userFirstName,
              userLastName: userLastName
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Internal server error");
      });
  });
  
  // Post a transaction in our db
  recordRoutes.route("/transaction/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let agentID = ObjectId(req.params.id);
    let moneyAmount = req.body.moneyAmount;
    // add agent name

  
    // Check if moneyAmount is not empty, a valid real number, and greater than 0
    if (!moneyAmount || isNaN(parseFloat(moneyAmount)) || parseFloat(moneyAmount) <= 0) {
      response.status(400).json({ error: "Invalid moneyAmount" });
      return;
    }
  
    let myobj = {
      id: agentID,
      moneyAmount: moneyAmount,
      transactionDate: new Date()
    };
    db_connect.collection("transactions").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });
  
  // This section will help you update a record by id.
  recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        region: req.body.region,
        rating:req.body.rating,
        fee: req.body.fee,
        sales: req.body.sales,
        manager: req.body.manager  
      },
    };
    db_connect
      .collection("records")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;//if the update is unsuccessfull
        console.log("1 document updated");//if the promise of update is successfull
        response.json(res);
      });
  });

  // This section will help you delete a record
  recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });

  // This section will help you create a session
  recordRoutes.route("/session").post(async function (req, res) {
    let db_connect = dbo.getDb();
    const { email, password } = req.body; //ajouter first_name et last_name?
    const users = await db_connect.collection("Utilisateurs").findOne({ email });

    if (!users || password !== users.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Delete all existing sessions for the user
    await db_connect.collection("Session").deleteMany({ user: users._id });

    // Create a new session token and store it in the Session collection **put this in a /session/:id middleware
    const session_token = uuidv4();
    const session = { session_token, user: users._id, email: users.email ,createdAt: new Date() };
    await db_connect.collection("Session").insertOne(session);
    return res.json({ success: true, token: session_token });
  });
  
// recordRoutes.route("report-data").get(async (req, res) => {
//   let db_connect = dbo.getDb();
  
// })


  module.exports = recordRoutes;