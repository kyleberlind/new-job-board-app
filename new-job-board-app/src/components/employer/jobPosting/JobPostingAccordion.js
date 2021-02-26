import React, {useEffect, useState} from "react";
import { Container, Button, Row, Col, Card, Accordion } from "react-bootstrap";
import JobPostingCard from "./JobPostingCard";
import {loadJobApplicantsService} from "../../../services/employer/EmployerServices";
import { Loader } from "semantic-ui-react";

const JobPostingAccordion = (props) => {
  const [areApplicantsLoading, setAreApplicantsLoading] = useState(false)
  
  useEffect(() => {
  },[])

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Button} variant="dark" eventKey="0">
          <JobPostingCard jobPosting={props.jobPosting} />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Container fluid>
            <Row noGutters>
              <Col lg={6}>
                <Card>
                  <Card.Body>
                    ID: {props.jobPosting.generalInfo.id}
                    Description: {props.jobPosting.generalInfo.description}
                  </Card.Body>
                  <Card.Footer>
                    <Container fluid>
                      <Row>
                        <Col>
                          <Button
                            block
                            variant="primary"
                            onClick={() => {
                              props.setSelectedJobPosting(props.jobPosting);
                              props.setShowEditJobPostingModal(true);
                            }}
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            block
                            variant="secondary"
                            onClick={() => {
                              props.setSelectedJobPosting(props.jobPosting);
                              props.setShowDeleteJobPostingConfirmationModal(
                                true
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>Applicants</Card>
                {areApplicantsLoading ? (
                <Loader active />
              ) : (
                  <Card>kyle</Card>
              )}
              </Col>
            </Row>
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default JobPostingAccordion;
