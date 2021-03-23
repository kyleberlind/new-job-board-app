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
