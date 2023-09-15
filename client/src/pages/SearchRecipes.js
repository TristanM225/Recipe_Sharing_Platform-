import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  //Card,
  Row
} from 'react-bootstrap';

//import { Button, ButtonGroup } from '@chakra-ui/react'

 //import { Button } from 'antd';
 import { Card } from "antd";

import Auth from '../utils/auth';
import { searchRecipes } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';

const { Meta } = Card;

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
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("/background-kitchen.jpg")',
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
   };

  return (
    <>
    <div className = "image" style = {imageStyle}>
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
                <Button type='primary' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
              <Col xs={12} md={{ span: 2, offset: 2 }} className="mt-4">
              <Card
                hoverable
                style={{ width: 240, color: "#000000" }}
                cover={
                  <div style={{ overflow: "hidden", height: "100px" }}>
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src="https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg"
                  />
                  </div>
                }
              >
                <Meta title="Chocolate Chip Cookies" description="delicious cookies" />
              </Card>
              </Col>
              <Col xs={12} md={{ span: 2, offset: 1 }} className="mt-4">
              <Card
                hoverable
                style={{ width: 240, color: "#000000" }}
                cover={
                  <div style={{ overflow: "hidden", height: "100px" }}>
                     <img
                    alt="example"
                    style={{ width: "100%" }}
                    src="https://hips.hearstapps.com/hmg-prod/images/copycat-shake-shack-burger-4-min-1649427734.jpg?crop=0.668xw:1.00xh;0.123xw,0&resize=360:*"
                  />
                  </div>
                }
              >
                <Meta title="Cheeseburger" description="Shake Shack copycat" />
              </Card>
              </Col>
              <Col xs={12} md={{ span: 2, offset: 1 }} className="mt-4">
              <Card
                hoverable
                style={{ width: 240, color: "#000000" }}
                cover={
                  <div style={{ overflow: "hidden", height: "100px" }}>
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src="https://images.unsplash.com/photo-1599749011927-9a77278bfa61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80"
                  />
                  </div>
                }
              >
                 <Meta title="Tomato Bowtie Pasta" description="simple and delicious pasta" />
              </Card>

              </Col>
            </Row>
        </Container>
      </div>
    </>
  );
};

export default SearchRecipes;
