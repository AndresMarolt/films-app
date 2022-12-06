import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card';

const Credits = ({person}) => {

    const filterRepeatedMovies = (role, uniqueIds) => {
        const uniqueFilms = role.filter(movie => {
            const isDuplicate = uniqueIds.includes(movie.id);
    
            if(!isDuplicate) {
                uniqueIds.push(movie.id);
                return true;
            }
            return false;
        })

        return uniqueFilms;
    }

    const uniqueCastIds = [];
    const uniqueCrewIds = [];

    const filteredCreditsCast = filterRepeatedMovies(person?.credits.cast, uniqueCastIds);
    const filteredCreditsCrew = filterRepeatedMovies(person?.credits.crew, uniqueCrewIds);
    
    const [selected, setSelected] = useState(person.known_for_department);

    return (
        <>
            <div className={`works`}>
                <h2 className='section_title'>Filmography</h2>
                <div className='options'>
                    {
                        (filteredCreditsCast?.length > 0 && filteredCreditsCrew?.length > 0 ) ?
                        (
                            <>
                                <button className={selected === 'Acting' ? 'selected' : " "} onClick={() => setSelected('Acting')}>
                                    As an Actor
                                </button>
                         
                                <button className={selected !== 'Acting' ? 'selected' : " " } onClick={() => setSelected('Crew')}>
                                    As a Crew Member
                                </button>
                            </>
                        )
                        :
                            (filteredCreditsCast?.length > 0 && !filteredCreditsCrew?.length > 0 ) ?
                            (
                                <button className={selected === 'Acting' ? 'selected' : " "} onClick={() => setSelected('Acting')}>
                                    As an Actor
                                </button>
                            ):
                                (!filteredCreditsCast?.length > 0 && filteredCreditsCrew?.length > 0 ) && (
                                    <button className={selected !== 'Acting' ? 'selected' : " " } onClick={() => setSelected('Crew')}>
                                        As a Crew Member
                                    </button>
                            )
                    }
                </div>
            </div>

            <div className='works_results'>
                <div className="movie__list container">
                    <div className="list__cards">
                        {
                            selected === 'Acting' ? 
                                (
                                    filteredCreditsCast?.map(movie => {
                                        return(
                                            <Card movie={movie} key={movie.id} showName={true} />
                                        )
                                    })
                                )
                                :
                                (
                                    filteredCreditsCrew?.map(movie => {
                                        return(
                                            <Card movie={movie} key={movie.id} showName={true} />
                                        )
                                    })
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Credits;