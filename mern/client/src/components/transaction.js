import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }).format(date);
  return formattedDate;
}

const Record = (props) => (
  <tr>
    <td>{props.record.moneyAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
    <td>{formatDate(props.record.transactionDate)}</td>
  </tr>
);

export default function Transaction() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const params = useParams();

  useEffect(() => {
    async function getTransactionData() {
      const response = await fetch(`http://localhost:5000/transaction-data/${params.id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      setRecords(data.transactions);
      setUserFirstName(data.userFirstName);
      setUserLastName(data.userLastName);
    }

    getTransactionData();
  }, [params.id]);

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
<div className="d-flex justify-content-between">
  <h3>Transaction List</h3>
  <Button onClick={() => navigate(`/transaction/${params.id}`)} variant="primary">Add new transaction</Button>{' '}
</div>
<div className="d-flex justify-content-between">
  <b><p>Agent {userFirstName} {userLastName}'s transactions</p></b>
</div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Past Transactions</th>
            <th>Date of transaction</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
