import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {

    return (
        <nav className="navbar">
            <div className="navbar__content">
                <div className="navbarLeft">
                    <Link to="/"><img className="navbar__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"  /></Link>
                    <Link to="/movies/popular" style={{textDecoration: 'none'}}><span>Popular</span></Link>
                    <Link to="/movies/top_rated" style={{textDecoration: 'none'}}><span>Top Rated</span></Link>
                    <Link to="/movies/upcoming" style={{textDecoration: 'none'}}><span>Upcoming</span></Link>
                </div>

                <SearchBar />

            </div>

        </nav>
    )
}

export default NavBar