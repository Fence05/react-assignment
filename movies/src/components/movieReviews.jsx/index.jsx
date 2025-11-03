import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


export default function MovieRecommendations({ movie }) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['recommendations', { id: movie.id }],
    queryFn: getMovieRecommendations,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }




  
  const recommendations = data?.results?.slice(0, 3); // Only first 3

  if (!recommendations || recommendations.length === 0)
    return <p>No recommendations available.</p>;





return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="Recommendations table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Overview</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Details
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendations.map((rec) => (
            <TableRow key={rec.id} hover>
              <TableCell>{rec.title}</TableCell>
              <TableCell>{rec.overview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
