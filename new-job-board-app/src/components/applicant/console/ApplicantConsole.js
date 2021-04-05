import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import {
  Segment,
  Input,
  Message,
  Loader,
  Item,
  Grid,
  Header,
  Divider,
  Button,
  Container,
  Icon,
  Pagination,
} from "semantic-ui-react";
import { GET_JOB_POSTINGS } from "../../../services/graphql/queries/ApplicantQueries";

const ApplicantConsole = (props) => {
  const { loading, error, data } = useQuery(GET_JOB_POSTINGS);
  const [selectedJobPosting, setSelectedJobPosting] = useState({});
  useEffect(() => {
    props.loadJobPostings(data);
  }, [data]);

  if (loading) {
    return <Loader active></Loader>;
  } else if (error) {
    return <Message content="Error loading your information!" negative />;
  } else {
    const getJobPostingHeader = (jobPosting) => {
      return (
        jobPosting.role +
        (jobPosting.team !== null ? " | " + jobPosting.team : "")
      );
    };

    const formattedJobLocation = (jobPosting) =>
      `${jobPosting.location?.city}, ${jobPosting.location?.state}, ${jobPosting.location?.zipCode}`;

    const generatJobPostingList = () => {
      console.log(selectedJobPosting);
      return data.jobPostings.map((jobPosting) => {
        return (
          <Item
            key={jobPosting.id}
            onClick={() => {
              setSelectedJobPosting(jobPosting);
            }}
          >
            <Item.Content>
              <Item.Header>{getJobPostingHeader(jobPosting)}</Item.Header>
              <Item.Meta>
                {jobPosting.employer.employerName} |{" "}
                {formattedJobLocation(jobPosting)}
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      });
    };

    return (
      <Container fluid>
        <Segment>
          <Grid>
            <Grid.Column width={7}>
              <Input
                fluid
                labelPosition="left"
                label="What"
                placeholder="Search for Jobs"
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Input
                fluid
                labelPosition="left"
                label="Where"
                placeholder="Search for Job Locations"
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button fluid>
                <Icon name="search"></Icon>
                Search
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Item.Group
                style={{ overflow: "auto", maxHeight: "80vh" }}
                link
                divided
              >
                {generatJobPostingList()}
                <Container textAlign="center">
                  <Pagination defaultActivePage={5} totalPages={5} />
                </Container>
              </Item.Group>
            </Grid.Column>
            <Grid.Column>
              {Object.keys(selectedJobPosting).length > 0 ? (
                <Item>
                  <Item.Content>
                    <Item.Header>
                      {getJobPostingHeader(selectedJobPosting)}
                    </Item.Header>
                    <Item.Meta>
                      {selectedJobPosting.employer.employerName} |{" "}
                      {formattedJobLocation(selectedJobPosting)} | Type
                    </Item.Meta>
                    <Item.Meta>
                      <Button compact basic primary>
                        Apply
                      </Button>
                      <Button compact basic secondary>
                        <Icon name="cart plus" />
                        Add to Cart
                      </Button>
                    </Item.Meta>
                    <Divider />
                    <Item.Description>
                      {selectedJobPosting.description}
                    </Item.Description>
                  </Item.Content>
                </Item>
              ) : (
                <Header textAlign="center">Select a Job</Header>
              )}
            </Grid.Column>
          </Grid>
          <Divider vertical>
            <Icon name="chevron right" />
          </Divider>
        </Segment>
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadJobPostings: (jobPostings) =>
      dispatch({ type: "LOAD_JOB_POSTINGS", payload: jobPostings }),
  };
};

const mapStateToProps = (state) => {
  return {
    jobPostings: state.jobPostings,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantConsole);
