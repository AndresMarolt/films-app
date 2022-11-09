import React, {useState, useEffect, useRef} from "react";
import './SearchBar.css'
import { searchMovie } from '../../actions/films';
import { Link, useLocation } from "react-router-dom";

const SearchBar = () => {

    const searchRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [foundMovies, setFoundMovies] = useState(null);

    const location = useLocation();

    useEffect(() => {
        console.log("ACA");
        const clickOutsideSearchBar = (event) => {
            if(!searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", (e) => clickOutsideSearchBar(e));

        return () => {
            document.removeEventListener("mousedown", clickOutsideSearchBar);
        }
    }, [])

    useEffect(() => {
        setShowResults(false);
    }, [location])

    const handleChange = async (value) => {
        if(value) {
            const results = await searchMovie(value);
            setFoundMovies(results.slice(0, 5));
            setShowResults(true);
        } else {
            setFoundMovies(null);
        }
    }

    return (
        <div className="search" ref={searchRef} >
            <div className="search__bar">
                <label htmlFor="inputSearch"><i className="fa fa-search"></i></label>
                <input placeholder="Search films..." id="inputSearch" onChange={(e) => handleChange(e.target.value)} ></input>
            </div>
            {
                (foundMovies && showResults) ? (
                    <div className="search__results">
                        {
                            foundMovies.map((movie) => (
                                <Link to={`/movie/${movie.id}`}>
                                    <img alt="img" src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'} />
                                    <div>
                                        <p>{movie.title}</p>
                                        <span className="movie_year">&nbsp;({movie.release_date.split("-")[0]})</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                ) : ""
            }

        </div>

    )
}

export default SearchBar;