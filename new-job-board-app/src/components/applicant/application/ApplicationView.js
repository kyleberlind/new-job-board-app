import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Message,
  Loader,
  Item,
  Segment,
  Form,
  Button,
  Divider,
  Header,
  Dropdown,
} from "semantic-ui-react";
import { GET_JOB_POSTING_BY_ID } from "../../../services/graphql/queries/ApplicantQueries";
import JobPostingField from "./JobPostingField";
import EducationFormGroup from "./EducationFormGroup";

const ApplicationView = (props) => {
  const [numEducations, setNumEducations] = useState(1);
  const jobId = props.match.params.jobId;
  const { loading, error, data } = useQuery(GET_JOB_POSTING_BY_ID, {
    variables: {
      jobPostingId: jobId,
    },
  });

  if (error) {
    return (
      <Message content="Error loading Job Application Information!" negative />
    );
  } else if (loading) {
    return <Loader active></Loader>;
  } else {
    const jobPosting = data.jobPostingById;

    const getJobPostingHeader = () => {
      return (
        jobPosting.role +
        (jobPosting.team !== null ? " | " + jobPosting.team : "")
      );
    };

    const formattedJobLocation = () => {
      return `${jobPosting.location.city}, 
                ${jobPosting.location.state}`;
    };

    const generateJobPostingFieldQuestions = () => {
      return jobPosting.fields.map((edge) => {
        return (
          <JobPostingField required={!!edge.required} field={edge.field} />
        );
      });
    };

    const generateEducationForm = () => {
      let educationForms = [];
      for (let i = 0; i < numEducations; i++) {
        educationForms.push(<EducationFormGroup key={i} index={i}/>);
      }
      return educationForms;
    };

    return (
      <Container>
        <Segment>
          <Item>
            <Button primary floated="right">
              Apply
            </Button>
            <Item.Header>{getJobPostingHeader()}</Item.Header>
            <Item.Meta>{jobPosting.employer.employerName}</Item.Meta>
            <Item.Meta>{formattedJobLocation()}</Item.Meta>
          </Item>
        </Segment>
        <Segment> {jobPosting.description}</Segment>
        <Segment>
          <Form>
            <Header>Personal Information</Header>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="First Name"
                placeholder="First Name"
              />
              <Form.Input required label="Last Name" placeholder="Last Name" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="Email Address"
                placeholder="Email Address"
              />
              <Form.Input
                required
                label="Phone Number"
                placeholder="Phone Number"
              />
            </Form.Group>
            <Button>Resume</Button>
            <Divider />
            <Header>Education</Header>
            {generateEducationForm()}
            <Button
              onClick={() => {
                setNumEducations(numEducations + 1);
              }}
            >
              Add Another Education
            </Button>
            <Divider />
            {jobPosting.fields.length > 0 ? (
              <Segment>
                <Header>{jobPosting.employer.employerName} Questions</Header>
                {generateJobPostingFieldQuestions()}
              </Segment>
            ) : null}
            <Button primary fluid type="submit">
              Apply
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
};

export default ApplicationView;
