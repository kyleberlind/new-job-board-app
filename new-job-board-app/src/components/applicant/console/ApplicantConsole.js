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
  Dropdown,
  Label,
} from "semantic-ui-react";
import { GET_JOB_POSTINGS } from "../../../services/graphql/queries/ApplicantQueries";
import JobLocationSearchDropdown from "./JobLocationSearchDropdown";

const ApplicantConsole = (props) => {
  const [whatSearchFilter, setWhatSearchFilter] = useState("");
  const [currentWhatSearchFilter, setCurrentWhatSearchFilter] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentSelectedLocations, setCurrentSelectedLocations] = useState([]);
  const [selectedJobPosting, setSelectedJobPosting] = useState({});

  //initial load pulls top 15 results
  const { loading, error, data } = useQuery(GET_JOB_POSTINGS, {
    variables: {
      whatSearchFilter: whatSearchFilter,
      locationFilters: selectedLocations,
    },
  });

  useEffect(() => {
    props.loadJobPostings(data);
  }, [data]);

  const handleSearch = () => {
    setWhatSearchFilter(currentWhatSearchFilter);
    setSelectedLocations(currentSelectedLocations);
  };

  if (error) {
    return <Message content="Error loading your information!" negative />;
  } else if (loading) {
    //TODO figure out how to make the location options load async at same time as job postings without breaking
    return <Loader active></Loader>;
  } else {
    const getJobPostingHeader = (jobPosting) => {
      return (
        jobPosting.role +
        (jobPosting.team !== null ? " | " + jobPosting.team : "")
      );
    };

    const formattedJobLocation = (jobPosting) =>
      `${jobPosting.location?.city}, ${jobPosting.location?.state}`;

    const generatJobPostingList = () => {
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

    const removeSelectedLocation = (targetLocation) => {
      let currentLocations = [...currentSelectedLocations];
      currentLocations = currentLocations.filter((location) => {
        return location !== targetLocation;
      });
      setCurrentSelectedLocations(currentLocations);
    };

    const getJobPostingLocationFilters = () => {
      return currentSelectedLocations.map((location) => {
        return (
          <Label key={location}>
            {location}
            <Icon
              name="delete"
              link
              onClick={() => {
                removeSelectedLocation(location);
              }}
            />
          </Label>
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
                value={currentWhatSearchFilter}
                onChange={(event) => {
                  setCurrentWhatSearchFilter(event.target.value);
                }}
                placeholder="Search for Jobs"
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <JobLocationSearchDropdown
                setSelectedLocations={setCurrentSelectedLocations}
                selectedLocations={currentSelectedLocations}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button fluid onClick={handleSearch}>
                <Icon name="search"></Icon>
                Search
              </Button>
            </Grid.Column>
          </Grid>
          {getJobPostingLocationFilters()}
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
