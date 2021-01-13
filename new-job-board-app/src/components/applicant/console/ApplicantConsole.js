import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
} from "../../../services/applicant/ApplicantServices";

const ApplicantConsole = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    loadApplicantInfoService().then((response) => {
      response.json().then((data) => {
        if (!data["applicantData"]) {
          window.location.assign("login");
        } else {
          setUserId(data["applicantData"]);
        }
      });
    });
  });

  return (
    <Container fluid>
      {userId}
    </Container>
  );
};

export default ApplicantConsole;
