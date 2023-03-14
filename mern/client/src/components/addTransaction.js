//Logique du formulaire pour la création des agents
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";



export default function AddTransaction() {
  const [form, setForm] = useState({//to store the values of the form input fields
    // id: "",
    moneyAmount: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {//defined to update the form state variable with the input values when they change
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {//handles the form submission it will sends a POST request to the backend API to create a new record 
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTransaction = { ...form };
    console.log(newTransaction)
    await fetch(`http://localhost:5000/transaction/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({moneyAmount: "",});
    navigate("/");
  }
//Display the form
  return (
    <div>
      <h3>Enter the amount of the transaction:</h3>
      {/* <p>{params.id}</p> */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="moneyAmount"></label>
          <input
            type="text"
            className="form-control"
            id="moneyAmount"
            value={form.moneyAmount}
            onChange={(e) => updateForm({ moneyAmount: parseInt(e.target.value) })}//calls the function updateForm to update the corresponding state variable
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit amount"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}