import React, {useEffect, useState} from "react";
import { getVideos } from "../../../actions/films";
import { Carousel } from "react-responsive-carousel";
import './Videos.css'

const Videos = ({id}) => {

    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedVideos = await getVideos(id);
            const youTubeVideos = await fetchedVideos.filter(video => video.site === "YouTube");
            setVideos(youTubeVideos);
        }

        fetchData();
    }, [id]);

    return (
        <div className='movie__videos'>
            <h2 className='detail_heading' style={{marginBottom: '15px'}}>Videos</h2>

            <div className='videos'>
                {
                    videos?.length > 3 ? 
                    (
                        <Carousel
                            showThumbs={false}
                            autoPlay={false}
                            centerMode
                            transitionTime={200}
                            showArrows={true}
                            centerSlidePercentage={50}
                        >
                            {
                                videos?.slice(0, 5).map(video => (
                                        <div key={video.id}>
                                            <iframe src={`https://www.youtube.com/embed/${video.key}`} className='videoCarousel'> </iframe>
                                        </div>
                                    )
                                )
                            }
                        </Carousel>
                    ) 
                    :
                    (
                        videos?.slice(0, 5).map(video => (
                            <div className='video__container' key={video.id}>
                                <iframe src={`https://www.youtube.com/embed/${video.key}`} className='video'> </iframe>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Videos;