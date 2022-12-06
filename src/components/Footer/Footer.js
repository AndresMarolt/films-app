import NavBar from '../NavBar/Navbar';
import './Footer.css'
import '../NavBar/NavBar.css'
import { Link } from 'react-router-dom';


const Footer = () => {


    return (
        <footer>
            <div className='footer__content'>
                <Link to="/"><img className="footer__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"  /></Link>
            </div>
            
            
        </footer>
    )
}

export default Footer;