import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel";

import './MovieDetail.css'
import { useParams } from 'react-router-dom'
import { getDetail, getCredits, getWatchProviders } from '../../actions/films'


const MovieDetail = () => {

    const [currentMovie, setCurrentMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);
    const { id } = useParams();
    
    console.log(watchProviders);
    useEffect(() => {
        
        const fetchDetail = async () => {
            const fetchedDetail = await getDetail(id);
            const fetchedCredits = await getCredits(id);
            const fetchedWatchProviders = await getWatchProviders(id);
            setCurrentMovie(fetchedDetail);
            setCredits(fetchedCredits);

            const { AR } = await fetchedWatchProviders;
            setWatchProviders(AR);
            // fetchedWatchProviders.find()
        }

        fetchDetail();
    }, [id])
    
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
                        <div className="movie__name">{currentMovie?.title || ""}</div>
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
                        <h2 className="synopsisText">Synopsis</h2>
                        <div>{currentMovie?.overview || ""}</div>

                        <div className="movie__links">
                        {
                            currentMovie?.homepage && <a href={currentMovie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                        }
                        {
                            currentMovie?.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovie.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                        }
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='movie__data'>
                <div className="movie__cast">
                    <h2 className='detail_heading' style={{marginBottom: '15px'}}>Cast</h2>

                    <div className='credits'>
                        <Carousel
                            showThumbs={false}
                            autoPlay={false}
                            centerMode
                            transitionTime={200}
                            showArrows={true}
                            centerSlidePercentage={17}
                        >
                            {
                                credits?.cast?.slice(0, 12).map(actor => (
                                    <div className='credit' key={actor.id}>
                                        <img src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : "https://d1bvpoagx8hqbg.cloudfront.net/259/0f326ce8a41915e8b1d21ffaee087fae.jpg"} style={{width: '30%', height: '80px', borderRadius: '1000000px'}}/>
                                        <h4>{actor.name}</h4>
                                        <h4 style={{fontWeight: '100', marginBottom: '60px' }}>{actor.character}</h4>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>

                <div className="movie__crew">
                    <h2 className='detail_heading' style={{margin: '15px 0'}}>Crew</h2>

                    <div className='credits'>
                        <Carousel
                                showThumbs={false}
                                autoPlay={false}
                                centerMode
                                transitionTime={200}
                                showArrows={true}
                                centerSlidePercentage={17}
                        >
                            {
                                credits?.crew?.slice(0, 12).map(crewMember => (
                                    <div className='credit' key={crewMember.id} href="">
                                        <img src={crewMember.profile_path ? `https://image.tmdb.org/t/p/original/${crewMember.profile_path}` : "https://d1bvpoagx8hqbg.cloudfront.net/259/0f326ce8a41915e8b1d21ffaee087fae.jpg"} style={{width: '20%', height: '50%', borderRadius: '100px'}}/>
                                        <h4>{crewMember.name}</h4>
                                        <h4 style={{fontWeight: '100', marginBottom: '60px' }}>{crewMember.job}</h4>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>

                {
                    watchProviders &&
                        <div className='providers_all'>
                            <h2>Where to Watch?</h2>

                            <div className='providers'>
                                {   watchProviders?.flatrate &&
                                    <div>
                                        <h2>Stream</h2>
                                        <div className='provider'>
                                            {
                                                watchProviders?.flatrate?.map(provider => (
                                                    <div className='provider__items'>
                                                        <img src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                                                        <p>{provider.provider_name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }

                                {   watchProviders?.buy &&
                                    <div>
                                        <h2>Buy</h2>
                                        <div className='provider'>
                                            {
                                                watchProviders?.buy?.map(provider => (
                                                    <div className='provider__items'>
                                                        <img src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                                                        <p>{provider.provider_name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }

                                {   watchProviders?.rent &&
                                    <div>
                                        <h2>Rent</h2>
                                        <div className='provider'>
                                            {
                                                watchProviders?.rent?.map(provider => (
                                                    <div className='provider__items'>
                                                        <img src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                                                        <p>{provider.provider_name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </div>
            
        </div>
    )
}

export default MovieDetail;

