import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import AddTransaction from "./components/addTransaction";
import Transaction from "./components/transaction";

const App = () => {
  // const [isLoggedIn,setIsLoggedIn]=useState("false")
  
  const navigate = useNavigate();

useEffect(() => {
  // Checking if user is not loggedIn
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log('isLoggedIn', isLoggedIn);
  if (isLoggedIn !== "true") {
    
    navigate("/login");
  }
}, []);


  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transaction/:id" element={<Transaction />} />
        <Route path="/add-transactions/:id" element={<AddTransaction />} />

        
      </Routes>
      </div>
    </div>
  );
};

export default App;