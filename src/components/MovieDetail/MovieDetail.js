import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { getDetail } from '../../actions/films'

const MovieDetail = () => {

    const [currentMovie, setCurrentMovie] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchDetail = async () => {
            const fetchedDetail = await getDetail(id);
            setCurrentMovie(fetchedDetail);
        }

        fetchDetail();
    }, [])

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path || ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovie?.original_title || ""}</div>
                        <div className="movie__tagline">{currentMovie?.tagline || ""}</div>
                        <div className="movie__rating">
                            {currentMovie?.vote_average || ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovie ? "(" + currentMovie.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovie ? currentMovie.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovie ? "Release date: " + currentMovie.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovie?.genres?.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) || ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovie?.overview || ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovie?.homepage && <a href={currentMovie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovie?.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovie.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovie?.production_companies?.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieDetail;

