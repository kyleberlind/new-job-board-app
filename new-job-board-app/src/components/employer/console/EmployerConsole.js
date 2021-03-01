import React, { useState, useEffect } from "react";
import DeleteJobPostingConfirmationModal from "../jobPosting/DeleteJobPostingConfirmationModal";
import PropTypes from "prop-types";
import EditJobPostingModal from "../jobPosting/EditJobPostingModal";
import { loadJobPostingsByEmployerIdService } from "../../../services/employer/EmployerServices";
import JobPostingAccordion from "../jobPosting/JobPostingAccordion";
import {
  NO_JOB_POSTINGS_MESSAGE,
  MY_JOB_POSTINGS_TITLE,
} from "../constants/EmployerConstants";
import {
  Search,
  Grid,
  Card,
  Container,
  Loader,
  Header,
} from "semantic-ui-react";

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
            setShowDeleteJobPostingConfirmationModal={
              setShowDeleteJobPostingConfirmationModal
            }
          />
        );
      })
    ) : (
      <Card>{NO_JOB_POSTINGS_MESSAGE}</Card>
    );
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header as="h2" content={MY_JOB_POSTINGS_TITLE} />
                  </Grid.Column>
                  <Grid.Column>
                    <Search fluid></Search>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content>
              {areJobPostingsLoading ? (
                <Loader active />
              ) : (
                generateJobPostings()
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      {Object.keys(selectedJobPosting).length !== 0 && (
        <Grid>
          <EditJobPostingModal
            jobPosting={selectedJobPosting}
            jobPostingFields={props.jobPostingFields}
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
        </Grid>
      )}
    </Grid>
  );
};

EmployerConsole.propTypes = {
  employer: PropTypes.object.isRequired,
  jobPostingFields: PropTypes.array.isRequired,
};

export default EmployerConsole;
