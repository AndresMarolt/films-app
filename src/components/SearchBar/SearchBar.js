import React, {useState, useEffect} from "react";
import './SearchBar.css'
import { searchMovie } from '../../actions/films';
import { Link } from "react-router-dom";

const SearchBar = () => {

    const [foundMovies, setFoundMovies] = useState(null);

    const handleChange = async (value) => {
        if(value) {
            const results = await searchMovie(value); 
            setFoundMovies(results);
        } else {
            setFoundMovies(null)
        }
    }


    return (
        <div className="search">
            <div className="search__bar">
                <label htmlFor="inputSearch"><i className="fa fa-search"></i></label>
                <input placeholder="Search films..." id="inputSearch" onChange={(e) => handleChange(e.target.value)} ></input>
            </div>
            {
                foundMovies ? (
                    <div className="search__results">
                        {
                            foundMovies.map((movie) => (
                                <Link to={`/movie/${movie.id}`}>
                                    {movie.title}
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