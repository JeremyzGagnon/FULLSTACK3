import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import AddTransaction from "./components/addTransaction";
import Transaction from "./components/transaction";
import Cookies from 'js-cookie'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    if ( location.pathname.startsWith("/")) {
      let cookie = Cookies.get('token')
      console.log(cookie);
      if (cookie) {
        fetch(`http://localhost:5000/validate-token?token=${cookie}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response => response.json()))
        .then(data => {
          if (data.status == "error") {
            throw new Error (data.message);
          } else if (data.data.valid == true) {
            console.log("token validated");
          } else if (data.data.valid == false) {
            console.log("Invalid token");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
      } else {
        navigate("/login");
      }
      
            
    }
  }, [location.pathname]);

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/record-list" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transaction-data/:id" element={<Transaction />} />
          <Route path="/transaction/:id" element={<AddTransaction />} />
        </Routes>
      </div>
      <style>{`
        .homepage-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .homepage-card {
          border: 2px solid #ccc;
          padding: 20px;
          margin: 0 10px;
          cursor: pointer;
          width: 500px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .homepage-card:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigateToRecordList = () => {
    navigate("/record-list");
  };

  const handleNavigateToCreate = () => {
    navigate("/create");
  };

  const cardStyleRecord = {
    backgroundImage: `url("")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    width: "300px",
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  };

  const cardStyleUpdate = {
    backgroundImage: `url("path/to/image.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    width: "300px",
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  };


  return (
    <div className="homepage-container">
      <div style={cardStyleUpdate} className="homepage-card" onClick={handleNavigateToCreate}>
        <h3>Create an agent</h3>
      </div>
      <div style={cardStyleRecord} className="homepage-card" onClick={handleNavigateToRecordList}>
        <h3>Agents Manipulation</h3>
      </div>

    </div>
  );
};

export default App;
