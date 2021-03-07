import React from "react";
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
} from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_APPLICATION_BY_REFERENCE_ID } from "../../services/graphql/employer/EmployerQueries";

const ApplicationView = (props) => {
  const { loading, error, data } = useQuery(GET_APPLICATION_BY_REFERENCE_ID, {
    variables: {
      employerReferenceId: props.match.params.employer_reference_id,
    },
  });

  const panes = [
    { menuItem: "Resume", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    {
      menuItem: "Parsed Applicant Info",
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  const getJobPostingHeader = () => {
    return (
      data.applicationsByEmployerReferenceId[0].jobPosting.generalInfo.role +
      (data.applicationsByEmployerReferenceId[0].jobPosting.generalInfo.team !==
      null
        ? " | "
        : "") +
      data.applicationsByEmployerReferenceId[0].jobPosting.generalInfo.team
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
          <Segment>
            {data.applicationsByEmployerReferenceId[0].applicantInfo
              .firstName != null && (
              <Header as={"h2"}>
                {`${data.applicationsByEmployerReferenceId[0].applicantInfo.firstName} ${data.applicationsByEmployerReferenceId[0].applicantInfo.lastName}`}
              </Header>
            )}
            <Header as={"h3"}>
              {
                data.applicationsByEmployerReferenceId[0].applicantInfo
                  .emailAddress
              }
            </Header>
            Application Date:
            {data.applicationsByEmployerReferenceId[0].dateApplied}
          </Segment>
          <Segment>
            <Grid columns={2}>
              <Grid.Column>
                <Header as={"h2"}>Role | Team</Header>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button.Group>
                  <Button compact color="red">
                    Reject Applicant
                  </Button>
                  <Button.Or />
                  <Button compact color="green">
                    Reach Out
                  </Button>
                </Button.Group>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>

        <Tab panes={panes} />
      </Container>
    );
  }
};

ApplicationView.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default ApplicationView;
