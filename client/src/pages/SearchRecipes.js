// SearchRecipes.js
import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "antd";

import Auth from "../utils/auth";
import { searchRecipes } from "../utils/API";
import { saveRecipeIds, getSavedRecipeIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_RECIPE } from "../utils/mutations";
import { apiKey } from "../utils/apiKey";

// const { Meta } = Card;

const SearchRecipes = () => {
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRecipes(searchInput, apiKey);
      console.log("API Response", response);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      console.log("Response Data:", data);

      console.log(searchInput);

      const { results } = data;
      console.log(results);

      const recipeData = results.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title,
        // servings: recipe.servings,
        // readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        // sourceLink: recipe.sourceUrl,
      }));
      console.log(recipeData);

      setSearchedRecipes(recipeData);
      setShowResults(true);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSaveRecipe = async (recipeId) => {
  //   const recipeToSave = searchedRecipes.find(
  //     (recipe) => recipe.recipeId === recipeId
  //   );

  //   if (!Auth.loggedIn()) {
  //     return false;
  //   }

  //   try {
  //     await saveRecipe({
  //       variables: recipeToSave,
  //     });
  //     setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  let imageStyle = {
    height: "1080px",
    width: "auto",
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("/background-kitchen.jpg")',
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="image" style={imageStyle}>
        <Container>
          <Row className="description">
            <Col xs={12} md={{ span: 6, offset: 2 }} className="mt-5">
              <h1> Check Us Out! </h1>
              <h4>
                {" "}
                Go on a culinary adventure by exploring new recipes uploaded by
                people all over the world and share your favorites!{" "}
              </h4>
            </Col>
          </Row>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={{ span: 6, offset: 2 }} className="mt-4">
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a recipe"
                />
              </Col>
              <Col xs={12} md={{ span: 4 }} className="mt-4">
                <Button type="primary" variant="success" size="lg">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          <Row>
            {searchedRecipes.map((recipe) => {
              return (
                <Col md="4" key={recipe.recipeId}>
                  <div border="dark">
                    {recipe.image ? (
                      <img
                        src={recipe.image}
                        alt={`${recipe.title}`}
                        variant="top"
                      />
                    ) : null}
                    <div>
                      <div>{recipe.title}</div>
                      {/* <p className="small">Servings: {recipe.servings}</p>
                        <p>Time to Make: {recipe.readyInMinutes} Minutes</p>
                        {Auth.loggedIn() && (
                          <Button
                            disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
                            className="btn-block btn-info"
                            onClick={() => handleSaveRecipe(recipe.recipeId)}
                          >
                            {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                              ? 'This Recipe has already been saved!'
                              : 'Save this Recipe!'}
                          </Button>
                        )} */}
                      <Link
                        className="btn btn-primary btn-block btn-squared"
                        to={`/recipe/${recipe.recipeId}`}
                      >
                        See How to Make this Dish!
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SearchRecipes;
