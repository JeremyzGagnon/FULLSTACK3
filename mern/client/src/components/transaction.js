import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Record = (props) => (
  <tr>
    <td>{props.record.moneyAmount}</td>
  </tr>
);

export default function Transaction() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const params = useParams();


  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/transaction-data/:id`); // /record in route.js

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




  // This method will delete a record
//   async function deleteRecord(id) {
//     const confirmDelete = window.confirm("Are you sure you want to delete this record?");
//     if (confirmDelete) {
//       await fetch(`http://localhost:5000/${id}`, {
//         method: "DELETE"
//       });
  
//       const newRecords = records.filter((el) => el._id !== id);
//       setRecords(newRecords);
//     }
//   }
  
  // This method will map out the records on the table
//   function recordList() {
//     return records.map((record) => {
//       return (
//         <Record
//           record={record}
//           deleteRecord={() => deleteRecord(record._id)}
//           key={record._id}
//         />
//       );
//     });
//   }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Transaction List</h3>
      <Button onClick={() => navigate(`/transaction/${params.id}`)} variant="primary">Add new transaction</Button>{' '}

      <table className="table table-striped" style={{ marginTop: 20 }}>

        <thead>
          <tr>
            <th>Past Transactions</th>
          </tr>
        </thead>
        {/* <tbody>{recordList()}</tbody> */}
      </table>
    </div>
  );
}
