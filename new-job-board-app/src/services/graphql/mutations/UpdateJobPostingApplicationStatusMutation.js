import { gql } from "@apollo/client";

export const UPDATE_JOB_POSTING_APPLICATION_STATUS_MUTATION = gql`
  mutation Mutation($employerReferenceId: String!, $newStatus: String!) {
    updateApplicationStatus(
      employerReferenceId: $employerReferenceId
      newStatus: $newStatus
    ) {
      jobPostingApplication {
        status
      }
    }
  }
`;
