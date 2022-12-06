import React, {useEffect, useState} from "react";
import { getWatchProviders } from "../../../actions/films";
import { Link } from "react-router-dom";
import './Providers.css'

const Providers = ({id}) => {

    const [watchProviders, setWatchProviders] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedWatchProviders = await getWatchProviders(id);
            const { AR } = await fetchedWatchProviders;
            setWatchProviders(AR);
        }

        fetchData();
    }, [id]);

    if(!watchProviders?.flatrate) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {
                watchProviders &&
                    <div className='providers_all'>
                        <h2 className='detail_heading'>Where to Watch?</h2>

                        <div className='providers'>
                            {   watchProviders?.flatrate &&
                                    <div className='provider'>
                                        {
                                            watchProviders?.flatrate?.map(provider => (
                                                <div className='provider__items' key={provider.provider_id}>
                                                    <img src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                                                    <p>{provider.provider_name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Providers;