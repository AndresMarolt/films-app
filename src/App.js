import './App.css';
import './font-styles.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Footer from './components/Footer/Footer';
import People from './components/People/People';
import Session from './components/Session/Session';
import User from './components/User/User';

function App() {
  return (
      <BrowserRouter>
        <div className="App">

            <NavBar />

            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<MovieDetail />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="people/:id" element={<People />} />
              <Route path="auth" element={<Session />} />
              <Route path="user/:id" element={<User />} />
              <Route path="/*" element={<h1>Error Page  </h1>} />
            </Routes>

            <Footer />
        </div>
      </BrowserRouter>  
  );
}

export default App;
