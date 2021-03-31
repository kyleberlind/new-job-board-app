import { gql } from "@apollo/client";

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation Mutation($userId: Int!, $currentPassword: String!, $newPassword: String!) {
    updatePassword(userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword) {
        user {
            id
        }
    }
  }
`;
