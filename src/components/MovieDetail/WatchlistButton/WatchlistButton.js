import { useEffect, useState } from 'react'
import { postToWatchlist, getWatchlist } from '../../../actions/user';
import './WatchlistButton.css'
import Notification from '../../Notification/Notification';

const WatchlistButton = ({id, userData}) => {
    
    const [isAdded, setIsAdded] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const fetchData = async () => {
        const watchlist = await getWatchlist(userData?.accountDetails.id, userData?.sessionId);

        setIsAdded(false);

        watchlist?.map(movie => {
            if(id == movie.id) {
                setIsAdded(true);
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

    const toggleAdd = async (watchlistBoolean) => {
        setIsAdded(watchlistBoolean);
        const postBody = {
            media_type: "movie",
            media_id: id,
            watchlist: watchlistBoolean 
        }

        const aux = await postToWatchlist(userData?.accountDetails.id, userData?.sessionId, postBody);

        setShowNotification(true);
    }
    
    return (
        <div>
            <i className={`${isAdded ? 'fas' : 'far'} fa-clock`} onClick={() => toggleAdd(!isAdded)}></i>

            {
                showNotification && <Notification text={isAdded ? "Added to Watchlist" : "Removed from Watchlist"} color="gold-background"/>
            }
        </div>
    )
}

export default WatchlistButton;