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
  Divider,
  Modal,
} from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_APPLICATION_BY_REFERENCE_ID } from "../../services/graphql/employer/EmployerQueries";

const ApplicationView = (props) => {
  const { loading, error, data } = useQuery(GET_APPLICATION_BY_REFERENCE_ID, {
    variables: {
      employerReferenceId: props.match.params.employer_reference_id,
    },
  });

  const [isRejectApplicantModalOpen, setIsRejectApplicantModalOpen] = useState(
    false
  );

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
              <Grid.Column width={3}>
                <Button.Group>
                  <Button
                    fluid
                    compact
                    color="red"
                    onClick={() => {
                      setIsRejectApplicantModalOpen(true);
                    }}
                  >
                    Reject Applicant
                  </Button>
                  <Button.Or />
                  <Button fluid compact color="green">
                    Reach Out
                  </Button>
                </Button.Group>
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
          <Modal.Content>
            {applicantInfo()}
            <Modal.Actions>
              <Container textAlign="center">
                <Button.Group attached="bottom">
                  <Button
                    
                    onClick={() => {
                      setIsRejectApplicantModalOpen(true);
                    }}
                  >
                    Confirm
                  </Button>
                  <Button.Or />
                  <Button
                    
                    onClick={() => {
                      setIsRejectApplicantModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Button.Group>
              </Container>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </Container>
    );
  }
};

ApplicationView.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default ApplicationView;
