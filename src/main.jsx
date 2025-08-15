import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MovieDetails from './MovieDetails.jsx'
import AllMovies from './AllMovies.jsx'
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from './Layout.jsx'


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        children: [
          { index: true, element: <App /> },
          { path: 'details/:id', element: <MovieDetails /> },
          { path: 'movies-list', element: <AllMovies /> }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
  </StrictMode>,
)
