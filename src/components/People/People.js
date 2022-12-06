import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './People.css'
import { getPersonInfo } from '../../actions/people';
import Credits from './Credits/Credits';

const People = () => {

    const [person, setPerson] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

    console.log(isLoading);
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchedPerson = await getPersonInfo(id);
            setPerson(fetchedPerson);
            setIsLoading(false);
        }
        
        fetchData();
    }, [id]);

    return (
        <div className='container personDetail'>
            <div className='person'>
                <div className='person-top'>
                    <div className='person__picture'>
                        <img src={person?.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : 'https://d1bvpoagx8hqbg.cloudfront.net/259/0f326ce8a41915e8b1d21ffaee087fae.jpg'} />
                    </div>

                    <div className='person__info'>
                        <h2 className='name'>{person?.name}</h2>
                        {
                            person?.place_of_birth && (
                                <p className='birthday'>Place of Birth: <span>{person?.place_of_birth}</span></p>
                            )
                        }
                        <p className='birthday'>Date of Birth: <span>{person?.birthday}</span></p>
                        {
                            person?.deathday && (
                                <p className='birthday'>Date of Death: <span>{person?.deathday}</span></p>
                            )
                        }
                        {
                            person?.homepage && (
                                <p className='website' >Website: <a href={`person?homepage`}>{person?.homepage}</a></p>
                            )
                        }
                        
                    </div>
                </div>

                {
                    person?.biography && (
                        <p className='bio'>{person?.biography}</p>
                    )
                }
            </div>

            {
                !isLoading &&
                    <Credits person={person}/>

            }
        </div>
    )
}

export default People;