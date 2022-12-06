import React, {useEffect, useState} from "react";
import { getCredits } from "../../../actions/films";
import { Link } from "react-router-dom";
import './Credits.css'

const Credits = ({id}) => {

    const [credits, setCredits] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCredits = await getCredits(id);
            setCredits(fetchedCredits);
        }
        
        fetchData();
    }, [id]);
    
    return (
        <>
            <div className="movie__cast">
                <h2 className='detail_heading' style={{marginBottom: '15px'}}>Cast</h2>

                <div className='credits'>
                        {
                            credits?.cast?.slice(0, 12).map(actor => (
                                <div className='credit' key={actor.credit_id}>
                                        <Link to={`/people/${actor.id}`}>
                                            {
                                                actor.profile_path ?
                                                    <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>
                                                    :
                                                    <div className="not_found_picture">
                                                        <p>
                                                            {
                                                                actor.name.split(' ').map(name => name.slice(0, 1))
                                                            }
                                                        </p>
                                                    </div>
                                            }
                                            <p>{actor.name}</p>
                                            <h4 style={{fontWeight: '100' }}>{actor.character}</h4>
                                        </Link> 
                                    </div>
                            ))
                        }
                </div>
            </div>

            <div className="movie__crew">
                <h2 className='detail_heading' style={{margin: '15px 0'}}>Crew</h2>

                <div className='credits'>
                        {
                            credits?.crew?.slice(0, 12).map(crewMember => (
                                <div className='credit' key={crewMember.credit_id} href="">
                                    <Link to={`/people/${crewMember.id}`}>
                                            {
                                                crewMember.profile_path ?
                                                    <img src={`https://image.tmdb.org/t/p/original/${crewMember.profile_path}`} alt={`${crewMember.name}`}/>
                                                    :
                                                    <div className="not_found_picture">
                                                        <p>
                                                            {
                                                                crewMember.name.split(' ').map(name => name.slice(0, 1))
                                                            }
                                                        </p>
                                                    </div>
                                            }
                                            <p>{crewMember.name}</p>
                                            <h4 style={{fontWeight: '100' }}>{crewMember.job}</h4>
                                    </Link>
                                </div>
                            ))
                        }
                </div>
            </div>
        </>
    )
}

export default Credits;