import React from "react";
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

const ApplicationView = (props) => {
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
      return jobPosting.fields.map((field) => {
        return <JobPostingField />;
      });
    };

    const degreeOptions = [
      { key: "BA", text: "BA" },
      { key: "BS", text: "BS" },
    ];

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
              <Form.Field>
                <label>First Name</label>
                <input placeholder="First Name" />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder="Last Name" />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Email Address</label>
                <input placeholder="Email Address" />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input placeholder="Phone Number" />
              </Form.Field>
            </Form.Group>
            <Button>Resume</Button>
            <Divider />
            <Header>Education</Header>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="School"
                placeholder="Select a School"
              />
              <Form.Dropdown
                options={degreeOptions}
                label="Degree"
                placeholder="Select a Degree"
                search
                selection
              />
              <Form.Input
                label="Discipline"
                placeholder="Select a Discipline"
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width="2">
                <label>Start Date</label>
                <input placeholder="Start Date" />
              </Form.Field>
              <Form.Field width="2">
                <label>End Date</label>
                <input placeholder="End Date" />
              </Form.Field>
            </Form.Group>
            <Button>Add Another Education</Button>
            <Divider />
            {jobPosting.fields.length > 0 ? (
              <Container>
                <Header>{jobPosting.employer.employerName} Questions</Header>
                <Form.Group>{generateJobPostingFieldQuestions()}</Form.Group>
              </Container>
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
