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
