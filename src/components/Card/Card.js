import React, {useEffect, useState} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import './Card.css'
import { Link } from 'react-router-dom'

const Card = ({movie, isLoading}) => {

    return (
        <>
            {
                isLoading 
                ?
                <div className="card">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
                :
                <div className="card-container">
                    <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none', color: 'white'}}>
                        <div className="card">
                            {
                                movie?.poster_path ? (
                                    <img className="card__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : "" }`} />
                                )
                                :
                                (
                                    <div className="not_found">
                                        <p>?</p>
                                    </div>
                                )
                            }
                            <div className="card__overlay">
                                <div className="card__title">{ movie ? movie.original_title : "" }</div>
                                <div className="card__runtime">
                                    { movie ? movie.release_date : "" }
                                    <span className="card__rating">{ movie ? movie.vote_average : "" }  <i className="fas fa-star" />  </span>
                                </div>
                                <div className="card__description">{ movie ? movie.overview.slice(0, 118) + "..." : "" }</div>
                            </div>

                        </div>
                        
                    </Link>
                </div>
            }
        </>
    )
}

export default Card;