import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getByType } from "../../actions/films";
import Card from '../Card/Card'
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
                        <Card movie={movie} isLoading={isLoading} key={movie.id} showName={"showName"} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;