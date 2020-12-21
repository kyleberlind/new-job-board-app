import React, { useState } from "react";
import { getHelloWorldMessage } from "./services/HelloWorldServices";

function App() {
  const [helloMessage, setHelloMessage] = useState("");
  const handleButtonClick = () => {
    getHelloWorldMessage()
    .then((response) => {
      console.log("kyle")
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleButtonClick}>Press to Connect to Backend</button>
        {helloMessage}
      </header>
    </div>
  );
}

export default App;
