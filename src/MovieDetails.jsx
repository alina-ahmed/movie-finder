import React, { useState, useEffect } from "react";
import { apiKey } from "./env.js";
import { useParams,useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function MovieDetails(){

    const [movieDetails,setMovieDetails] = useState(null);

    useEffect(()=>{
        fetchMovieDetails();
        
    },[])

    let params = useParams()
    const id = params.id;
    const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

    const navigate = useNavigate();

    function goBack(){
        navigate(-1);

    }

    function fetchMovieDetails(){
        const key = apiKey;
        const baseUrl = "https://api.themoviedb.org/3/movie/";
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: key
            }
        }

        fetch(baseUrl+id, options)
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Request failed");

        }, networkError => {
            console.log(networkError).message;
        })
        .then(jsonRes=>{
            console.log(jsonRes);
            setMovieDetails(jsonRes);
        })
    }

    return (
        <div>
            {
            
        movieDetails ? (
           
             <Box sx={{ flexGrow: 1, backgroundColor: '#0b1329ff', width: '100%', color: 'white' }}>
                <Grid container rowSpacing={3}>
                       <Grid size={{ xs: 12, md: 12 }}>
                            <IconButton aria-label="back" size="large" sx={{ float: "left", bottom: '50px'}} onClick={goBack}>
                                <ArrowBackIcon fontSize="inherit" sx={{color: 'white'}}/>
                            </IconButton>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <img src={imgBaseUrl+ movieDetails.poster_path} style={{width: "70%", height: 'auto'}}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}  container rowSpacing={1}>
                        <Grid size={{ xs: 12, md: 12 }}>
                        <Typography variant="h3">{movieDetails.original_title}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                        <Typography variant="h6">{movieDetails.tagline}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} sx={{textAlign: "left"}}>
                        <Typography variant="h7">{movieDetails.overview}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} container rowSpacing={1} sx={{textAlign: "left"}}>
                            <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Average Rating</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }}>
                                <Rating  name="customized-10" defaultValue={movieDetails.vote_average} max={10} readOnly  emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize="inherit" />}/>
                            </Grid>
                             <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Release Date</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }}>
                                <Typography>{new Date(movieDetails.release_date).toDateString()}</Typography>
                            </Grid>
                            
                            <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Country of Origin</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }}>
                                <Typography>{movieDetails.origin_country}</Typography>
                            </Grid>
                             <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Origin language</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }}>
                                <Typography>{movieDetails.original_language}</Typography>
                            </Grid>
                             <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Genres</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }}>
                                {movieDetails.genres.map((genreObj)=> <Chip sx={{backgroundColor: 'white', marginRight: 1, marginBottom: 1}} label={genreObj.name} />)}
                            </Grid>
                            <Grid size={{ xs: 6, md: 3 }}>
                                <Typography>Produced by</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 9 }} rowSpacing={3}>
                                {movieDetails.production_companies.map((company)=> <Chip sx={{backgroundColor: 'white', marginRight: 1,marginBottom: 1}} label={company.name} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
    )
    : <CircularProgress size={80} />
    }
    </div>
    );
}

export default MovieDetails;
