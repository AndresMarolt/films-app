import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons'
import { postRating } from '../../../actions/user'
import './Rate.css'
import { getRatedMovies } from '../../../actions/user'

const Rate = ({id, userData}) => {

    
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    let initialRating = 0;
    
    
    useEffect(() => {
        const getRated = async () => {
            const rated = await getRatedMovies(userData.accountDetails.id, userData.sessionId);
            const movie = rated.find(movie => movie.id == id)
            if(movie) {
                initialRating = movie?.rating / 2;
                setRating(initialRating);
            }
        }
        
        getRated();
    }, [])

    const handleRating = async (index) => {
        setRating(index);        

        const aux = await postRating(id, userData.sessionId, index*2);
        console.log(aux);
    }

    return (
        <div className='rate_container'>
            <h2 className='detail_heading' style={{marginBottom: '15px'}}>Rate this Movie</h2>

            <div>
                {
                    [...Array(5)].map((star, index) => {
                        index += 1;

                        return (
                            <FontAwesomeIcon 
                                icon={index <= (rating || hover) ? faSolidStar : faStar} 
                                className="star_icon" 
                                onClick={() => handleRating(index)} 
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                key={index}
                            />                 

                        ) 
                    })
                }
            </div>
        </div>
    )
}


export default Rate;