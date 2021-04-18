import { gql } from "@apollo/client";

export const ADD_JOB_POSTING_TO_CART_MUTATION = gql`
  mutation Mutation($jobPostingId: Int!) {
    addJobPostingToCart(jobPostingId: $jobPostingId) {
      jobCartEntry {
        jobId
      }
    }
  }
`;


export const REMOVE_JOB_POSTING_FROM_CART_MUTATION = gql`
  mutation Mutation($jobPostingId: Int!) {
    removeJobPostingFromCart(jobPostingId: $jobPostingId) {
      jobCartEntry {
        jobId
      }
    }
  }
`;