import React, { useEffect, useState } from "react";
import JobPostingCard from "./JobPostingCard";
import { loadJobApplicantsService } from "../../../services/employer/EmployerServices";
import {
  Accordion,
  Loader,
  Card,
  Container,
  Grid,
  Button,
  Icon,
  Header,
  Search,
} from "semantic-ui-react";

const JobPostingAccordion = (props) => {
  const [areApplicantsLoading, setAreApplicantsLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setAreApplicantsLoading(true);
    loadJobApplicantsService(props.jobPosting.generalInfo.id)
      .then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            console.log(data["errorMessage"]);
          } else {
            if (data["applications"].length > 0) {
              setJobApplications(data["applications"]);
            }
          }
          setAreApplicantsLoading(false);
        });
      })
      .catch((error) => {
        setAreApplicantsLoading(false);
        console.log(error);
      });
  }, []);

  const generateJobApplications = () => {
    return jobApplications.length > 0 ? (
      jobApplications.map((jobApplication) => {
        return (
          <Card
            fluid
            key={jobApplication.applicationId}
            header={jobApplication.applicantInfo.emailAddress}
            href={`/employer/application/${jobApplication.employerReferenceId}`}
          ></Card>
        );
      })
    ) : (
      <Container fluid textAlign="center">
        <Header as={"h3"}>There are no applicants for this job yet.</Header>
      </Container>
    );
  };

  const handleClickAccordionTitle = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;
  const getJobPostingHeader = () => {
    return (
      props.jobPosting.generalInfo.role +
      (props.jobPosting.generalInfo.team !== null ? " | " : "") +
      props.jobPosting.generalInfo.team
    );
  };

  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClickAccordionTitle}
      >
        <Grid.Row>
          <Grid.Column>
            <Icon name="dropdown" />
          </Grid.Column>
          <Grid.Column>
            <Container fluid textAlign="left">
              <Header as="h3">{getJobPostingHeader()}</Header>
              <p>{formattedJobLocation}</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Grid columns={2} celled="internally">
          <Grid.Column>
            <Header as="h3">Details</Header>
            <Card fluid>
              <Card.Content>ID: {props.jobPosting.generalInfo.id}</Card.Content>
              <Card.Content textAlign="left">
                {props.jobPosting.generalInfo.description}
              </Card.Content>
              <Card.Content textAlign="center">
                <Grid columns={2}>
                  <Grid.Column>
                    <Button
                      primary
                      onClick={() => {
                        props.setSelectedJobPosting(props.jobPosting);
                        props.setShowEditJobPostingModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      color="grey"
                      onClick={() => {
                        props.setSelectedJobPosting(props.jobPosting);
                        props.setShowDeleteJobPostingConfirmationModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Applicants</Header>
            <Card.Group fluid>
              {areApplicantsLoading ? (
                <Loader active />
              ) : (
                generateJobApplications()
              )}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Accordion.Content>
    </Accordion>
  );
};

export default JobPostingAccordion;
