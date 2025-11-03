import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieCredits from "../components/movieCredits";

const CreditsPage = (props) => {
  let location = useLocation();
  const {movie, credits} = location.state;
  
  return (
    <PageTemplate movie={movie}>
      <MovieCredits credits={credits} />
    </PageTemplate>
  );
};

export default CreditsPage;
