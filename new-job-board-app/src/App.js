import logo from "./logo.svg";
import { getHelloWorldMessageService } from "./services/HelloWorldServices";
import LoginContainer from "./login/LoginContainer.react.js";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [helloMessage, setHelloMessage] = useState("");
  const handleButtonClick = () => {
    console.log("here");
    getHelloWorldMessageService()
      // .then((response) => {
      //   response.json().then((data) => {
      //     console.log("here");
      //     console.log(data);
      //   });
      // })
      .then(r => r.text())
      .then(t => console.log(t))
      .catch((error) => {
        console.log("error");
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
