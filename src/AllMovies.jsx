import React from "react";
import { NavLink, useLocation } from "react-router";

function AllMovies(){
    const location = useLocation();
    const movies = location.state;
    const imgBaseUrl = "https://image.tmdb.org/t/p/original/";

    return (
        <>
        <h1>Results</h1>
        {movies ? movies.map((movie)=>(
            <NavLink to={`/details/${movie.id}`}>
                 <img src={imgBaseUrl+ movie.poster_path} />
            </NavLink>
               
            )) : <p>Loading</p> }
        </>
    )
}

export default AllMovies;