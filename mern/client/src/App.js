import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import AddTransaction from "./components/addTransaction";
import Transaction from "./components/transaction";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="homepage-container">
      <div className="homepage-card" onClick={handleNavigateToRecordList}>
        <h3>Agents Manipulation</h3>
      </div>
      <div className="homepage-card" onClick={handleNavigateToCreate}>
        <h3>Create an agent</h3>
      </div>
    </div>
  );
};

export default App;
