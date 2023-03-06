const express = require("express");//import express
const app = express();//create an express instance
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });//imports the config.env file
const port = process.env.PORT || 5000;//set port num
app.use(cors());//resolve the cors problem
app.use(express.json());//convert the client request to json format
app.use(require("./routes/record"));//use our routes file
// get driver connection
const dbo = require("./db/conn");//import db conn.js

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
