import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ScrollToTop from './ScrollToTop.jsx'; // Adjust path as needed

function AllMovies(){
    const location = useLocation();
    const movies = location.state;
    const imgBaseUrl = "https://image.tmdb.org/t/p/original/";
    const navigate = useNavigate();

    function goToHome(){
        navigate(-1);

    }

    return (
        <>
        <IconButton aria-label="back" size="large" sx={{float: "left", bottom: '20px'}} onClick={goToHome}>
            <ArrowBackIcon fontSize="inherit" sx={{color: 'white'}}/>
        </IconButton>
        <h1>Results</h1>
          <Box sx={{ flexGrow: 1, marginTop: 5 }}>
            <Grid size={{ xs: 12, md: 12 }} sx={{display: 'contents', margin: 'auto', flexDirection: "row"}}>
            {movies!=[] ? movies.map((movie)=>(
         
                movie.poster_path != null ? (
                <Card sx={{ minWidth:200, maxWidth: 220, height: 300, display: 'inline-flex', backgroundColor: 'transparent', margin: 2}}>
                    <CardActionArea>
                        <NavLink to={`/details/${movie.id}`}>
                            <CardMedia
                                    component="img"
                                    image={imgBaseUrl+ movie.poster_path}
                                    alt={movie.original_title}
                                    sx={{
                                        width: '94%',
                                        height: '100%',
                                        '&:hover': {
                                            boxShadow: '2px 2px white'
                                        },
                                        overflow: 'cover'
                                    }}
                                    />
                        </NavLink>
                    </CardActionArea>
                </Card> ) : <></>
                )) : <CircularProgress size={40} /> }
              </Grid>
        </Box>
        </>
    )
}

export default AllMovies;
