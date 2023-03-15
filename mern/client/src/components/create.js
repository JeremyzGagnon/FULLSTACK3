//Logique du formulaire pour la création des agents
import React, { useState } from "react";
import { useNavigate } from "react-router";
// import Button from 'react-bootstrap/Button';



export default function Create() {
  const [form, setForm] = useState({//to store the values of the form input fields
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
    sales: "",
    manager: false
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {//defined to update the form state variable with the input values when they change
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
  
    const confirmed = window.confirm("Are you sure you want to create a new record?");
  
    if (confirmed) {
      const newPerson = { ...form };
  
      await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  
      setForm({first_name: "",last_name: "",email: "",region: "",rating: "",fee: "",sales: "", manager: ""});
      navigate("/");
    }
  }
  //Display the form
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}//calls the function updateForm to update the corresponding state variable
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}//calls the function updateForm to update the corresponding state variable
          />
        </div>


        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          {/*Radio button for region  */}

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionNorth"
              value="north"
              checked={form.region === "north"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionNorth" className="form-check-label">North</label>
          </div>
          
          <div className="form-check form-check-inline"> 
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionSouth"
              value="south"
              checked={form.region === "south"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionSouth" className="form-check-label">South</label>
          </div>
          <div className="form-check form-check-inline"> 
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionWest"
              value="west"
              checked={form.region === "west"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionWest" className="form-check-label">West</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionEast"
              value="east"
              checked={form.region === "east"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionEast" className="form-check-label">East</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Fee</label>
          <input
            type="text"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sales">Sales</label>
          <input
            type="text"
            className="form-control"
            id="sales"
            value={form.sales}
            onChange={(e) => updateForm({ sales: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="manager">Manager</label>
          <select
            type="text"
            className="form-control"
            id="manager"
            value={form.manager}
            onChange={(e) => updateForm({ manager: (e.target.value) === 'true' })}>
            <option value={false}>Employee</option>
            <option value={true}>Manager</option>
            </select>
        </div>
        
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}