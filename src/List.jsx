import React, { useEffect,useState } from "react";
import { apiKey } from "./env";
import { NavLink, useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { AlignHorizontalCenter } from "@mui/icons-material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

function List(props){
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        fetchMovies();
    },[])
    let sectionTitle;
    function setKeyword(listName){
        let keyword;
        
        if(listName=='toprated'){
            keyword = 'top_rated';
            sectionTitle='Top Rated';
        }
        else if(listName=='nowplaying'){
            keyword = 'now_playing';
            sectionTitle = 'Now Playing';
        }
        else{
            keyword = listName;
            sectionTitle = listName;
        }
        return keyword;
    }
    
    const listName = setKeyword(props.name);
    const navigate = useNavigate();
    const url = `https://api.themoviedb.org/3/movie/${listName}?language=en-US&page=1`;
    const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey
        }
    }


    function fetchMovies(){

        fetch(url, options)
        .then(res => res.json())
        .then(jsonRes => {
            setMovies(jsonRes.results);
        })
        .catch(err=>console.log(err));
    }

    function navigateToAll(){
        navigate("/movies-list",{state:movies});
    }


    return (
    <>
    {movies!=[] ? 
    (
        <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={1} sx={{alignItems: 'center', margin: '0px 100px'}}>
                <Grid size={{ xs: 12, md: 12 }} style={{AlignHorizontalCenter}}>
                    <Typography align='center' variant='h5' sx={{marginBottom: 2}}>{sectionTitle.toUpperCase()}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }} sx={{display: 'contents', height: 200, textAlign: "center", margin: 'auto'}}>
                    {movies.slice(0,5).map((movie)=>(

                        <Card sx={{ minWidth:220, maxWidth: 200, display: "inline", backgroundColor: 'transparent'}}>
                            <CardActionArea>
                                <NavLink to={`/details/${movie.id}`}>
                                <CardMedia
                                component="img"
                                image={imgBaseUrl+ movie.poster_path}
                                alt="green iguana"
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
                        </Card>
                    ))
                    }
                    <Button variant="contained" onClick={navigateToAll} sx={{
                        position: 'relative',
                        bottom: '0px',
                        backgroundColor: 'black',
                        top: {
                        xs: "10px", // theme.breakpoints.up('xs')
                        sm: "135px", // theme.breakpoints.up('sm')
                        md: "135px", // theme.breakpoints.up('md')
                        lg: "20px", // theme.breakpoints.up('lg')
                        xl: "135px", // theme.breakpoints.up('xl')
                        },
                        margin: 'auto'
                    }}>See all</Button>
                </Grid>
        </Grid>
        </Box>

    ) : <CircularProgress size={40} />}
    </>
);
}

export default List;
