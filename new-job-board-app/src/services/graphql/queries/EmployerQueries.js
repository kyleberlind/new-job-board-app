import { gql } from "@apollo/client";

export const GET_APPLICATION_BY_REFERENCE_ID = gql`
  query Query($employerReferenceId: String!) {
    applicationsByEmployerReferenceId(
      employerReferenceId: $employerReferenceId
    ) {
      id
      jobId
      applicantId
      dateApplied
      employerId
      employerReferenceId
      status
      applicantInfo {
        emailAddress
        firstName
        lastName
      }
      jobPosting {
        id
        role
        description
        team
        location {
          city
          state
          zipCode
        }
      }
    }
  }
`;

export const GET_EMPLOYER = gql`
  query Query {
    employer {
      employerId
      userId
      employerName
      employerSize
      signUpDate
      userInfo {
        emailAddress
      }
      jobPostings {
        id
        role
        description
        team
        location {
          city
          state
          zipCode
        }
        fields {
          field {
            id
            title
            value
            type
            dateCreated
            description
          }
        }
      }
    }
  }
`;
