import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTrendingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";


const trendingMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TrendingMovies"],
    queryFn: getTrendingMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <PageTemplate
      title="Trending Movies"
      movies={data.results}
      action={(movie) => {
        return (<>
        <AddToFavoritesIcon movie={movie} />
        <AddToMustWatchIcon movie={movie} />
        </>
        );
      }}
    />
  );
};

export default trendingMoviesPage;
