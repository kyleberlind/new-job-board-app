import React, { useState, useEffect } from "react";
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
import { loadJobApplicantionByEmployerReferenceId } from "../../services/employer/EmployerServices";

const ApplicationView = (props) => {
  const [jobApplication, setJobApplications] = useState({});
  const [isApplicationLoading, setIsApplicationLoading] = useState(true);

  useEffect(() => {
    setIsApplicationLoading(true);
    loadJobApplicantionByEmployerReferenceId(
      props.match.params.employer_reference_id
    )
      .then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            console.log(data["errorMessage"]);
          } else {
            setJobApplications(data);
          }
          setIsApplicationLoading(false);
        });
      })
      .catch((error) => {
        setIsApplicationLoading(false);
        console.log(error);
      });
  }, []);

  const panes = [
    { menuItem: "Resume", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    {
      menuItem: "Parsed Applicant Info",
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  return (
    <Card fluid>
      {isApplicationLoading ? (
        <Loader active />
      ) : (
        <Container fluid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as={"h2"}>
                  {`${jobApplication.applicantInfo.firstName} ${jobApplication.applicantInfo.lastName}`}
                </Header>
                <Header as={"h3"}>
                  {jobApplication.applicantInfo.emailAddress}{" "}
                </Header>
                <Segment vertical>
                  Application Date: {jobApplication.dateApplied}
                </Segment>
                <Segment vertical>
                  Application ID: {jobApplication.applicationId}
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
      )}
    </Card>
  );
};

ApplicationView.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default ApplicationView;
