import { Button, Container, InputGroup, Form, FormControl, ListGroup, Tab, Col, Row} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
} from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import { searchJobPostings } from "../../../services/applicant/ApplicantServices.js";
import PropTypes from 'prop-types';

import './css/ApplicantConsole.css';


const ApplicantConsoleJobApplicationsContainer = (props) => {
  return (
    <div>
      <div className="header">
        Your Applications
      </div>
      <div className="jobApplicationsContainer">
        <Tab.Container id="list-group-tabs-example">
          <Row>
            <Col sm={6}>
              <ListGroup>
                {props.jobApplications.map(application =>
                    <ListGroup.Item action href={"#job".concat(application.id)}>
                      <div className="jobApplicationListItemHeader">
                        <div className="jobApplicationListItemMain">
                          {application.company}
                        </div>
                        <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                          {application.location}
                        </div>
                      </div>
                      <div className="jobApplicationListItemFooter">
                        <div className="jobApplicationListItemMeta">
                          {application.jobTitle}
                        </div>
                        <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                          {application.applicationStatus}
                        </div>
                      </div>
                    </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                {props.jobApplications.map(application =>
                  <Tab.Pane eventKey={"#job".concat(application.id)}>
                    <h1>
                      {application.company}
                    </h1>
                    <h3>
                      {application.jobTitle}
                    </h3>
                    <h4>
                      {application.location}
                    </h4>
                    <p>
                      {application.jobDescription}
                    </p>
                    <p>
                      {application.applicationStatus}
                    </p>
                  </Tab.Pane>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

ApplicantConsoleJobApplicationsContainer.propTypes = {
  jobApplications: PropTypes.arrayOf(PropTypes.shape({
     id: PropTypes.string.isRequired,
     company: PropTypes.string.isRequired,
     jobTitle: PropTypes.string.isRequired,
     location: PropTypes.string.isRequired,
     jobDescription: PropTypes.string.isRequired,
     applicationStatus: PropTypes.string.isRequired
   })).isRequired,
}

export default ApplicantConsoleJobApplicationsContainer;
