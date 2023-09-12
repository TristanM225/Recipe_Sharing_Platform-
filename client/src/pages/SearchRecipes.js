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
        author: 'insert author here', // TODO: figure out what the API returns
        title: 'insert title here',
        description: 'insert description here',
        image: '',
        link: 'insert link'
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
        <Col xs={12} md={4} className="mt-5">
        <h1> Check Us Out! </h1>
        <p> Go on a culinary adventure by exploring new recipes uploaded by people all over the world and share your favorites! </p> 
        </Col>
      </Row>
          {/* <h1>Search for Recipes</h1> */}
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a recipe'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default SearchRecipes;
