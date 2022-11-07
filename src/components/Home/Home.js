import React, { useEffect, useState } from "react";
import { getPopular } from "../../actions/films";
import './Home.css'
import './../MovieList/MovieList.css'
import Cards from "../Cards/Cards";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        const fetchPopular = async () => {
            const fetchedPopularMovies = await getPopular();
            setPopularMovies(fetchedPopularMovies);
            setIsLoading(false);
        }

        fetchPopular();
    }, []);

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration: 'none', color: 'white'}} to={`/movie/${movie.id}`} key={movie.id}>
                                    <div className="posterImage">
                                        <img src={` https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`}  />
                                    </div>

                                    <div className="posterImage__overlay">
                                        <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                        <div className="posterImage__runtime">
                                            {movie ? movie.release_date : ""}
                                            <span className="posterImage__rating">
                                                { movie ? movie.vote_average : "" }
                                                <i className="fas fa-star" />{" "}
                                            </span>
                                        </div>
                                        <div className="posterImage__description">
                                            {movie ? movie.overview : ""}
                                        </div>
                                    </div>
                            </Link>
                        ))
                    }
                </Carousel>
            </div>
            
            <div className="movie__list">
                <h2 className="list__title"> Popular </h2>
                <div className="list__cards">
                    {
                        popularMovies?.map(movie => (
                            <Cards movie={movie} isLoading={isLoading} key={movie.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home;