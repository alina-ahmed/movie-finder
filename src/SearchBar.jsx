import React, { useState } from "react";
import { apiKey } from "./env";
import { useNavigate } from "react-router";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

function SearchBar(){

  const [searchResults,setSearchResults] = useState([]);
  const key = apiKey;
  const baseUrl = "https://api.themoviedb.org/3/search/movie?";
  const parameters = "&include_adult=false&language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: key
    }
  }
  const navigate = useNavigate();

  function search(formData){
    const query = formData.get("query").replace(" ","%20");
    const endpoint = baseUrl + `query=${query}` + parameters;

    fetch(endpoint, options)
    .then(res => {
        return res.json();
    })
    .then(jsonRes=>{
      setSearchResults(jsonRes.results);
      navigate('/movies-list', {state: jsonRes.results});

    })
    .catch(err=>{
      console.log(err);
    })
  }
   
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid component="form" action={search} container spacing={1}>
          <Grid size={{ xs: 12, md: 9 }} sx={{
            textAlign: {
                    xs: "center", // theme.breakpoints.up('xs')
                    sm: "center", // theme.breakpoints.up('sm')
                    md: "right", // theme.breakpoints.up('md')
                    lg: "right", // theme.breakpoints.up('lg')
                    xl: "right", // theme.breakpoints.up('xl')
                    },
          }}>
            <Container >
              <TextField id="filled-basic" label="Search" variant="filled" name="query" sx={{width: '70%', backgroundColor: 'white'}} />
            </Container>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} sx={{
            textAlign: {
                    xs: "center", // theme.breakpoints.up('xs')
                    sm: "center", // theme.breakpoints.up('sm')
                    md: "left", // theme.breakpoints.up('md')
                    lg: "left", // theme.breakpoints.up('lg')
                    xl: "left", // theme.breakpoints.up('xl')
                    }
          }}>
            <Button variant="contained" sx=
            {{top: '2px', 
              backgroundColor: "black", 
              height: '50px',
            }} 
            type="submit">Search</Button>
          </Grid>
          
        </Grid>
      </Box>
    )
}

export default SearchBar;