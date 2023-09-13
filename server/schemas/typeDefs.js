
const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        recipeCount: Int
        savedRecipes: [Recipe]
        posts: [Post]!
    }

    type Recipe {
        recipeId: Int!
        title: String!
        ingredients: [Ingredient]!
        analyzedInstructions: [String]
        servings: Int
        readyInMinutes: Int
        image: String
        sourceLink: String
    }

    type Ingredient {
        ingredientId: Int!
        name: String!
        aisle: String!
        amount: Float!
        consistency: String
        unit: String
        meta: [String]
    }

    input IngredientInput {
        ingredientId: Int!
        name: String!
        aisle: String!
        amount: Float!
        consistency: String
        unit: String
        meta: [String]
    }

    type Post {
        _id: ID!
        postText: String
        postAuthor: String
        sharedRecipe: Recipe
        createdAt: String
        comments: [Comment]!
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    input SavedRecipeInput {
        recipeId: Int!
        title: String!
        ingredients: [IngredientInput]
        analyzedInstructions: [String]
        servings: Int
        readyInMinutes: Int
        image: String
        sourceLink: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(postId: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveRecipe(recipeToSave: SavedRecipeInput): User
        removeRecipe(recipeId: Int!): User
        addPost(postText: String!, sharedRecipe: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
    }
`;

module.exports = typeDefs;
