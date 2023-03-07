//Logique du formulaire pour la mettre à jour les agents
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
    sales: "",
    manager: false

    // name: "",
    // position: "",
    // level: "",
    // records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      region: form.region,
      rating: form.rating,
      fee: form.fee,
      sales: form.sales,
      manager: form.manager,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {//cal the update route
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    navigate("/");
  }


  //FORM
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
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
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
// /FORM