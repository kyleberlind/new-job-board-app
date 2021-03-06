import { Button, Container, InputGroup, Form, FormControl, ListGroup, Tab, Col, Row} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
  addPostingToJobCart
} from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import PropTypes from 'prop-types';
import {jobPostingShape} from "../../../shapes/JobPostingShape";
import { connect } from "react-redux";


import './css/ApplicantConsole.css';


const ApplicantConsoleSearchResultsContainer = (props) => {
  const addToJobCartClick = (applicantId, jobId, employerId) => {
    addPostingToJobCart({
      "applicantId" : applicantId,
      "jobId" : jobId,
      "employerId" : employerId,
    }).then((response) => {
      response.json().then((data) => {
        if (data["hasError"]) {
          console.log("ERROR"); // fix this
          console.log(data);
        } else {
          console.log(data);
          props.updateJobCart(data['jobCart']);
        }
      });
    });
  }

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
                      <ListGroup.Item key={posting.generalInfo.id} action href={"#search_result_posting".concat(posting.generalInfo.id)}>
                        <div className="jobApplicationListItemHeader">
                          <div className="jobApplicationListItemMain">
                            {posting.generalInfo.role}
                          </div>
                          <div className="jobApplicationListItemMeta jobApplicationListItemMetaEnd">
                            {posting.location.city}
                          </div>
                        </div>
                        <div className="jobApplicationListItemFooter">
                          <div className="jobApplicationListItemMeta">
                            {posting.generalInfo.dateCreated}
                          </div>
                        </div>
                      </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
              <Col sm={6}>
                <Tab.Content>
                  {props.jobPostings.map(posting =>
                    <Tab.Pane key={posting.generalInfo.id} eventKey={"#search_result_posting".concat(posting.generalInfo.id)}>
                      <div className={"searchResultPosting"}>
                        <Button
                          onClick={() => {
                              addToJobCartClick(props.applicantId, posting.generalInfo.id, posting.employerId)
                            }
                          }
                          className={"jobPostingAddToJobCartButton"}
                          disabled={posting.generalInfo.applied }>
                          {posting.generalInfo.applied ? "Applied" : "Add to Job Cart"}
                        </Button>
                        <h1>
                          {posting.generalInfo.role}
                        </h1>
                        <h3>
                          {posting.location.city}
                        </h3>
                        <h4>
                          {posting.location.state}
                        </h4>
                        <p>
                          {posting.generalInfo.description}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateJobCart: (newJobCart) => { dispatch({type: 'UPDATE_JOB_CART', jobCart: newJobCart }) }
  }
}

ApplicantConsoleSearchResultsContainer.propTypes = {
  jobPostings: PropTypes.arrayOf(jobPostingShape).isRequired,
   applicantId: PropTypes.number.isRequired,
}

export default connect( () => {}, mapDispatchToProps)(ApplicantConsoleSearchResultsContainer);
