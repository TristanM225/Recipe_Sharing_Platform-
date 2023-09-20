import { gql } from "@apollo/client";

// will execute the loginUser mutation set up using Apollo Server
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// will execute the addUser mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// will execute the saveRecipe mutation
// export const SAVE_RECIPE = gql`
//   mutation saveRecipe(
//     $recipeId: String!
//     $description: String!
//     $title: String!
//     $authors: [String]
//     $image: String
//     $link: String
//   ) {
//     saveRecipe(
//       recipeId: $recipeId
//       description: $description
//       title: $title
//       author: $author
//       image: $image
//       link: $link
//     ) {
//       _id
//       username
//       email
//       recipeCount
//       savedRecipes {
//         recipeId
//         title
//         description
//         authors
//         image
//         link
//       }
//     }
//   }
// `;

export const ADD_RECIPE = gql`
    mutation addRecipe($recipeId: String!, $title: String!, $ingredients: [IngredientInput!], $analyzedInstructions: String, $servings: Int, $readyInMinutes: Int, $image: String, $sourceLink: String) {
      addRecipe(recipeId: $recipeId, title: $title, ingredients: $ingredients, analyzedInstructions: $analyzedInstructions, servings: $servings, readyInMinutes: $readyInMinutes, image: $image, sourceLink: $sourceLink) {
            _id
            username
            email
            recipeCount
            savedRecipes {
              recipeId
              title
              ingredients
              analyzedInstructions
              servings
              readyInMinutes
              image
              sourceLink
            }
        }
    }
`;
export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeToSave: SavedRecipeInput) {
    saveRecipe(recipeToSave: $recipeToSave) {
      username
      email
      recipeCount
      savedRecipes {
        recipeId
        title
        ingredients
        analyzedInstructions
        servings
        readyInMinutes
        image
        sourceLink
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $sharedRecipe: String!) {
    addPost(postText: $postText, sharedRecipe: $sharedRecipe) {
      _id
      postText
      postAuthor
      sharedRecipe
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      sharedRecipe
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

// will execute the removeRecipe mutation
export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: String!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      username
      email
      recipeCount
      savedRecipes {
        recipeId
        title
        ingredients
        analyzedInstructions
        servings
        readyInMinutes
        image
        sourceLink
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
        _id
        postText
        postAuthor
        sharedRecipe
        createdAt
        comments {
            _id
            commentText
        }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
        _id
        postText
        postAuthor
        sharedRecipe
        createdAt
        comments {
            _id
            commentText
            createdAt
        }
    }
  }
`;
