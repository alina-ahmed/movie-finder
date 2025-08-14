import './App.css'
import SearchBar from './SearchBar'
import List from './List'

function App() {  

  return (
    <>
     <h1>Movie Finder</h1>
     <SearchBar />
     <List name="popular" />
     <List name="toprated" />
     <List name="nowplaying" />
     <List name="upcoming" />
     </>
  )
}

export default App
