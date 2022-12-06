import React, { useEffect, useState } from "react";
import { getPopular } from "../../actions/films";
import './Home.css'
import './../MovieList/MovieList.css'
import Card from "../Card/Card";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import Notification from "../Notification/Notification";

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
                        popularMovies.slice(0, 10).map(movie => (
                            <Link style={{textDecoration: 'none', color: 'white'}} to={`/movie/${movie.id}`} key={movie.id}>
                                    <div className="posterImage">
                                        <img src={` https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`}  />
                                    </div>

                                    <div className="posterImage__overlay">
                                        <div className="posterImage__title">{movie ? movie.title : ""}</div>
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

            <Notification text="" color="" />
            
            <div className="movie__list container">
                <h2 className="section_title"> Popular </h2>
                <div className="list__cards">
                    {
                        popularMovies?.map(movie => (
                            <Card movie={movie} isLoading={isLoading} key={movie.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home;