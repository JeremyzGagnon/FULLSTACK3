import React from "react"; //create and manage components in my application
import ReactDOM from "react-dom"; //renders the components in the browser
import App from "./App"; //main logic of the app
import { BrowserRouter } from "react-router-dom"; //enables client-side routing in your React application


ReactDOM.render(//render(JSX, DOM element) is a function to render the React application in the browser
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")//DOM element
);
//React.StrictMode is used to activate additional checks and warnings for potential problems in the application.\
// uhqbefhbqehorgjegijnewjjbnvijorwb 