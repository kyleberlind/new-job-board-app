import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadEmployerDataService,
  logoutService,
} from "../../../services/AccountServices";
import EmployerConsoleNavBar from "./EmployerConsoleNavBar"
const EmployerConsole = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    loadEmployerDataService().then((response) => {
      response.json().then((data) => {
        if (!data["employerData"]) {
          window.location.assign("login");
        } else {
          setUserId(data["employerData"]);
        }
      });
    });
  });

  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <EmployerConsoleNavBar handleLogout={handleLogout}/>
      {userId}
    </Container>
  );
};

export default EmployerConsole;
