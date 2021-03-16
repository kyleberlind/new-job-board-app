import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Loader,
  Tab,
  Grid,
  Header,
  Segment,
  Button,
  Container,
  Modal,
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_APPLICATION_BY_REFERENCE_ID } from "../../../services/graphql/queries/EmployerQueries";
import { UPDATE_JOB_POSTING_APPLICATION_STATUS_MUTATION } from "../../../services/graphql/mutations/UpdateJobPostingApplicationStatusMutation";
import ApplicantOutreachModal from "./ApplicantOutreachModal";

const ApplicationView = (props) => {
  const employerReferenceId = props.match.params.employer_reference_id;

  const { loading, error, data } = useQuery(GET_APPLICATION_BY_REFERENCE_ID, {
    variables: {
      employerReferenceId: employerReferenceId,
    },
  });

  const [updateApplicationStatus, { mutationData }] = useMutation(
    UPDATE_JOB_POSTING_APPLICATION_STATUS_MUTATION
  );

  const [isRejectApplicantModalOpen, setIsRejectApplicantModalOpen] = useState(
    false
  );

  const [
    isApplicantOutReachModalOpen,
    setIsApplicantOutReachModalOpen,
  ] = useState(false);

  const handleRejectApplicant = () => {
    updateApplicationStatus({
      variables: {
        employerReferenceId: employerReferenceId,
        newStatus: "rejected",
      },
    });
    setIsRejectApplicantModalOpen(false);
  };

  const panes = [
    { menuItem: "Resume", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    {
      menuItem: "Parsed Applicant Info",
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  const getJobPostingHeader = () => {
    return (
      data.applicationsByEmployerReferenceId[0].jobPosting.role +
      (data.applicationsByEmployerReferenceId[0].jobPosting.team !== null
        ? " | "
        : "") +
      data.applicationsByEmployerReferenceId[0].jobPosting.team
    );
  };

  const formattedJobLocation = () => {
    return `${data.applicationsByEmployerReferenceId[0].jobPosting.location.city}, 
            ${data.applicationsByEmployerReferenceId[0].jobPosting.location.state}, 
            ${data.applicationsByEmployerReferenceId[0].jobPosting.location.zipCode}`;
  };

  const applicantInfo = () => {
    return (
      <Segment>
        {data.applicationsByEmployerReferenceId[0].applicantInfo.firstName !=
          null && (
          <Header as={"h2"}>
            {`${data.applicationsByEmployerReferenceId[0].applicantInfo.firstName} ${data.applicationsByEmployerReferenceId[0].applicantInfo.lastName}`}
          </Header>
          
        )}
        <Header as={"h3"}>
          {data.applicationsByEmployerReferenceId[0].applicantInfo.emailAddress}
        </Header>
        Application Date:
        {data.applicationsByEmployerReferenceId[0].dateApplied}
      </Segment>
    );
  };

  if (error) {
    return <Card>Error!</Card>;
  } else if (loading) {
    return <Loader active />;
  } else {
    return (
      <Container fluid>
        <Segment.Group horizontal>
          {applicantInfo()}
          <Segment>
            <Grid columns={2}>
              <Grid.Column>
                <Header as={"h2"}>{getJobPostingHeader()}</Header>
                <Header as={"h3"}>{formattedJobLocation()}</Header>
              </Grid.Column>
              <Grid.Column>
                <Container fluid textAlign="center">
                  <Button.Group attached="bottom">
                    <Button
                      compact
                      color="green"
                      onClick={() => {
                        setIsApplicantOutReachModalOpen(true);
                      }}
                    >
                      Email Applicant
                    </Button>
                    <Button.Or />
                    <Button
                      compact
                      color="red"
                      onClick={() => {
                        setIsRejectApplicantModalOpen(true);
                      }}
                    >
                      Reject Applicant
                    </Button>
                  </Button.Group>
                </Container>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
        <Tab panes={panes} />
        <Modal
          open={isRejectApplicantModalOpen}
          onOpen={() => {
            setIsRejectApplicantModalOpen(true);
          }}
          onClose={() => {
            setIsRejectApplicantModalOpen(false);
          }}
        >
          <Modal.Header>Reject Applicant?</Modal.Header>
          <Modal.Content>{applicantInfo()}</Modal.Content>
          <Modal.Actions>
            <Container textAlign="center">
              <Button.Group attached="bottom">
                <Button
                  positive
                  onClick={() => {
                    handleRejectApplicant();
                  }}
                >
                  Confirm
                </Button>
                <Button.Or />
                <Button
                  negative
                  onClick={() => {
                    setIsRejectApplicantModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            </Container>
          </Modal.Actions>
        </Modal>
        <ApplicantOutreachModal
          applicantEmailAddress={
            data.applicationsByEmployerReferenceId[0].applicantInfo.emailAddress
          }
          employerReferenceId={employerReferenceId}
          isApplicantOutReachModalOpen={isApplicantOutReachModalOpen}
          setIsApplicantOutReachModalOpen={setIsApplicantOutReachModalOpen}
        />
      </Container>
    );
  }
};

export default ApplicationView;
