//Logique du formulaire pour la mettre à jour les agents
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    password: ""
  });
  const params = useParams();
  const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       const id = params.id.toString();
//       const response = await fetch(`http://localhost:5000/login`);

//       if (!response.ok) {
//         const message = `An error has occured: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const record = await response.json();
//       if (!record) {
//         window.alert(`Record with id ${id} not found`);
//         navigate("/");
//         return;
//       }

//       setForm(record);
//     }

//     fetchData();

//     return;
//   }, [params.id, navigate]);

  // These methods will update the state properties.
  // function updateForm(value) {
  //   return setForm((prev) => {
  //     return { ...prev, ...value };
  //   });
  // }

  // async function onSubmit(e) {
  //   e.preventDefault();
  //   const editedPerson = {
  //     first_name: form.first_name,
  //     last_name: form.last_name,
  //     email: form.email,
  //     password: form.password,
  //   };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/login`, {//cal the update route
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
      <h3>Login</h3>
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
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="text"
            className="form-control"
            id="pwd"
            value={form.pwd}
            onChange={(e) => updateForm({ pwd: (e.target.value) })}
          />
        </div>
      </form>
    </div>
  );
}
// /FORM