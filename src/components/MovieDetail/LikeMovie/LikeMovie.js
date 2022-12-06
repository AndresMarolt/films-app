import React, {useState, useEffect} from 'react'
import './LikeMovie.css'
import { getFavorites, postFav } from '../../../actions/user';
import Notification from '../../Notification/Notification';

const LikeMovie = ({id, userData}) => {

    const [liked, setLiked] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const fetchData = async () => {
        const favorites = await getFavorites(userData?.accountDetails.id, userData?.sessionId);
        
        setLiked(false);

        favorites.map(fav => {
            if(id == fav.id) {
                setLiked(true);
            }
        })
    }

    useEffect(() => {
        fetchData();

        if(showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    }, [id, showNotification]);


    const toggleFav = async (likeBoolean) => {
        setLiked(likeBoolean);
        const postBody = {
            media_type: "movie",
            media_id: id,
            favorite: likeBoolean 
        }

        const aux = await postFav(userData?.accountDetails.id, userData?.sessionId, postBody);

        setShowNotification(true);
    }

    return (
        <div>
            <i className={liked ? 'fas fa-heart' : 'far fa-heart'} onClick={() => toggleFav(!liked)} ></i>
    
            {
                showNotification && <Notification text={liked ? "Added to Favorites" : "Removed from Favorites"} color="gold-background"/>
            }
        </div>
    )
}

export default LikeMovie;