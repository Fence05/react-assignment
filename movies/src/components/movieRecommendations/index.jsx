import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import MovieCard from "../movieCard";
import { getMovieRecommendations } from "../../api/tmdb-api";

export default function MovieRecommendations({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;


const recommendations = data?.results?.slice(0, 3);

  if (recommendations.length === 0)
    return <Typography sx={{ marginLeft: 2 }}>No recommendations found.</Typography>;

  return (
    <>
      <Typography variant="h5" >
        Recommended Movies
      </Typography>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {recommendations.map((rec) => (
          <Grid item key={rec.id}>
            <MovieCard movie={rec} action={() => <></>} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
