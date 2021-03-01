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
                    <ListGroup.Item action href={"#job".concat(application.applicationId)}>
                      <div className="jobApplicationListItemHeader">
                        <div className="jobApplicationListItemMain">
                          {application.employerName}
                        </div>
                        <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                          {application.city.concat(", ").concat(application.state)}
                        </div>
                      </div>
                      <div className="jobApplicationListItemFooter">
                        <div className="jobApplicationListItemMeta">
                          {application.role}
                        </div>
                        <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                          {application.dateApplied} {/* REPLACE WITH JOB STATUS */}
                        </div>
                      </div>
                    </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                {props.jobApplications.map(application =>
                  <Tab.Pane eventKey={"#job".concat(application.applicationId)}>
                    <h1>
                      {application.role}
                    </h1>
                    <h3>
                      {application.employerName}
                    </h3>
                    <h4>
                      {application.city.concat(", ").concat(application.state)}
                    </h4>
                    <p>
                      {application.description}
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
    applicationId: PropTypes.number.isRequired,
    dateApplied: PropTypes.string.isRequired,
    employerName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
   })).isRequired,
}

export default ApplicantConsoleJobApplicationsContainer;
