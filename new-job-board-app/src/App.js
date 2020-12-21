import logo from "./logo.svg";
import { getHelloWorldMessageService } from "./services/HelloWorldServices";
import LoginContainer from "./login/LoginContainer.react.js";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [helloMessage, setHelloMessage] = useState("");
  const handleButtonClick = () => {
    getHelloWorldMessageService()
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <LoginContainer />
      <button onClick={handleButtonClick}>click to connect to backend </button>
    </div>
  );
}

export default App;
