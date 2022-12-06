import React, {useState} from 'react'
import './Session.css'
import { auth } from '../../actions/user';
import Notification from '../Notification/Notification';

const Session = () => {
    const [formData, setFormData] = useState(null);
    const [showNotif, setShowNotification] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const aux = await auth(formData);

        if(!aux) {
            console.log("ERROR");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false)
            }, 3000);
        } else {
            window.location = '/'
        }
    }

    return (
        <>
            <div className='session_all container'>
                <div className='login'>
                    <h2 className='section_title'>
                        Log In with your <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"/> account
                    </h2>

                    <form>
                        <div>
                            <label htmlFor='loginEmail'>Username: </label>
                            <input id="loginUser" name="username" type={'text'} onChange={(e) => handleChange(e)}></input>
                        </div>

                        <div>
                            <label htmlFor='loginPassword'>Password: </label>
                            <input id="loginPassword" name="password" type={'password'} onChange={(e) => handleChange(e)}></input>
                        </div>
                        
                        <button onClick={(e) => handleSubmit(e)}>Log In</button>

                    </form>
                </div>
            </div>

            {
                showNotif && <Notification text={'Wrong credentials. Try again'} color={'red-background'}/>
            }
        </>
    )
}

export default Session;