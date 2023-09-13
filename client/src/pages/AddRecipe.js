import React from "react";
import {
  Container,
  Card,
  Button,
  Row
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const AddRecipe = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }


  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Add a Recipe!</h1>
         
        </Container>
      </div>

    </>
  );
};

export default AddRecipe;
