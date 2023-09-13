import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipeCount
      savedRecipes {
        recipeId
        title
        description
        author
        image
        link
      }
      posts {
        _id
        postText
        postAuthor
        sharedRecipe
        createdAt
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postText
        sharedRecipe
        createdAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query posts {
    posts {
      _id
      postText
      postAuthor
      sharedRecipe
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
        _id
        postText
        postAuthor
        sharedRecipe
        createdAt
        comments {
            _id
            commentText
            commentAuthor
            createdAt
        }
    }
  }
`;
