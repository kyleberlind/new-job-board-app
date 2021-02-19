import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Spinner
} from "react-bootstrap";
import DeleteJobPostingConfirmationModal from "../jobPosting/DeleteJobPostingConfirmationModal";
import PropTypes from "prop-types";
import EditJobPostingModal from "../jobPosting/EditJobPostingModal";
import { loadJobPostingsByEmployerIdService } from "../../../services/employer/EmployerServices";
import JobPostingAccordion from "../jobPosting/JobPostingAccordion";
import {
  NO_JOB_POSTINGS_MESSAGE,
  MY_JOB_POSTINGS_TITLE,
} from "../constants/EmployerConstants";

//TODO refactor all of the crud functionality to update a centralized redux state, then create toast confirmational messages
const EmployerConsole = (props) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [areJobPostingsLoading, setAreJobPostingsLoading] = useState(true);
  const [showEditJobPostingModal, setShowEditJobPostingModal] = useState(false);
  const [
    showDeleteJobPostingConfirmationModal,
    setShowDeleteJobPostingConfirmationModal,
  ] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState({});

  useEffect(() => {
    if (
      Object.keys(props.employer).length !== 0 &&
      props.employer.employerId !== ""
    ) {
      setAreJobPostingsLoading(true);
      loadJobPostingsByEmployerIdService(props.employer.employerId)
        .then((response) => {
          response.json().then((data) => {
            if (data["jobPostings"].length > 0) {
              setJobPostings(data["jobPostings"]);
            }
            setAreJobPostingsLoading(false);
          });
        })
        .catch((error) => {
          setAreJobPostingsLoading(false);
          console.log(error);
        });
    }
  }, [props.employer]);

  const generateJobPostings = () => {
    return jobPostings.length > 0 ? (
      jobPostings.map((jobPosting) => {
        return (
          <JobPostingAccordion
            key={jobPosting.generalInfo.id}
            jobPosting={jobPosting}
            setSelectedJobPosting={setSelectedJobPosting}
            setShowEditJobPostingModal={setShowEditJobPostingModal}
            setShowDeleteJobPostingConfirmationModal={setShowDeleteJobPostingConfirmationModal}
          />
        );
      })
    ) : (
      <Card>{NO_JOB_POSTINGS_MESSAGE}</Card>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>{MY_JOB_POSTINGS_TITLE}</Card.Header>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <Button variant="primary">Search</Button>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" />
            </InputGroup>
            <Card.Body>
              {areJobPostingsLoading ? (
                <Spinner animation="border" role="status" size={"lg"}></Spinner>
              ) : (
                generateJobPostings()
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {Object.keys(selectedJobPosting).length !== 0 && (
        <Container>
          <EditJobPostingModal
            jobPosting={selectedJobPosting}
            showEditJobPostingModal={showEditJobPostingModal}
            setShowEditJobPostingModal={setShowEditJobPostingModal}
          ></EditJobPostingModal>
          <DeleteJobPostingConfirmationModal
            jobPosting={selectedJobPosting}
            showDeleteJobPostingConfirmationModal={
              showDeleteJobPostingConfirmationModal
            }
            setShowDeleteJobPostingConfirmationModal={
              setShowDeleteJobPostingConfirmationModal
            }
          ></DeleteJobPostingConfirmationModal>
        </Container>
      )}
    </Container>
  );
};

EmployerConsole.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default EmployerConsole;
