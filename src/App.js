import './App.css';
import './font-styles.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';

function App() {
  return (
      <BrowserRouter>
        <div className="App">

            <NavBar />

            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<MovieDetail />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="/*" element={<h1>Error Page  </h1>} />
            </Routes>
        </div>
      </BrowserRouter>  
  );
}

export default App;
