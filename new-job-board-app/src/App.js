import { getHelloWorldMessageService } from "./services/HelloWorldServices";
import LoginContainer from "./login/LoginContainer.react.js";
import "./App.css";
import React from "react";

function App() {
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
