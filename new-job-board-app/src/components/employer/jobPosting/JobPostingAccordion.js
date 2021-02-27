import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import JobPostingCard from "./JobPostingCard";
import { loadJobApplicantsService } from "../../../services/employer/EmployerServices";
import { Loader, Card, Grid, Button } from "semantic-ui-react";

const JobPostingAccordion = (props) => {
  const [areApplicantsLoading, setAreApplicantsLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);

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
          <Card.Content>
            {jobApplication.applicantInfo.emailAddress}
          </Card.Content>
        );
      })
    ) : (
      <Card>There are no applicants for this job yet.</Card>
    );
  };

  return (
    <Accordion>
      <Card fluid>
        <Accordion.Toggle as={Button} variant="light" eventKey="0">
          <JobPostingCard jobPosting={props.jobPosting} />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Grid columns={2}>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  ID: {props.jobPosting.generalInfo.id}
                </Card.Content>
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
              <Card fluid>
                <Card.Content header="Applicants"></Card.Content>
                {areApplicantsLoading ? (
                  <Loader active />
                ) : (
                  generateJobApplications()
                )}
              </Card>
            </Grid.Column>
          </Grid>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default JobPostingAccordion;
