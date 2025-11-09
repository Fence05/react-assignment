import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [belowRatingFilter, setBelowRatingFilter] = useState(10); 
  const [aboveRatingFilter, setAboveRatingFilter] = useState(0);
  const [page, setPage] = useState(1);
  

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return (
        m.vote_average <= belowRatingFilter &&
        m.vote_average >= aboveRatingFilter
      );
    });




  const moviesPerPage = 7;

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  
  const paginatedMovies = displayedMovies.slice(startIndex, endIndex);

  const totalPages = Math.ceil(displayedMovies.length / moviesPerPage);



  const handleChange = (type, value) => {
    switch (type) {
      case "name":
        setNameFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "belowRating":
        setBelowRatingFilter(value);
        break;
      case "aboveRating":
        setAboveRatingFilter(value);
        break;
      default:
        break;
      }
    setPage(1);
  };



  

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            belowRatingFilter={belowRatingFilter}
            aboveRatingFilter={aboveRatingFilter}
          />
        </Grid>
        <MovieList action={action} movies={paginatedMovies}></MovieList>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "40px"
          }}
        >
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
        
          <span>Page {page} of {totalPages}</span>
        
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>


      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
