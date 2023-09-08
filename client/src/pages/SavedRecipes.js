import React from "react";
import {
  Container,
  Card,
  Button,
  Row
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_RECIPE } from "../utils/mutations";
import { removeRecipeId } from "../utils/localStorage";
import Auth from "../utils/auth";

const SavedRecipes = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);

  const userData = data?.me || {};

  const handleDeleteRecipe = async (recipeId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeRecipe({
        variables: { recipeId },
      });
      removeRecipeId(recipeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {userData.username}'s recipes!</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {userData.savedRecipes?.length
            ? `Viewing ${userData.savedRecipes.length} saved ${
                userData.savedRecipes.length === 1 ? "recipe" : "recipes"
              }:`
            : "You have no saved recipes!"}
        </h2>
        <Row>
          {userData.savedRecipes?.map((recipe) => {
            return (
              <Card key={recipe.recipeId} border="dark">
                {recipe.image ? (
                  <Card.Img
                    src={recipe.image}
                    alt={`The cover for ${recipe.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <p className="small">Author: {recipe.author}</p>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteRecipe(recipe.recipeId)}
                  >
                    Delete this Recipe!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedRecipes;
