import React, { useEffect, useState } from "react";
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
  Item,
} from "semantic-ui-react";

const JobPostingAccordion = (props) => {
  const [areApplicantsLoading, setAreApplicantsLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setAreApplicantsLoading(true);
    loadJobApplicantsService(props.jobPosting.id)
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
    let index = 0;
    return jobApplications.length > 0 ? (
      jobApplications.map((jobApplication) => {
        index += 1;
        return (
          <Item
            key={jobApplication.applicationId}
            onClick={() => {
              window.location.href = `/employer/application/${jobApplication.employerReferenceId}`;
            }}
          >
            <Item.Content>
              {jobApplication.applicantInfo.firstName ? (
                <Item.Header>
                  {`${index}. ${jobApplication.applicantInfo.firstName} ${jobApplication.applicantInfo.lastName}`}
                </Item.Header>
              ) : (
                <Item.Header>{index}. Anon</Item.Header>
              )}
              <Item.Description>
                {jobApplication.applicantInfo.emailAddress}
              </Item.Description>
            </Item.Content>
            <Item.Meta>{jobApplication.dateApplied}</Item.Meta>
          </Item>
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
      props.jobPosting.role +
      (props.jobPosting.team !== null ? " | " : "") +
      props.jobPosting.team
    );
  };

  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClickAccordionTitle}
      >
        <Icon name="dropdown" />
        <Container fluid textAlign="left">
          <Header as="h3">{getJobPostingHeader()}</Header>
          <p>{formattedJobLocation}</p>
        </Container>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Grid columns={2} celled="internally">
          <Grid.Column>
            <Container>
              <Grid columns={2}>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column>
                    <Header as="h3">Details</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <Button
                            basic
                            fluid
                            color="blue"
                            size="small"
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
                            basic
                            fluid
                            color="red"
                            size="small"
                            onClick={() => {
                              props.setSelectedJobPosting(props.jobPosting);
                              props.setShowDeleteJobPostingConfirmationModal(
                                true
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <Card fluid>
              <Card.Content>ID: {props.jobPosting.id}</Card.Content>
              <Card.Content textAlign="left">
                {props.jobPosting.description}
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Container>
              <Header as="h3">Applicants</Header>
              {areApplicantsLoading ? (
                <Loader active />
              ) : (
                <Item.Group divided link>
                  {generateJobApplications()}
                </Item.Group>
              )}
            </Container>
          </Grid.Column>
        </Grid>
      </Accordion.Content>
    </Accordion>
  );
};

export default JobPostingAccordion;
