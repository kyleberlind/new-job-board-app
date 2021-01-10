import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantDataService,
  logoutService,
} from "../../../services/AccountServices";
import ApplicantConsoleNavBar from "./ApplicantConsoleNavBar";

const ApplicantConsole = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    loadApplicantDataService().then((response) => {
      response.json().then((data) => {
        if (!data["applicantData"]) {
          window.location.assign("login");
        } else {
          setUserId(data["applicantData"]);
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
      <ApplicantConsoleNavBar handleLogout={handleLogout} />
      {userId}
    </Container>
  );
};

export default ApplicantConsole;
