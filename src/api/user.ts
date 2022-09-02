import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user
      token
    }
  }
`;

export const REGISTER = gql`
  mutation login($username: String!, $password: String!) {
    create(username: $username, password: $password) {
      id
      username
      stats
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation login($id: ID!, $newName: String!) {
    updateName(id: $id, newName: $newName) {
      id
      username
      stats
    }
  }
`;
