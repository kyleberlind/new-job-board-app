import { gql } from "@apollo/client";

export const UPDATE_EMPLOYER_SIZE_MUTATION = gql`
  mutation Mutation($employerId: Int!, $newSize: String!) {
    updateEmployerSize(employerId: $employerId, newSize: $newSize) {
      employer {
        employerSize
      }
    }
  }
`;

export const ADD_JOB_POSTING_MUTATION = gql`
  mutation Mutation($jobPostingInput: JobPostingInput!) {
    addJobPosting(jobPostingInput: $jobPostingInput) {
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
        fields {
          fieldId
          required
        }
      }
    }
  }
`;
