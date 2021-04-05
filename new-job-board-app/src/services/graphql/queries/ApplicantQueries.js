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
  query Query {
    jobPostings {
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
