import React, { useEffect, useState, useRef } from "react";
import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import { deleteSession } from "../../actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faT, faTimes } from "@fortawesome/free-solid-svg-icons";

import SearchBar from "./SearchBar/SearchBar";

const NavBar = () => {

    const location = useLocation();
    const accountRef = useRef(null);
    const accountRefMob = useRef(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [searching, setSearching] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.accountDetails || null);
    
    const logout = async () => {
        const aux = await deleteSession(JSON.parse(localStorage.getItem('user')).sessionId);
        window.location.reload(false)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            userData && setUser(userData.accountDetails);
        }
        fetchUserData();

        
        const closeDropdown = (event) => {
            // console.log(event.target.classList.contains('mobile_userIcon'));
            if(!accountRef.current.contains(event.target) && !event.target.classList.contains('mobile_userIcon') && !event.target.classList.contains('profile-mob') && !event.target.classList.contains('logout-mob') ) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener("mousedown", (e) => closeDropdown(e));
        
        return () => {
            document.removeEventListener("mousedown", closeDropdown);
        }
    }, [])

    useEffect(() => {
        setShowUserMenu(false);
    }, [location])

    return (
        <nav className="navbar container">

            {/* DESKTOP */}
            <div className="navbar__content">
                <div className="navbar-left">
                    <Link to="/"><img className="navbar__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"  /></Link>
                </div>

                <div className="navbar-right">
                    
                    <SearchBar />

                    {
                        user ? (
                            <div className="user" ref={accountRef}>
                                <div className="userLink" onClick={() => setShowUserMenu(!showUserMenu)}>
                                    <img 
                                        src={
                                            user?.avatar.tmdb.avatar_path ? `https://image.tmdb.org/t/p/original/${user?.avatar.tmdb.avatar_path}` : `https://secure.gravatar.com/avatar/${user?.avatar.gravatar.hash}?s=150` 
                                        } 
                                    />
                                </div>

                                <div className={`${showUserMenu ? 'user-menu' : 'hidden'} `}>
                                    <Link to={`/user/${user?.id}`}>Profile</Link>
                                    <button id="logout" onClick={() => logout()}>Log Out</button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='session'>
                                <Link to="/auth" id="sessionLink">
                                    <button className='session__button'>
                                        Log In
                                    </button>
                                </Link>
                            </div>
                        )
                    }

                </div>


            </div>


            {/* MOBILE */}
            <div className="navbar__mobile__content">
                {
                    !searching ? (
                        <>
                            <div className="navbar__mobile-left">
                                <div className={`bars ${showMenu ? 'bars-opened' : 'bars-closed'}`} id="bars" onClick={() => setShowMenu(!showMenu)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                
                                <div className={`links ${!showMenu ? 'hidden' : '' }`} id="links">
                                    <Link to="/movies/popular" style={{textDecoration: 'none'}}><span>Popular</span></Link>
                                    <Link to="/movies/top_rated" style={{textDecoration: 'none'}}><span>Top Rated</span></Link>
                                    <Link to="/movies/upcoming" style={{textDecoration: 'none'}}><span>Upcoming</span></Link>
                                </div>

                                <Link to="/"><img className="navbar__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"  /></Link>
                            </div>

                            <div className="navbar__mobile-right">
                                <i className="fa fa-search" onClick={() => setSearching(true)}></i>

                                {
                                    user ? (
                                        <div >
                                            <img 
                                                onClick={() => setShowUserMenu(!showUserMenu)}
                                                className="mobile_userIcon"
                                                src={
                                                    user?.avatar.tmdb.avatar_path ? `https://image.tmdb.org/t/p/original/${user?.avatar.tmdb.avatar_path}` : `https://secure.gravatar.com/avatar/${user?.avatar.gravatar.hash}?s=150` 
                                                } 
                                            />
                                        </div>
                                    )
                                    :
                                        <div className='session'>
                                            <Link to="/auth" id="sessionLink">
                                                <button className='session__button'>
                                                    Log In
                                                </button>
                                            </Link>
                                        </div>
                                }

                                <div className={`${showUserMenu ? 'user-menu' : 'hidden'} usermenu-mob`}>
                                    <Link to={`/user/${user?.id}`} className="profile-mob">Profile</Link>
                                    <button id="logout" onClick={() => logout()} className="logout-mob">Log Out</button>
                                </div>
                                
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <SearchBar setSearching={setSearching}/>
                            <FontAwesomeIcon icon={faTimes} className="times" onClick={() => setSearching(false)}/>
                        </>
                    )
                }

            </div>

        </nav>
    )
}

export default NavBar