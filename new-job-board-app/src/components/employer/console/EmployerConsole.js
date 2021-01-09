import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadEmployerDataService,
  logoutService,
} from "../../../services/AccountServices";

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
    logoutService().then(() => {
      window.location.assign("/");
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <Container>
      {userId}
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default EmployerConsole;
