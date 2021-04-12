import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query {
    user {
      firstName
      lastName
      emailAddress
      signUpDate
      applications {
        status
        jobPosting {
          role
          team
          location {
            city
            state
            zipCode
          }
        }
      }
    }
  }
`;

export const GET_JOB_POSTINGS = gql`
  query Query($whatSearchFilter: String!, $locationFilters: [String!]) {
    jobPostings(
      whatSearchFilter: $whatSearchFilter,
      locationFilters: $locationFilters
    ) {
      id
      role
      team
      description
      employer {
        employerName
      }
      fields {
        field {
          title
          type
          value
        }
      }
      location {
        city
        state
        zipCode
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query Query($filter: String!) {
    locations(filter: $filter) {
      id
      city
      stateId
    }
  }
`;
