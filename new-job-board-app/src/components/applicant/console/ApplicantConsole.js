import { Button, Container, InputGroup, Form, FormControl, ListGroup, Tab, Col, Row} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
  loadJobCart,
  searchJobPostings
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
        }
      });
    });
  });

  const jobApplications = [
    {
      id: "1",
      company: "Facebook",
      jobTitle: "Software Engineer",
      location: "Menlo Park, CA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "In Review",
    },
    {
      id: "2",
      company: "Amazon",
      jobTitle: "Software Engineer",
      location: "Seattle, WA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "Recruiter Reach Out on 11/21",
    },
    {
      id: "3",
      company: "Google",
      jobTitle: "Software Engineer II",
      location: "Mountainview, CA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "In Review",
    },
    {
      id: "4",
      company: "Microsoft",
      jobTitle: "Senior Software Engineer",
      location: "Seattle, WA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "In Review",
    },
    {
      id: "5",
      company: "Stripe",
      jobTitle: "Software Devlopment Engineer",
      location: "San Francisco, CA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "In Review",
    },
    {
      id: "6",
      company: "Palantir",
      jobTitle: "Product Engineer",
      location: "San Jose, CA",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "Rejected",
    },
    {
      id: "7",
      company: "Red Hat",
      jobTitle: "Full Stack Software Engineer",
      location: "New York, NY",
      jobDescription: "This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly. This is a dummy job description. \
      This job is so silly. This is a dummy job description. This job is so silly.",
      applicationStatus: "Recruiter Reached Out on 1/15",
    },
  ];

  return (
    <Container className="container" fluid>
      {userId}
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
