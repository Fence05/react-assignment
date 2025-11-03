import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";


const topRatedMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <PageTemplate
      title="Top Rated Movies"
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

export default topRatedMoviesPage;
