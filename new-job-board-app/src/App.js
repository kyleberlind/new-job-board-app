
import logo from './logo.svg';
import {getHelloWorldMessageService} from "./services/HelloWorldServices"
import LoginContainer from './login/LoginContainer.react.js';
import './App.css';
import React, { useState } from "react";

function App() {
  const [helloMessage, setHelloMessage] = useState("");
  const handleButtonClick = () => {
    getHelloWorldMessageService()
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  };
  return (
    <div className="App">
      <LoginContainer />
    </div>
  );
}

export default App;
