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

// will execute the saveBook mutation
export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $description: String!, $title: String! $authors: [String], $image: String, $link: String) {
        saveBook(bookId: $bookId, description: $description, title: $title authors: $authors, image: $image, link: $link) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;

// will execute the removeBook mutation
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;