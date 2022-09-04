import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetALlUsers {
    getAllUsers {
      id
      username
      stats {
        totalSpent
        lastPurchase
        worstenbroodjes
        pizzas
        muffins
        paninis
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        stats {
          totalSpent
          lastPurchase
          worstenbroodjes
          pizzas
          muffins
          paninis
        }
      }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($id: ID!, $newName: String!) {
    updateName(id: $id, newName: $newName) {
      id
      username
      stats {
        totalSpent
        lastPurchase
        worstenbroodjes
        pizzas
        muffins
        paninis
      }
    }
  }
`;

export const UPDATE_STATS = gql`
  mutation UpdateUserStats($id: ID!, $stats: StatsInput!) {
    updateStats(id: $id, stats: $stats) {
      id
      username
      stats {
        totalSpent
        lastPurchase
        worstenbroodjes
        pizzas
        muffins
        paninis
      }
    }
  }
`;
