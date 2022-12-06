import React, {useEffect, useState} from 'react'
import './User.css'
import { getUserInfo, getFavorites } from "../../actions/user";
import Card from '../Card/Card'
import { getWatchlist } from '../../actions/user';
import { getRatedMovies } from '../../actions/user';

const User = () => {

    const [favorite, setFavorite] = useState(null);
    const [watchlist, setWatchlist] = useState(null);
    const [rated, setRated] = useState(null);
    
    const {sessionId, accountDetails} = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUserData = async () => {

            const fav = await getFavorites(accountDetails.id, sessionId);
            setFavorite(fav);

            const wl = await getWatchlist(accountDetails.id, sessionId);
            setWatchlist(wl);

            const ratedMovies = await getRatedMovies(accountDetails.id, sessionId);
            setRated(ratedMovies);

        }
    
        fetchUserData();

    }, [])


    return (
        <div className="profile container">
            <div className='user_data'>
                <img 
                    src={
                        accountDetails?.avatar.tmdb.avatar_path ? `https://image.tmdb.org/t/p/original/${accountDetails?.avatar.tmdb.avatar_path}` : `https://secure.gravatar.com/avatar/${accountDetails?.avatar.gravatar.hash}?s=150` 
                    } 
                />
                <h2>{accountDetails?.username}</h2>
            </div>

            <div className='liked'>
                <h2 className='detail_heading'>Liked by {accountDetails?.username}</h2>

                <div className='works_results'>
                    <div className="movie__list" >
                        <div className="list__cards" id="movie__list-user">
                            {
                                favorite?.map(movie => (
                                    <Card movie={movie} key={movie.id} isLoading={false} />
                                )) 
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='watchlist'>
                <h2 className='detail_heading'>Watchlist</h2>

                <div className='works_results'>
                    <div className="movie__list" >
                        <div className="list__cards" id="movie__list-user">
                            {
                                watchlist?.map(movie => (
                                    <Card movie={movie} key={movie.id} isLoading={false} />
                                )) 
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='rated'>
                <h2 className='detail_heading'>Rated by {accountDetails?.username}</h2>

                <div className='works_results'>
                    <div className="movie__list" >
                        <div className="list__cards" id="movie__list-user">
                            {
                                rated?.map(movie => (
                                    <div className='rated__movie' key={movie.id}>
                                        <Card movie={movie} isLoading={false} />

                                        <div className='rated__movie-stars'>
                                            {
                                                [...Array(movie.rating/2)].map((star, index) => <i  
                                                    className="fas fa-star star_icon" 
                                                    key={index}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                )) 
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default User;