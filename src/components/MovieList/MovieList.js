import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { getByType } from "../../actions/films";
import Cards from "../Cards/Cards";
import './MovieList.css'


const MovieList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const {type} = useParams();
    useEffect(() => {
        const fetchByType = async () => {
            const fetchedMovies = await getByType(type);
            setIsLoading(false);
            setMovieList(fetchedMovies);
        }
        
        fetchByType();
    }, [type]) 

    return (
        <div className="movie__list">
            <h2 className="list__title"> {(type==="top_rated" ? "Top Rated" : (type || "Popular"))} </h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} isLoading={isLoading} key={movie.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;