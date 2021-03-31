import { Button, Container, InputGroup, Form, FormControl, ListGroup, Tab, Col, Row} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
  loadJobCart,
  searchJobPostings,
  loadApplicantJobApplicationsFromId
} from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import ApplicantConsoleJobApplicationsContainer from "./ApplicantConsoleJobApplicationsContainer.js"
import ApplicantConsoleSearchResultsContainer from "./ApplicantConsoleSearchResultsContainer.js"

import './css/ApplicantConsole.css';


const ApplicantConsole = () => {
  const [userId, setUserId] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [fields, handleFieldChange] = useFormFields({
    jobSearchQuery: "",
    jobSearchLocationQuery: "",
  });
  const [jobApplications, setJobApplications] = useState([]);
  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    searchJobPostings(fields)
      .then((response) => {
        // TODO: add actual error handling
        response.json().then((data) => {
          if (data["hasError"]) {
            console.log("ERROR"); // fix this
          } else {
            setSearchResults(data["jobPostings"]);
          }
        });
      });
    setShowSearchResults(true);
  };

  useEffect(() => {
    loadApplicantInfoService().then((response) => {
      response.json().then((data) => {
        if (!data["applicantData"]) {
          window.location.assign("login");
        } else {
          setUserId(data["applicantData"]);
          console.log(userId);
        }
      });
    });
  });

  useEffect(() => {
    loadApplicantJobApplicationsFromId(userId).then((response) => {
      response.json().then((data) => {
        if (data["hasError"]) {
          console.log(data["errorMessage"]);
        }
        else {
          const applications = data["applications"].map(application => {
            return {
              applicationId: application.applicationId,
              dateApplied: application.dateApplied,
              employerName: application.employerName,
              description: application.description,
              role: application.role,
              city: application.city,
              state: application.state,
            }
          });
          setJobApplications(applications);
        }
      })
    });
  }, [userId])

  return (
    <Container className="container" fluid>
        <Form className="searchBar" onSubmit={handleSubmitButtonClick}>
          <Form.Group controlId="jobSearchQuery" className="searchInput">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>What</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Job title, keywords, or company"
                value={fields.jobSearchQuery}
                onChange={handleFieldChange}
                />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="jobSearchLocationQuery" className="searchInput">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Where</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder='City, state, zip code, or "remote"'
                value={fields.jobSearchLocationQuery}
                onChange={handleFieldChange}
              />
            </InputGroup>
          </Form.Group>
          <Button className="submitButton" type="submit" variant="primary">
            Find Jobs
          </Button>
        </Form>
        {
          showSearchResults ?
            <div>
              <div className="header">
                {'Search results for "'.concat(fields.jobSearchQuery, '" in "', fields.jobSearchLocationQuery, '"')}
              </div>
              <ApplicantConsoleSearchResultsContainer applicantId={userId} jobPostings={searchResults} />
            </div>

          :
          <ApplicantConsoleJobApplicationsContainer jobApplications={jobApplications} />
        }
    </Container>
  );
};

export default ApplicantConsole;
