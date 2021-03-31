import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteJobPostingConfirmationModal from "../jobPosting/DeleteJobPostingConfirmationModal";
import EditJobPostingModal from "../jobPosting/EditJobPostingModal";
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
  Header,
} from "semantic-ui-react";

//TODO refactor all of the crud functionality to update a centralized redux state, then create toast confirmational messages
const EmployerConsole = (props) => {
  const [showEditJobPostingModal, setShowEditJobPostingModal] = useState(false);
  const [
    showDeleteJobPostingConfirmationModal,
    setShowDeleteJobPostingConfirmationModal,
  ] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState({});

  const generateJobPostings = () => {
    return props.jobPostings.length > 0 ? (
      props.jobPostings.map((jobPosting) => {
        return (
          <JobPostingAccordion
            key={jobPosting.id}
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
      <Container fluid textAlign="center">
        <Header>{NO_JOB_POSTINGS_MESSAGE}</Header>
      </Container>
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
                  <Grid.Column width={3}>
                    <Container>
                      <Header as="h2" content={MY_JOB_POSTINGS_TITLE} />
                    </Container>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Search input={{ fluid: true }} fluid></Search>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content>{generateJobPostings()}</Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      {Object.keys(selectedJobPosting).length !== 0 && (
        <Grid>
          <EditJobPostingModal
            employerId={props.employer.employerId}
            jobPosting={selectedJobPosting}
            jobPostingFields={props.jobPostingFields}
            showEditJobPostingModal={showEditJobPostingModal}
            setShowEditJobPostingModal={setShowEditJobPostingModal}
          />
          <DeleteJobPostingConfirmationModal
            jobPosting={selectedJobPosting}
            showDeleteJobPostingConfirmationModal={
              showDeleteJobPostingConfirmationModal
            }
            setShowDeleteJobPostingConfirmationModal={
              setShowDeleteJobPostingConfirmationModal
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    jobPostings: state.employer.jobPostings,
    employer: state.employer,
  };
};

EmployerConsole.propTypes = {
  employer: PropTypes.object.isRequired,
  jobPostingFields: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(EmployerConsole);
