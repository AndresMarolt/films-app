import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import { useParams } from 'react-router-dom'
import { getDetail } from '../../actions/films'
import Credits from "./Credits/Credits";
import Providers from "./Providers/Providers";
import Videos from "./Videos/Videos";
import Reviews from "./Reviews/Reviews";
import Rate from './Rate/Rate';
import LikeMovie from './LikeMovie/LikeMovie';
import WatchlistButton from './WatchlistButton/WatchlistButton';

const MovieDetail = () => {

    const [currentMovie, setCurrentMovie] = useState(null);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    document.title = `IMDb Clone | ${currentMovie?.title}`
    
    const { id } = useParams();
    
    useEffect(() => {    
        const fetchDetail = async () => {
            const fetchedDetail = await getDetail(id);
            setCurrentMovie(fetchedDetail);
        }
        fetchDetail();
    }, [id])

    return (
        <div className="movie">
            <div className='movie__intro'>
                <img className="movie__intro-backdrop" src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path || ""}`} />
            </div>

            <div className='movie__detail container'>
                <div className='poster__box'>
                    <img className="poster" src={`https://image.tmdb.org/t/p/original${currentMovie && currentMovie.poster_path}`} />
                </div>

                <div className='detail'>
                    <div className='data'>
                        <h4 className="name">{currentMovie?.title || ""}</h4>
                        <h4 className="tagline">{currentMovie?.tagline || ""}</h4>
                        <h4 className="rating">
                            {currentMovie?.vote_average || ""} <i className="fas fa-star" />
                            <span className="voteCount">{currentMovie ? "(" + currentMovie.vote_count + ") votes" : ""}</span>
                        </h4>  
                        <h4 className="runtime">{currentMovie ? currentMovie.runtime + " mins" : ""}</h4>
                        <h4 className="releaseDate">{currentMovie ? "Release date: " + currentMovie.release_date : ""}</h4>
                        <div className="genres">
                            {
                                currentMovie?.genres?.map(genre => (
                                    <h4 className="genre" id={genre.id} key={genre.id}>{genre.name}</h4>
                                ))
                            }

                            {
                                userData && (
                                    <>
                                        <LikeMovie id={id} userData={userData}/>
                                        <WatchlistButton id={id} userData={userData}/>
                                    </>
                                )
                            }

                        </div>
                        
                    </div>

                    <div className='synopsis'>
                        <div>{currentMovie?.overview || ""}</div>

                    </div>
                </div>
            </div>

            <div className='movie__data container'>

                { userData && <Rate id={id} userData={userData} /> }
                
                <Videos id={id} />                

                <Credits id={id} />

                <Providers id={id} />

                <Reviews id={id} />
            </div>


        </div>
    )
}

export default MovieDetail;