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
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transaction-data/:id" element={<Transaction />} />
          <Route path="/transaction/:id" element={<AddTransaction />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
