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

  if (error) {
    return <Card>Error!</Card>;
  } else if (loading) {
    return <Loader active />;
  } else {
    return (
      <Container fluid>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header as={"h2"}>
                {`${data.applicationsByEmployerReferenceId[0].applicantInfo.firstName} ${data.applicationsByEmployerReferenceId[0].applicantInfo.lastName}`}
              </Header>
              <Header as={"h3"}>
                {
                  data.applicationsByEmployerReferenceId[0].applicantInfo
                    .emailAddress
                }
              </Header>
              <Segment vertical>
                Application Date:{" "}
                {data.applicationsByEmployerReferenceId[0].dateApplied}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Container fluid textAlign="center">
                <Button.Group>
                  <Button color="red">Reject Applicant</Button>
                  <Button.Or />
                  <Button color="green">Reach Out</Button>
                </Button.Group>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Tab panes={panes} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
};

ApplicationView.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default ApplicationView;
