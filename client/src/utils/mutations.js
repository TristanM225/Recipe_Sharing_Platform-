import { gql } from '@apollo/client';

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
export const SAVE_RECIPE = gql`
    mutation saveRecipe($recipeId: String!, $description: String!, $title: String! $authors: [String], $image: String, $link: String) {
        saveRecipe(recipeId: $recipeId, description: $description, title: $title author: $author, image: $image, link: $link) {
            _id
            username
            email
            recipeCount
            savedRecipes {
                recipeId
                title
                description
                authors
                image
                link
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
                description
                author
                image
                link
            }
        }
    }
`;