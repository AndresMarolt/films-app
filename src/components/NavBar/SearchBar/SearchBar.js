import React, {useState, useEffect, useRef} from "react";
import './SearchBar.css'
import { searchMovie } from '../../../actions/films';
import { searchPersonByName } from "../../../actions/people";
import { Link, useLocation } from "react-router-dom";


const SearchBar = ({setSearching}) => {

    const searchRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [allResults, setAllResults] = useState();

    const location = useLocation();

    useEffect(() => {
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
            const personResults = await searchPersonByName(value);
            const aux = {movies: results.slice(0, 5), people: personResults.slice(0, 5)}
            setAllResults(aux)
            setShowResults(true);
        } else {
            setAllResults(null);
        }
    }

    const emptySearchBar = async () => {
        const inputElement = document.querySelector('#inputSearch');
        inputElement.value = '';
    }

    return (
        <div className="search" ref={searchRef} >
            <div className="search__bar__container">
                <div className="search__bar">
                    <label htmlFor="inputSearch"><i className="fa fa-search"></i></label>
                    <input placeholder="Search films..." id="inputSearch" onChange={(e) => handleChange(e.target.value)} ></input>
                </div>

            </div>
            
            {
                (allResults && showResults) && (

                    <div className="search__results">
                        {
                            allResults?.movies?.map((movie) => (
                                <Link to={`/movie/${movie.id}`} onClick={() => emptySearchBar()}>
                                    <img alt="img" src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'} />
                                    <div>
                                        <p>{movie.title}</p>
                                        <span className="movie_year">&nbsp;({movie.release_date?.split("-")[0]})</span>
                                    </div>
                                </Link>
                            ))
                        }

                        {
                            allResults?.people?.map((person) => (
                                <Link to={`/people/${person.id}`} onClick={() => emptySearchBar()}>
                                    <img alt="img" src={person?.profile_path ? `https://image.tmdb.org/t/p/original${person?.profile_path}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'} />
                                    <div>
                                        <p>{person.name}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                )
            }

        </div>

    )
}

export default SearchBar;