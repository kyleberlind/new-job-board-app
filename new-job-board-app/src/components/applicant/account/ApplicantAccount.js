import { Button, Container } from "react-bootstrap";
import { loadApplicantInfoService, loadApplicantInfoFromId } from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import React, { useState, useEffect } from "react";

function ApplicantAccount() {
  const [userId, setUserId] = useState(null);
  const [applicantInfo, setApplicantInfo] = useState({
    applicantId: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    loadApplicantInfoService().then((response) => {
      response.json().then((data) => {
        if (!data["applicantData"]) {
          window.location.assign("login");
        } else {
          setUserId(data["applicantData"]);
          loadApplicantInfoFromId(userId).then((response) => {
            response.json().then((data) => {
              setApplicantInfo(data);
            });
          });
        }
      });
    });
  });

  return (
    <Container className="container" fluid>
      <h3>
        Name: {applicantInfo.firstName + " " + applicantInfo.lastName}
      </h3>
      <h4>
        Email: {applicantInfo.emailAddress}
      </h4>
      <h4>
        ID: {applicantInfo.applicantId}
      </h4>
    </Container>
  );
}

export default ApplicantAccount;
