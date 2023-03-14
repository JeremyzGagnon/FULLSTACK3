  //This is the file to add,update, delete, find employees in our db
  const crypto = require('crypto-browserify');

  const express = require("express");//import express

  // recordRoutes is an instance(object) of the express router.
  // We use it to define our routes.
  // The router will be added as a middleware and will take control of requests starting with path /record.//(take control of requests)
  const recordRoutes = express.Router();

  // This will help us connect to the database
  const dbo = require("../db/conn");

  // This help convert the id from string to ObjectId for the _id.
  const ObjectId = require("mongodb").ObjectId; //imports the id string converter of mongodb
  const cookieParser = require('cookie-parser');

  recordRoutes.use(cookieParser());

  // Our route

// Middleware function to validate token
// const validateToken = async (req, res, next) => {

//   if (req.url === "/login") {
//     // Skip token verification for /login endpoint
//     return next();
//   }

//     const token = req.cookies.token;
    
//     if (!token) {
//       return res.status(400).json({ message: "Token is required" });
//     }

//     let db_connect = dbo.getDb();

//     const session = await db_connect.collection("Session").findOne({ session_token: token });

//     if (!session) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     if (session.createdAt < new Date(Date.now() - 86400000)) {
//       // Remove expired session
//       await db_connect.collection("Session").deleteOne({ session_token: token });
//       return res.status(401).json({ message: "Token has expired" });
//     }

//     // Modify data object to return email instead of first_name and last_name
//     res.json({ status: "ok",data: {valid: true, user: { id: session.user, email: session.email}, message: null} });
//   next();
// }

// Attach the middleware to all routes
// recordRoutes.use(validateToken);



  //Login Routes

  // recordRoutes.route("/login").post(async function  (req, response) {
  //   let db_connect = dbo.getDb();
  //   const {email,password} = req.body;
  //   const users = await db_connect.collection("Utilisateurs").findOne({"email":email});

  //   if (!users) {
  //     return response.status(400).json({ message: "invalid email or password"})
  //   }

  //   if(password !== users.password){
  //     return response.json(false)
  //   }

  //   response.json(true)
  // });


  recordRoutes.route("/login").post(async function (req, res) {
    let db_connect = dbo.getDb();
    const { email, password } = req.body; //ajouter first_name et last_name?
    const users = await db_connect.collection("Utilisateurs").findOne({ email });

    if (!users || password !== users.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Delete all existing sessions for the user
    await db_connect.collection("Session").deleteMany({ user: users._id });

    // Create a new session token and store it in the Session collection
    const session_token = crypto.randomBytes(64).toString("hex");
    const session = { session_token, user: users._id, email: users.email ,createdAt: new Date() };
    await db_connect.collection("Session").insertOne(session);
    return res.json({ success: true, token: session_token });
  });

  // recordRoutes.route("/validate-token").get(async function (req, res) {
  //   // const token = req.cookies.token; // get token from cookie
  //   const token = req.cookies.token;
  //   console.log(token);
    
  //   if (!token) {
  //     return res.status(400).json({ message: "Token is required" });
  //   }

  //   let db_connect = dbo.getDb();

  //   const session = await db_connect.collection("Session").findOne({ session_token: token });

  //   if (!session) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  //   if (session.createdAt < new Date(Date.now() - 86400000)) {
  //     // Remove expired session
  //     await db_connect.collection("Session").deleteOne({ session_token: token });
  //     return res.status(401).json({ message: "Token has expired" });
  //   }

  //   // Modify data object to return email instead of first_name and last_name
  //   res.json({ status: "ok",data: {valid: true, user: { id: session.user, email: session.email}, message: null} });
  // });

  // recordRoutes.route("/validate-token").post(async function (req, res) {
  //   // console.log("API HIT")

  //   const { token, id, first_name, last_name } = req.body;
    
  //   if (!token) {
  //     return res.status(400).json({ message: "Token is required" });
  //   }

  //   let db_connect = dbo.getDb();

  //   const session = await db_connect.collection("Session").findOne({ session_token: token });

  //   if (!session) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  //   if (session.createdAt < new Date(Date.now() - 86400000)) {
  //     // Remove expired session
  //     await db_connect.collection("Session").deleteOne({ session_token: token });
  //     return res.status(401).json({ message: "Token has expired" });
  //   }
  // //message finale token is valid
  //   res.json({ status: "ok",data: {valid: true, user: {first_name, last_name, id}, message: null} });
  // });


  // /Login Routes

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

  //Post a transaction in our db
  // recordRoutes.route("/transactions/:id").post(function (req, response) {
  //   console.log('SERVER HIT')
  //   let db_connect = dbo.getDb();
  //   let agentID = ObjectId( req.params.id );
  //   let myobj = {
  //     id: agentID,
  //     moneyAmount: req.body.moneyAmount,
  //   };
  //   db_connect.collection("transactions").insertOne(myobj, function (err, res) {
  //     if (err) throw err;
  //     response.json(res);//si la promesse est résolue réponds avec le document ajouter à la db
  //   });
  // });

  //fetch the transactions

  // recordRoutes.route("transaction/:id").get(function (req, res) {
  //   console.log("API HIT")
  //   let db_connect = dbo.getDb();
  //   let myquery = { _id: ObjectId( req.params.id )};//convert the id submitted by the client to a MongoDB ObjectId
  //   db_connect
  //       .collection("transactions")
  //       .find(myquery, function (err, result) {
  //         if (err) throw err;
  //         res.json(result);
  //       });
  // });

  recordRoutes.route("transaction-data/:id").get(function (req, res) {
    console.log("API HIT");
    console.log(req.params.id)

    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("transactions")
      .find(myquery)
      .limit(10) // Add this line to limit the number of documents returned
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });


  // Post a transaction in our db
  recordRoutes.route("/transaction/:id").post(function (req, response) {
    console.log('SERVER HIT')
    let db_connect = dbo.getDb();
    let agentID = ObjectId( req.params.id );
    let myobj = {
      id: agentID,
      moneyAmount: req.body.moneyAmount,
    };
    db_connect.collection("transactions").insertOne(myobj, function (err, res) {
      if (err) throw err;
      // console.log(myobj);
      response.json(res);//si la promesse est résolue réponds avec le document ajouter à la db
    });
  });



  // recordRoutes.route("/add-transactions/:id").get(function (req, res) {//list everyone
  //   let db_connect = dbo.getDb("employees");
  //   db_connect
  //     .collection("transactions")
  //     .find( {id: req.params.id} )
  //     .toArray(function (err, result) {
  //       if (err) throw err;
  //       res.json(result);
  //     });
  // });


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

  module.exports = recordRoutes;