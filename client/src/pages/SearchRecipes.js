import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

//import { Button, ButtonGroup } from '@chakra-ui/react'


import Auth from '../utils/auth';
import { searchRecipes } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';

const SearchRecipes = () => {
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  // create state for holding returned api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved recipeId values
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // set up useEffect hook to save `savedRecipeIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  // create method to search for recipes and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRecipes(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const recipeData = items.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title, // TODO: figure out what the API returns
        // ingredients: 'insert title here',
        // analyzedInstructions: 'insert description here',
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        sourceLink: recipe.sourceUrl,
      }));

      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a recipe to our database
  const handleSaveRecipe= async (recipeId) => {
    // find the recipe in `searchedRecipes` state by the matching id
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);

    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await saveRecipe(
        {
          variables: recipeToSave,
        }
      );
      // if recipe successfully saves to user's account, save recipe id to state
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (err) {
      console.error(err);
    }
  };

  let imageStyle = {
      height: "1080px",
      width: "auto",
      backgroundImage:
      'url("/background-kitchen.jpg")',
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      color: "white", 
   };

  return (
    <>
    <div className = "image" style = {imageStyle}>
    {/* <div className='text-on-image'>
      <h1> Check Us Out! </h1>
      <p> Go on a culinary adventure by exploring new recipes uploaded by people all over the world and share your favorites! </p> 
    </div> */}
    <Container>
      <Row className="description">
        <Col xs={12} md={{ span: 6, offset: 2 }} className="mt-5">
        <h1> Check Us Out! </h1>
        <h4> Go on a culinary adventure by exploring new recipes uploaded by people all over the world and share your favorites! </h4> 
        </Col>
      </Row>
          {/* <h1>Search for Recipes</h1> */}
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={{ span: 6, offset: 2 }} className="mt-4">
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a recipe'
                />
              </Col>
              <Col xs={12} md={{ span: 4}} className="mt-4">
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedRecipes.map((recipe) => {
            return (
              <Col md="4" key={recipe.recipeId}>
                <Card border='dark'>
                  {recipe.image ? (
                    <Card.Img src={recipe.image} alt={`${recipe.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>Servings: {recipe.servings}</p>
                    <Card.Text>Time to Make: {recipe.readyInMinutes} Minutes</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveRecipe(recipe.recipeId)}>
                        {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                          ? 'This Recipe has already been saved!'
                          : 'Save this Recipe!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchRecipes;
