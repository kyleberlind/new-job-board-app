import { Button, Container, InputGroup, Form, FormControl, ListGroup, Tab, Col, Row} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
} from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import PropTypes from 'prop-types';

import './css/ApplicantConsole.css';


const ApplicantConsoleSearchResultsContainer = (props) => {
  return (
    <div className="jobApplicationsContainer">
      {props.jobPostings.length === 0
        ?
          <div>
            No job postings found
          </div>
        :
          <Tab.Container id="list-group-tabs-example">
            <Row>
              <Col sm={6}>
                <ListGroup>
                  {props.jobPostings.map(posting =>
                      <ListGroup.Item action href={"#search_result_posting".concat(posting.id)}>
                        <div className="jobApplicationListItemHeader">
                          <div className="jobApplicationListItemMain">
                            {posting.role}
                          </div>
                          <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                            {posting.city}
                          </div>
                        </div>
                        <div className="jobApplicationListItemFooter">
                          <div className="jobApplicationListItemMeta">
                            {posting.dateCreated}
                          </div>
                        </div>
                      </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
              <Col sm={6}>
                <Tab.Content>
                  {props.jobPostings.map(posting =>
                    <Tab.Pane eventKey={"#search_result_posting".concat(posting.id)}>
                      <div className={"searchResultPosting"}>
                        <Button onClick={() => {}} className={"jobPostingAddToJobCartButton"}>
                          Add to Job Cart
                        </Button>
                        <h1>
                          {posting.role}
                        </h1>
                        <h3>
                          {posting.city}
                        </h3>
                        <h4>
                          {posting.state}
                        </h4>
                        <p>
                          {posting.description}
                        </p>
                      </div>
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        }
    </div>
  );
};

ApplicantConsoleSearchResultsContainer.propTypes = {
  jobPostings: PropTypes.arrayOf(PropTypes.shape({
     id: PropTypes.number.isRequired,
     city: PropTypes.string.isRequired,
     dateCreated: PropTypes.string.isRequired,
     description: PropTypes.string.isRequired,
     employerId: PropTypes.number.isRequired,
     role: PropTypes.string.isRequired,
     state: PropTypes.string.isRequired,
     zipCode: PropTypes.number.isRequired,
   })).isRequired,
}

export default ApplicantConsoleSearchResultsContainer;
