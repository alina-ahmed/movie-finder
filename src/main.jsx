import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import MovieDetails from './MovieDetails.jsx'
import AllMovies from './AllMovies.jsx'
import { StyledEngineProvider } from '@mui/material/styles';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<App />} />
  <Route path='/details/:id' element={<MovieDetails />} />
  <Route path='/movies-list' element={<AllMovies />} />
</>

))

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
  </StrictMode>,
)
