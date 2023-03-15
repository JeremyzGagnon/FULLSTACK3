import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    logMe();
  };

  const logMe = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  fetch("http://localhost:5000/login", requestOptions)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const token = data.token;
      // console.log(token) //ok
      Cookies.set("token", token, { expires: 1 });
      setShowAlert(true);
      navigate("/");
    } else {
      setemailError("Invalid email or password");
      window.alert("Invalid email or password");
    }
  })
  .catch(error => console.log('error', error));
}

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
            <img src="../../R2Mongo.png" style={{ width: "100%", height: "auto", marginBottom: '10%' }}alt="logo" />
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {showAlert && <Alert variant='success'>This is a  alert—check it out!</Alert>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
