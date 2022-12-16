import React, {useEffect, useState} from "react";
import { getReviews } from "../../../actions/films";
import './Reviews.css'

const Reviews = ({id}) => {

    const [reviews, setReviews] = useState(null);
    const [readMore, setReadMore] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedReviews = await getReviews(id);
            setReviews(fetchedReviews);
        }
        fetchData();
    }, [id]);

    console.log(reviews);

    if(!reviews?.length) {
        return(
            <>
            </>
        )
    }

    return (
        <div className="reviews__container">
            <h2 className='detail_heading' style={{marginBottom: '15px'}}>Reviews</h2>

            <div className='reviews'>
                {
                    reviews?.map(review => (
                        <div className="review" key={review.id}>
                            <div className="author">
                                {
                                    review.author_details.avatar_path ? (
                                        <img className={"review__avatar"} src={ review?.author_details.avatar_path.slice(0, 25) === '/https://www.gravatar.com' ? review?.author_details.avatar_path.slice(1) : `https://image.tmdb.org/t/p/original/${review?.author_details.avatar_path}` } alt=""></img> 
                                    )
                                    :
                                    (
                                        <div className="not_found not_found_avatar">
                                            <p>?</p>
                                        </div>
                                    )
                                }

                                <div>
                                    <p className="review__author">{review.author}</p>
                                    <p className="review__detail">Created: <span>{review.created_at.split("T")[0]} ({review.created_at.split("T")[1].split("Z")[0]})</span></p>
                                </div>
                            </div>

                            {
                                review.content.length > 150 ? (
                                    (readMore && (review.id === reviewId)) ?
                                        (
                                            <p className="review__content">{review.content}</p>
                                        )
                                        :
                                        (
                                            <p className="review__content">{review.content.slice(0, 200)}... <span onClick={() => {setReadMore(true); setReviewId(review.id)}}>More</span></p>
                                        )
                                )
                                :
                                (
                                    <p className="review__content">{review.content}</p>
                                )
                            }

                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}

export default Reviews;