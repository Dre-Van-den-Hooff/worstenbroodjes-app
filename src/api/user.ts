import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        stats
      }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    create(username: $username, password: $password) {
      id
      username
      stats
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($id: ID!, $newName: String!) {
    updateName(id: $id, newName: $newName) {
      id
      username
      stats
    }
  }
`;
