//Logique pour voir tout les agents/client dans notre bases de donnée

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Record = (props) => (
  <tr>
    <td>{props.record.first_name}</td>
    <td>{props.record.last_name}</td>
    <td>{props.record.email}</td>
    <td>{props.record.region}</td>
    <td>{props.record.rating}</td>
    <td>{props.record.fee}</td>
    <td>{props.record.sales}</td>
    <td>{props.record.manager ? "Manager" : "Employee"}</td>


    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button> |
      <Link className="btn btn-link" to={`/transaction-data/${props.record._id}`}>Transactions</Link>

    </td>
  </tr>
);

export default function RecordList() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`); // /record in route.js

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };



  // This method will delete a record
  async function deleteRecord(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE"
      });
  
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    }
  }
  
  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <Button onClick={logout} variant="primary">Logout</Button>{' '}

      <table className="table table-striped" style={{ marginTop: 20 }}>

        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Sales</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
