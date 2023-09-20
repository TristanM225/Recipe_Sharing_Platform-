import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { getRecipeDetails } from "../utils/API";
import { saveRecipeIds, getSavedRecipeIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_RECIPE } from "../utils/mutations";
import { GET_ME } from '../utils/queries';
import { apiKey } from "../utils/apiKey";

const RecipeDetails = () => {
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientsDetails, setIngredientsDetails] = useState([]);

  const { recipeId } = useParams();

  const handleRecipeData = async () => {
    try {
      const response = await getRecipeDetails(recipeId);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      console.log("Response Data:", data);
      const results = data.extendedIngredients;
      console.log(results);

      const recipeData = {
        recipeId: data.id,
        title: data.title,
        servings: data.servings,
        readyInMinutes: data.readyInMinutes,
        instructions: data.instructions,
        image: data.image,
        sourceLink: data.sourceUrl,
      };

      const ingredientsData = results.map((ingredient) => ({
        ingredientId: ingredient.id,
        name: ingredient.name,
        aisle: ingredient.aisle,
        amount: ingredient.amount,
        consistency: ingredient.consistency,
        unit: ingredient.unit,
      }));

      console.log(recipeData);
      console.log(ingredientsData);

      setRecipeDetails(recipeData);
      setIngredientsDetails(ingredientsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  useEffect(() => {
    handleRecipeData();
  }, []);

  const handleSaveRecipe = async (recipeId) => {
    const recipeToSave = recipeId;
    console.log(recipeToSave);
    console.log(savedRecipeIds);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveRecipe({
        variables: recipeToSave,
        // this code may not be necessary
        // update: cache => {
        //   const { me } = cache.readQuery({ query: GET_ME });
        //   cache.writeQuery({ query: GET_ME, data: { me: { ...me, savedRecipes: [...me.savedRecipes, recipeToSave] } } });
        // }
      });
      setSavedRecipeIds([...savedRecipeIds, recipeToSave]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="background center-text">
        <Col md="4" key={recipeDetails.recipeId}>
          <div border="dark">
            {recipeDetails.image ? (
              <img
                src={recipeDetails.image}
                alt={`${recipeDetails.title}`}
                variant="top"
              />
            ) : null}
            <div>
              <h1 className="title">{recipeDetails.title}</h1>
              <div>
                <h3>Ingredients Needed:</h3>
                <ul className="center-text">
                  {ingredientsDetails.map((ingredient) => {
                    return (
                      <Col md="4" key={ingredient.ingredientId}>
                        <li>{ingredient.name}</li>
                      </Col>
                    );
                  })}
                </ul>
              </div>
              <p className="small center-text">Servings: {recipeDetails.servings}</p>
              <p>Time to Make: {recipeDetails.readyInMinutes} Minutes</p>

              <p dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}></p>
              {Auth.loggedIn() && (
                <Button
                  disabled={savedRecipeIds?.some(
                    (savedRecipeId) => savedRecipeId === recipeDetails.recipeId
                  )}
                  className="btn-block btn-info"
                  onClick={() => handleSaveRecipe(recipeDetails.recipeId)}
                >
                  {savedRecipeIds?.some(
                    (savedRecipeId) => savedRecipeId === recipeDetails.recipeId
                  )
                    ? "This Recipe has already been saved!"
                    : "Save this Recipe!"}
                </Button>
              )}
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};

export default RecipeDetails;
