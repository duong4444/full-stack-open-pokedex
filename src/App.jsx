/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import { useApi } from "./useApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import PokemonPage from "./PokemonPage";
import PokemonList from "./PokemonList";

const mapResults = ({ results }) =>
  results.map(({ url, name }) => ({
    url,
    name,
    id: parseInt(url.match(/\/(\d+)\//)[1]),
  }));

const App = () => {
  const match = useMatch("/pokemon/:name");
  // pokeList là arr[{}] chứa full list pokemon
  //
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useApi("https://pokeapi.co/api/v2/pokemon/?limit=50", mapResults);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  let next = null;
  let previous = null;

  // previous,next là {} theo id của pokeList

  if (match && match.params) {
    const pokemonId = pokemonList.find(
      ({ name }) => name === match.params.name
    ).id;
    console.log("current id : ", pokemonId);
    previous = pokemonList.find(({ id }) => id === pokemonId - 1);
    console.log("previous là: ",previous);
    next = pokemonList.find(({ id }) => id === pokemonId + 1);
    console.log("next là: ",next);

  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<PokemonList pokemonList={pokemonList} />}
      />
      <Route
        exact
        path="/pokemon/:name"
        element={
          <PokemonPage
            pokemonList={pokemonList}
            previous={previous}
            next={next}
          />
        }
      />
    </Routes>
  );
};

export default App;
